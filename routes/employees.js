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
      let {
        Fnames,
        Lnames,
        NID,
        pic_url,
        address1,
        address2,
        grade,
        grade_id,
        salary,
        phone,
        nhif,
        nssf,
        pin,
        email,
        periodf,
        periodt,
        payment,
        bankaccountno,
        dept_id,
        ent_id,
        account_type,
        bankbranch,
        bankname,
        contracttype,
      } = req.body;
        try {  
          await client.query(
            `INSERT INTO employees ( 
              firstname,
              lastname,
              "ID",
              pic_link,
              address1,
              address2,
              grade_id,
              salary,
              phone,
              nhif,
              nssf,
              pin,
              email,
              period_from,
              period_to,
              pay_id,
              account_no,
              dept_id,
              ent_id,
              account_type,
              bank_branch,
              bank_name,
              contract) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *`,
            [
              Fnames,
              Lnames,
              NID,
              pic_url,
              address1,
              address2,
              grade_id,
              salary,
              phone,
              nhif,
              nssf,
              pin,
              email,
              periodf,
              periodt,
              payment,
              bankaccountno,
              dept_id,
              ent_id,
              account_type,
              bankbranch,
              bankname,
              contracttype,
              ]
          );
          await client.query('COMMIT');
          res.json("created successfully!");
        } catch (error) {
          await client.query('ROLLBACK');
          console.error(error.stack);
          res.status(500).json("Error occurred while creating!");
        } finally {
          client.release();
        }
    } catch (err) {
      console.error(err.stack);
      res.status(500).json("Error occurred while creating!");
    }
  })


router.get("/", async (req,res)=>{
  try {
    await pool.query(`SELECT * from employees`, (err, response) => {
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
    const response = await client.query('SELECT * FROM "employees" WHERE "Organization_id" = $1', [id]);
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
    const updateQuery = `UPDATE "employees" SET ${updateFields.join(', ')} WHERE "Organization_id" = $${updateValues.length + 1} RETURNING *`;
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

  const query = {
    text: `DELETE FROM "employees" WHERE "Organization_id" = $1 RETURNING *`,
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

