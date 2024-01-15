var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('E')
      let {firstname,lastname,email, pay_id,grade_id,account_no,dept_id,ent_id,account_type,bank_name,bank_branch} = req.body;
        try {  
          await client.query(
            `INSERT INTO "Employees" (firstname,lastname,email, pay_id,grade_id,account_no,dept_id,ent_id,account_type,bank_name,bank_branch,Employee_id) VALUES($1, $2, $3, $4,$5,$6) RETURNING *`,
            [firstname,lastname,email, pay_id,grade_id,account_no,dept_id,ent_id,account_type,bank_name,bank_branch,id]
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
    await pool.query(`SELECT * from "Employees"`, (err, response) => {
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


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = await client.query('SELECT * FROM "Employees" WHERE "Employee_id" = $1', [id]);
    const employees = response.rows[0];
    res.json([employees, `This ${id} shows that Employee information has been retrieved successfully`]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while fetching employees information');
  } finally {
    client.release();
  }
});



router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const id = req.params.id;
    const {firstname,lastname,email, pay_id,grade_id,account_no,dept_id,ent_id,account_type,bank_name,bank_branch} = req.body;

    const updateValues = [];
    const updateFields = [];
    
    
    if (firstname) {
      updateValues.push(firstname);
      updateFields.push('firstname = $' + updateValues.length);
    }
    if (lastname) {
      updateValues.push(lastname);
      updateFields.push('lastname = $' + updateValues.length);
    }
    if (email) {
      updateValues.push(email);
      updateFields.push('email = $' + updateValues.length);
    }
    if (phone) {
      updateValues.push(phone);
      updateFields.push('phone = $' + updateValues.length);
    }
    if (pay_id) {
    updateValues.push(pay_id);
      updateFields.push('pay_id = $' + updateValues.length);
    }
    if (grade_id) {
    updateValues.push(grade_id);
      updateFields.push('grade_id = $' + updateValues.length);
    }
    if (account_no) {
      updateValues.push(account_no);
        updateFields.push('account_no = $' + updateValues.length);
      }
    if (dept_id) {
      updateValues.push(dept_id);
        updateFields.push('dept_id = $' + updateValues.length);
      }
    if (ent_id) {
    updateValues.push(ent_id);
      updateFields.push('ent_id = $' + updateValues.length);
    }
    if (account_type) {
      updateValues.push(account_type);
        updateFields.push('account_type = $' + updateValues.length);
      }
    if (bank_branch) {
      updateValues.push(bank_branch);
        updateFields.push('bank_branch = $' + updateValues.length);
      }
    if (bank_name) {
      updateValues.push(bank_name);
        updateFields.push('bank_name = $' + updateValues.length);
            }
    const updateQuery = `UPDATE "Employees" SET ${updateFields.join(', ')} WHERE "Employee_id" = $${updateValues.length + 1} RETURNING *`;
    const values = updateValues.concat(id);
    const response = await client.query(updateQuery, values);
    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json('Successfully updated');
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('employees not found');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while updating employees');
  } finally {
    client.release();
  }
});



// // delete route
router.delete("/:id", async (req, res) => {

  const query = {
    text: `DELETE FROM "Employees" WHERE "Employee_id" = $1 RETURNING *`,
    values: [req.params.id]
  }

  // callback
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.json("Successfully deleted!");
    }
  });
});

module.exports = router

