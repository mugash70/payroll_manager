var express = require('express')
var router = express.Router();
const session = require('express-session')
const pool = require("../database/config.js");
const generateRandomNumber = require('./configs/numgen');

router.post("/", async (req, res) => {

    const client = await pool.connect();
    try {

      await client.query('BEGIN');
      var id = generateRandomNumber('EM')
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
          const response = await client.query(
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
              NID? NID: null,
              pic_url ? pic_url: null,
              address1? address1: null,
              address2 ? address2: null,
              grade_id ? grade_id: null,
              salary ? salary: null,
              phone ? salary: null,
              nhif? nhif: null,
              nssf? nssf: null,
              pin? pin: null,
              email? email: null,
              periodf? periodf: null,
              periodt? periodt: null,
              payment? payment: null,
              bankaccountno? bankaccountno: null,
              dept_id? dept_id: null,
              ent_id? ent_id: null,
              account_type? account_type: null,
              bankbranch? bankbranch: null,
              bankname? bankname: null,
              contracttype? contracttype: null,
              ]
          );
          await client.query('COMMIT');
          res.status(200).json({data:response.rows[0]});
        } catch (error) {
          await client.query('ROLLBACK');
          // console.error(error.stack);
          res.status(500).json(error.stack);
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
    await pool.query(`SELECT employees.*, departments.dept_name,grades.grade_name,grades.salary 
    FROM employees 
    JOIN departments ON employees.dept_id  = departments.dept_id
    JOIN grades ON employees.grade_id  = grades.grade_id
    `, (err, response) => {
      if (err) {
        res.status(500).json(err);
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
     var q1 =`
     SELECT employees.*,
     departments.dept_name,
     grades.grade_name,
     grades.salary 
     FROM employees 
     INNER JOIN departments ON employees.dept_id  = departments.dept_id
     INNER JOIN grades ON employees.grade_id  = grades.grade_id 
     where  employees.ent_id = $1
     ORDER BY employees.created_at ASC;`
   const response = await client.query(q1, [id]);
    res.status(200).json(response.rows);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.stack);
    res.status(500).json('Error occurred while fetching employees information');
  } finally {
    client.release();
  }
});



router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const org_id = req.params.id;
    const { Fnames, Lnames, NID, pic_url, address1, address2, grade_id, salary, phone, nhif, nssf, pin, email, periodf, periodt, payment, bankaccountno, dept_id, ent_id, account_type, bankbranch, bankname, contracttype } = req.body;
    const updateValues = [];
    const updateFields = [];
    if (Fnames) {
      updateValues.push(Fnames);
      updateFields.push('firstname = $' + updateValues.length);
    }
    if (Lnames) {
      updateValues.push(Lnames);
      updateFields.push('lastname = $' + updateValues.length);
    }
    if (NID) {
      updateValues.push(NID);
      updateFields.push('"ID" = $' + updateValues.length);
    }
    if (pic_url) {
      updateValues.push(pic_url);
      updateFields.push('pic_link = $' + updateValues.length);
    }
    if (address1) {
      updateValues.push(address1);
      updateFields.push('address1 = $' + updateValues.length);
    }
    if (address2) {
      updateValues.push(address2);
      updateFields.push('address2 = $' + updateValues.length);
    }
    if (grade_id) {
      updateValues.push(grade_id);
      updateFields.push('grade_id = $' + updateValues.length);
    }
    if (salary) {
      updateValues.push(salary);
      updateFields.push('salary = $' + updateValues.length);
    }
    if (phone) {
      updateValues.push(phone);
      updateFields.push('phone = $' + updateValues.length);
    }
    if (nhif) {
      updateValues.push(nhif);
      updateFields.push('nhif = $' + updateValues.length);
    }
    if (nssf) {
      updateValues.push(nssf);
      updateFields.push('nssf = $' + updateValues.length);
    }
    if (pin) {
      updateValues.push(pin);
      updateFields.push('pin = $' + updateValues.length);
    }
    if (email) {
      updateValues.push(email);
      updateFields.push('email = $' + updateValues.length);
    }
    if (periodf) {
      updateValues.push(periodf);
      updateFields.push('period_from = $' + updateValues.length);
    }
    if (periodt) {
      updateValues.push(periodt);
      updateFields.push('period_to = $' + updateValues.length);
    }
    if (payment) {
      updateValues.push(payment);
      updateFields.push('pay_id = $' + updateValues.length);
    }
    if (bankaccountno) {
      updateValues.push(bankaccountno);
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
    if (bankbranch) {
      updateValues.push(bankbranch);
      updateFields.push('bank_branch = $' + updateValues.length);
    }
    if (bankname) {
      updateValues.push(bankname);
      updateFields.push('bank_name = $' + updateValues.length);
    }
    if (contracttype) {
      updateValues.push(contracttype);
      updateFields.push('contract = $' + updateValues.length);
    }

    updateValues.push(org_id);

    const updateQuery = `UPDATE "employees" SET ${updateFields.join(', ')} WHERE "emp_id" = $${updateValues.length} RETURNING *`;

    const response = await client.query(updateQuery, updateValues);

    if (response.rows.length > 0) {
      await client.query('COMMIT');
      res.json(response.rows[0]);
    } else {
      await client.query('ROLLBACK');
      res.status(404).json('Employee not found');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json('Error occurred while updating employee');
  } finally {
    client.release();
  }
});



// // delete route
router.delete("/:id", async (req, res) => {

  const query = {
    text: `DELETE FROM employees WHERE emp_id = $1 RETURNING *`,
    values: [req.params.id]
  }

  // callback
  await pool.query(query, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      res.json(response.rows[0]);
    }
  });
});

module.exports = router

