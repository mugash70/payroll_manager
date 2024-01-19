var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('D')
      console.log(req.body);
      let {grade_name,salary,payment_period, phone,ent} = req.body;
        try {  
         const result = await client.query(
            `INSERT INTO grades (grade_name,salary,payment_period) VALUES($1, $2, $3) RETURNING *`,
            [grade_name,salary,payment_period]
          );
          await client.query('COMMIT');
          res.json(result.rows);
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
    await pool.query(`SELECT * from grades`, (err, response) => {
      if (err) {
        console.log(err.stack);
        res.status(500).json("Error Fetching!");
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
    const response = await client.query('SELECT * FROM grades WHERE "Organization_id" = $1', [id]);
    const organization = response.rows[0];
    res.json([organization, `This ${id} shows that organization information has been retrieved successfully`]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while fetching organization information');
  } finally {
    client.release();
  }
});



router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const org_id = req.params.id;
    const { grade_name, salary, payment_period, phone, ent} = req.body;

    const updateValues = [];
    const updateFields = [];
    if (grade_name) {
      updateValues.push(grade_name);
      updateFields.push('grade_name = $' + updateValues.length);
    }
    if (salary) {
      updateValues.push(salary);
      updateFields.push('salary = $' + updateValues.length);
    }
    if (payment_period) {
      updateValues.push(payment_period);
      updateFields.push('payment_period = $' + updateValues.length);
    }
    if (phone) {
      updateValues.push(phone);
      updateFields.push('phone = $' + updateValues.length);
    }

     if (ent) {
     updateValues.push(ent);
       updateFields.push('"Has_entity" = $' + updateValues.length);
     }
    const updateQuery = `UPDATE grades SET ${updateFields.join(', ')} WHERE "Organization_id" = $${updateValues.length + 1} RETURNING *`;
    const values = updateValues.concat(org_id);
    const response = await client.query(updateQuery, values);
    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json('Successfully updated');
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('Organization not found');
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
  console.log(req.params.id);
  const query = {
    text: `DELETE FROM grades WHERE grade_id = $1 RETURNING *`,
    values: [req.params.id]
  }
  // callback
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.json(response.rows);
    }
  });
});

module.exports = router

