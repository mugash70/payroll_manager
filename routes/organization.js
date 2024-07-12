var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('OR')
      let {org_name,logo,email, phone,created_by,Has_entity} = req.body;
        try {  
          const response = await client.query(
            `INSERT INTO "organizations" (org_name,logo,email, phone,"Has_entity","org_id","created_by") VALUES($1, $2, $3, $4,$5,$6,$7) RETURNING *`,
            [org_name,logo,email, phone,Has_entity,id,created_by]
          );
          await client.query('COMMIT');
          res.json({data:response.rows[0]});
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(error.message);
          res.status(500).json(error.message);
        } finally {
          client.release();
        }
    } catch (err) {
      console.error(err.message);
      res.status(500).json(error.message);
    }
  })


router.get("/", async (req,res)=>{
  try {
    await pool.query(`SELECT * from "organizations"`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
    res.status(500).json(error.message);
  }
}  
)


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = await client.query('SELECT * FROM "organizations" WHERE "Organization_id" = $1', [id]);
    const organization = response.rows[0];
    res.json({data:response.rows[0]});
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json(error.message);
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
    const updateQuery = `UPDATE "organizations" SET ${updateFields.join(', ')} WHERE "org_id" = $${updateValues.length + 1} RETURNING *`;
    const values = updateValues.concat(org_id);
    const response = await client.query(updateQuery, values);
    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json({data:response.rows});
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('Organization not found');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json(error.message);
  } finally {
    client.release();
  }
});



// // delete route
router.delete("/:id", async (req, res) => {

  const query = {
    text: `DELETE FROM "organizations" WHERE "Organization_id" = $1 RETURNING *`,
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

