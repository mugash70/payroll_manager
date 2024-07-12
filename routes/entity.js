var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var ent_id = generateRandomNumber('E')
      let {ent_name,org_id} = req.body;

        try {  
          var response = await client.query(
            `INSERT INTO "entities" (ent_id,ent_name,org_id) VALUES($1, $2,$3) RETURNING *`,
            [ent_id,ent_name,org_id]
          );
           await client.query('COMMIT');
      
          res.status(200).json({data:response.rows[0]});
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
    await pool.query(`SELECT e.*, p.*, pp.*
      FROM "entities" e
      LEFT JOIN "payments" p ON CAST(e.payment AS INTEGER) = p.pay_id
      LEFT JOIN "frequency" pp ON CAST(e.payment_period AS INTEGER) = pp.freq_id ORDER BY e.created_at ASC;
      `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}  
)
router.get('/:id', async (req,res)=>{
  const { id } = req.params;
  try {
    await pool.query(`SELECT e.*, p.*, pp.*
      FROM "entities" e
      LEFT JOIN "payments" p ON CAST(e.payment AS INTEGER) = p.pay_id
      LEFT JOIN "frequency" pp ON CAST(e.payment_period AS INTEGER) = pp.freq_id 
      WHERE "org_id" = '${id}'
      ORDER BY e.created_at ASC;
      `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}  
)
router.get('/get/:id', async (req,res)=>{
  const { id } = req.params;
  try {
    await pool.query(`SELECT e.*, p.*, pp.*
      FROM "entities" e
      LEFT JOIN "payments" p ON CAST(e.payment AS INTEGER) = p.pay_id
      LEFT JOIN "frequency" pp ON CAST(e.payment_period AS INTEGER) = pp.freq_id 
      WHERE e.ent_id = '${id}'
      ORDER BY e.created_at ASC;
      `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}  
)


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  // const { ent_name, account_type, bankaccountno, bankbranch, bankname, email, payment, payment_period, phone } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const updates = [];
    const updateValues = [];
    const updateFields = [];
    for (const [key, value] of Object.entries(req.body)) {
      if (key !== 'ent_id' && value) {
        updates.push(`${key} = $${updates.length + 1}`);
        updateValues.push(value);
      }
    }
    if (updates.length === 0) {
      return res.status(400).json({ msg: 'No valid fields to update' });
    }
    const updateQuery = `UPDATE entities SET ${updates.join(', ')} WHERE ent_id = '${id}' RETURNING *`;
    const values = [...updateValues];
    const { rows } = await client.query(updateQuery, values);
    await client.query('COMMIT');

    if (rows.length > 0) {
      res.json({ data: rows[0], msg: 'Successfully updated' });
    } else {
      res.status(404).json({ msg: 'Entity not found' });
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error occurred:', error);
    res.status(500).json({ msg: 'Error occurred while updating Entity' });
  } finally {
    client.release();
  }
});


// router.put('/:id', async (req, res) => {
//   const client = await pool.connect();
//   try {
//     await client.query('BEGIN');
//     const ent_id = req.params.id;
//     const { ent_name,account_type,bankaccountno,bankbranch,bankname,email,org_id,payment,payment_period,phone} = req.body;

//     const updateValues = [];
//     const updateFields = [];
//     if (ent_name) {
//       updateValues.push(ent_name);
//       updateFields.push('"ent_name" = $' + updateValues.length);
//     }
//     if (account_type) {
//       updateValues.push(account_type);
//       updateFields.push('"account_type" = $' + updateValues.length);
//     }
//     if (bankaccountno) {
//       updateValues.push(bankaccountno);
//       updateFields.push('"bankaccountno" = $' + updateValues.length);
//     }
//     if (bankbranch) {
//       updateValues.push(bankbranch);
//       updateFields.push('"bankbranch" = $' + updateValues.length);
//     }
//     if (bankname) {
//       updateValues.push(bankname);
//       updateFields.push('"bankname" = $' + updateValues.length);
//     }
//     if (email) {
//       updateValues.push(email);
//       updateFields.push('"email" = $' + updateValues.length);
//     }
//     if (payment) {
//       updateValues.push(payment);
//       updateFields.push('"payment" = $' + updateValues.length);
//     }
//     if (payment_period) {
//       updateValues.push(payment_period);
//       updateFields.push('"payment_period" = $' + updateValues.length);
//     }
//     if (phone) {
//       updateValues.push(phone);
//       updateFields.push('"phone" = $' + updateValues.length);
//     }

//     const updateQuery = `UPDATE "entities" SET ${updateFields.join(', ')} WHERE "ent_id" = $${updateValues.length + 1} RETURNING *`;
//     const values = updateValues.concat(ent_id);
//     const response = await client.query(updateQuery, values);
//     if (response.rows.length > 0) {
//       await client.query('COMMIT');
//       res.json({data:response.rows[0],msg:'Successfully updated'});
//     } else {
//       await client.query('ROLLBACK');
//       res.status(404).json('Entity not found');
//     }
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error(error.message);
//     res.status(500).json('Error occurred while updating Entity');
//   } finally {
//     client.release();
//   }
// });



// // delete route
router.delete("/:id", async (req, res) => {

  const query = {
    text: `DELETE FROM "entities" WHERE "ent_id" = $1 RETURNING *`,
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





// Department
router.post("/ent/departments", async (req, res) => {
  const client = await pool.connect();
  try {

    await client.query('BEGIN');
    var id = generateRandomNumber('D')
    let {dept_name,ent_id} = req.body;
      try {  
        const result = await client.query(
          `INSERT INTO departments (dept_name, ent_id) VALUES ($1, $2) RETURNING *`,
          [dept_name, ent_id]
        );
        await client.query('COMMIT');
        // res.json("created successfully!");
        const insertedData = result.rows[0];
        res.json({data:insertedData});
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(error.stack);
        res.status(500).json("Error occurred while creating!");
      } finally {
        client.release();
      }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error occurred while creating!");
  }
})


router.get("/ent/departments", async (req,res)=>{

  try {
    await pool.query(`SELECT * from departments`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}  
)
router.get("/ent/departments/:id", async (req,res)=>{
  const { id } = req.params;
  try {
    await pool.query(`SELECT * from departments where ent_id = '${id}'`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}  
)
router.delete("/ent/departments/:id", async (req, res) => {
  const query = {
    text: `DELETE FROM departments WHERE "dept_id" = $1 RETURNING *`,
    values: [req.params.id]
  }

  // callback
await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.status(200).json({data:response.rows});
    }
  });
});





// Deduction
router.post("/ent/adjustments", async (req, res) => {
  const client = await pool.connect();
  try {

    await client.query('BEGIN');
    var id = generateRandomNumber('BD')
    let {adj_name,adjust_type,amount,amount_type,payment_period,ent_id,xfrom,xto} = req.body;

      try {  
        const result = await client.query(
          `INSERT INTO adjustments (adj_name, adj_type, amount, amount_type, period,ent_id, "from", "to") 
           VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *`,
          [adj_name, adjust_type, amount, amount_type, payment_period,ent_id, xfrom, xto]
        );
        
        await client.query('COMMIT');
        // res.json("created successfully!");
        const insertedData = result.rows[0];
        res.json({data:insertedData});
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(error.stack);
        res.status(500).json("Error occurred while creating!");
      } finally {
        client.release();
      }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Error occurred while creating!");
  }
})


router.get("/ent/adjustments", async (req,res)=>{
  try {
    await pool.query(`SELECT * from adjustments`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
})

router.get("/ent/adjustments/:id", async (req,res)=>{
  try {
    await pool.query(`SELECT * from adjustments where ent_id = '${req.params.id}'`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        res.status(200).json(response.rows);
      }
    });
  }
  catch(error) {
    console.log(error);
  }
})


router.delete("/ent/adjustments/:id", async (req, res) => {
  const query = {
    text: `DELETE FROM adjustments WHERE "adj_id" = $1 RETURNING *`,
    values: [req.params.id]
  }

  // callback
await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.status(200).json({data:response.rows});
    }
  });
});


















module.exports = router

