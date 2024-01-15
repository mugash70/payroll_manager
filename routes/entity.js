var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('M')
      let {ent_id ,ent_name,phone,email,payment,org_id,payment_period,Entity_id} = req.body;
        try {  
          await client.query(
            `INSERT INTO "Entities" (ent_id ,ent_name,phone,email,payment,org_id,payment_period,Entity_id) VALUES($1, $2, $3, $4,$5,$6,$7,$8) RETURNING *`,
            [ent_id ,ent_name,phone,email,payment,org_id,payment_period,Entity_id]
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
    await pool.query(`SELECT * from "Entities"`, (err, response) => {
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
    const response = await client.query('SELECT * FROM "Entities" WHERE "Entity_id" = $1', [id]);
    const entity = response.rows[0];
    res.json([entity, `This ${id} shows that entity information has been retrieved successfully`]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while fetching entity information');
  } finally {
    client.release();
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
    const updateQuery = `UPDATE "Entities" SET ${updateFields.join(', ')} WHERE "Entity_id" = $${updateValues.length + 1} RETURNING *`;
    const values = updateValues.concat(org_id);
    const response = await client.query(updateQuery, values);
    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json('Successfully updated');
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('entity not found');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while updating entity');
  } finally {
    client.release();
  }
});



// // delete route
router.delete("/:id", async (req, res) => {

  const query = {
    text: `DELETE FROM "Entities" WHERE "Entity_id" = $1 RETURNING *`,
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

