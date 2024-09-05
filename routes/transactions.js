var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('O')
      let {org_name,logo,email, phone,ent} = req.body;
        try {  
          await client.query(
            `INSERT INTO "transactions" (org_name,logo,email, phone,"Has_entity","Organization_id") VALUES($1, $2, $3, $4,$5,$6) RETURNING *`,
            [org_name,logo,email, phone,ent,id]
          );
          await client.query('COMMIT');
          res.json("created successfully!");
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(error.message);
          res.status(500).json("Error occurred while creating!");
        } finally {
          client.release();
        }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Error occurred while creating!");
    }
  })


router.get("/", async (req,res)=>{
  try {
    await pool.query(`SELECT * from "transactions"`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch {
    console.log(error);
  }
}  
)

router.get('/get/:ent_id', async (req, res) => {
  const { ent_id } = req.params;

  try {
    const employeeQuery = `
    SELECT employees.*, departments.dept_name, grades.grade_name, grades.salary
      FROM employees
      INNER JOIN departments ON employees.dept_id = departments.dept_id
      INNER JOIN grades ON employees.grade_id = grades.grade_id
      WHERE employees.ent_id = $1
      ORDER BY employees.created_at ASC;
    `;
    const gradeQuery = `SELECT * FROM grades WHERE ent_id = $1;`;
    const [employeeResult, gradeResult] = await Promise.all([
      pool.query(employeeQuery, [ent_id]),
      pool.query(gradeQuery, [ent_id])
    ]);
    const employees = employeeResult.rows;
    const grades = gradeResult.rows;


    const groupedByGrade = grades.reduce((acc, grade) => {
      acc[grade.grade_name] = {
        salary: grade.salary,
        employees: []
      };
      return acc;
    }, {});


    employees.forEach(employee => {
      const grade = grades.find(g => g.grade_id === employee.grade_id);
      if (grade) {
        groupedByGrade[grade.grade_name].employees.push({
          firstName: employee.firstname,
          lastName: employee.lastname,
          emp_id: employee.emp_id,
          ID: employee.ID,
          salary: employee.salary
        });
      }
    });
  
    res.json(groupedByGrade);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const org_id = req.params.id;
    const { org_name, logo, email, phone, ent} = req.body;

    const updateValues = [];
    const updateFields = [];
    if (org_name) {
      updateValues.push(org_name);
      updateFields.push('org_name = $' + updateValues.length);
    }
    if (logo) {
      updateValues.push(logo);
      updateFields.push('logo = $' + updateValues.length);
    }
    if (email) {
      updateValues.push(email);
      updateFields.push('email = $' + updateValues.length);
    }
    if (phone) {
      updateValues.push(phone);
      updateFields.push('phone = $' + updateValues.length);
    }

     if (ent) {
      updateValues.push(ent);
      updateFields.push('"Has_entity" = $' + updateValues.length);
     }
    const updateQuery = `UPDATE "transactions" SET ${updateFields.join(', ')} WHERE "Organization_id" = $${updateValues.length + 1} RETURNING *`;
    const values = updateValues.concat(org_id);
    const response = await client.query(updateQuery, values);
    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json('Successfully updated');
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('trnasaction not found');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while updating organization');
  } finally {
    client.release();
  }
});



// // delete route
router.delete("/:id", async (req, res) => {
  const query = {
    text: `DELETE FROM "transactions" WHERE "Organization_id" = $1 RETURNING *`,
    values: [req.params.id]
  }
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.json("Successfully deleted!");
    }
  });
});

module.exports = router

