import React, { useRef, useState,useEffect } from 'react';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
import { Button, Modal,
    Divider,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Col,
    Row,
    Upload, } from 'antd';
import axios from 'axios';
import {BASE_API_URL} from '../../../actions/types'
import {post_data} from '../../../actions/all'

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };



const Employee = ({ type,record }) => {

  const gradeData = useSelector((state) => state.all.grades.data);
  console.log(gradeData);
  const jobs =useSelector((state) =>  state.all.employees.data);

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
 const showModal = () => {
    setOpen(true);
  };
  const handleGradeChange = (event) => {
    const selectedGradeId = parseInt(event);
    const grade = gradeData.find(grade => grade.grade_id === selectedGradeId);
    setSelectedGrade(grade);
    setUserData({ ...userData, grade: grade.grade_id, grade_id: grade.grade_id, jobs: '',salary: grade.salary });
  };
  const handleContractChange = (event) => {
    setUserData({ ...userData, contracttype: event });
  };
  const [userData, setUserData] = useState({});
  const {reloadKey, handleReload} = useReloadKey();
  const dispatch = useDispatch()

useEffect(() => {
  if (record) {
    setUserData({
      Fnames: record.firstname,
      Lnames: record.lastname,
      address1: record.address1,
      address2: record.address2,
      NID: record.ID,
      grade: record.grade_id,
      salary: record.salary,
      phone: record.phone,
      email: record.email,
      nssf: record.nssf,
      nhif: record.nhif,
      pin: record.pin,
      pay_id:record.pay_id,
      pic_url: record.pic_link,
      contracttype: record.contract,
      periodf: record.period_from,
      periodt: record.period_to,
      account_type: record.account_type,
      bankbranch: record.bank_branch,
      bankname: record.bank_name,
      bankaccountno: record.account_no,
    });
  }
}, [record]); 



  const  handleAddUser = async () => {
   
    const Adddata = {
      ...userData,
      pic_url: selectedImage 
    };

  await post_data(Adddata,'/employees','employees')(dispatch);
  setUserData({})
  setOpen(false);
  }

  const handleInputChange = (event) => {
    const { name, value ,files} = event.target;
      setUserData(prevFormData => ({
        ...prevFormData,
        [name]: value
      })); };

   const handleInputChangedate = (name, value) => {
    if (name === 'periodf' || name === 'periodt') {
      setUserData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setUserData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    };

  const handleInputChangefile =  async  (info) => {

    if (info.file.status == 'done') {
      const { name, value } = info.file.response; 
      setSelectedImage(info.file.response.imageUrls.map(image => image.url));
      setUserData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (info.file.status =='removed') {
      var x = info.file.response.imageUrls.map(image => image.filen)
      await axios.delete(`${BASE_API_URL}/upload/${x}`);
      
      setUserData((prevFormData) => ({
        ...prevFormData,
        pic_url: null, 
      }));
    }
  };
  const handlejobChange = (event) => {
    const selectedPay = event.target.value;
    setUserData({ ...userData, jobs: selectedPay});
  };
  const handlePayChange = (event) => {
    const value  = event;
    setUserData({ ...userData, payment: value });
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  
  // const onFinish = (values) => {
  //   console.log('Form input data:', values); // Log form input data
  //   try {
  //     // Handle form sumission logic, e.g., make an API call
  //     // ...
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //     // ...
  //   }
  // };

  

  const renderBankDetails = () => {
    if (userData.payment == '2') {
      return (

<Row gutter={16}>
<Divider plain>Bank Details</Divider>
  <Col md={8}>
    <Form.Item label="Name" className="mb-3">
      <Input
        type="text"
        name="bankname"
        value={userData.bankname}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Col>
  <Col md={8}>
    <Form.Item label="Account" className="mb-3">
      <Input
        type="text"
        name="bankaccountno"
        value={userData.bankaccountno}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Col>
  <Col md={8}>
    <Form.Item label="Branch" className="mb-3">
      <Input
        type="text"
        name="bankbranch"
        value={userData.bankbranch}
        onChange={handleInputChange}
      />
    </Form.Item>
  </Col>
</Row>
      );
    }
    return null;
  };
  return (
    <>
    {type == 'create' ? (
      <Button onClick={showModal}>Add employees</Button>
    ) : (
      <Button onClick={showModal} type="primary">Update</Button>
    )}
    <Modal
        title={
          <div
            style={{width: '100%',cursor: 'move',}}
            onMouseOver={() => {if (disabled) {setDisabled(false); }}}
            onMouseOut={() => {setDisabled(true);}}
            onFocus={() => {}}onBlur={() => {}}
           >
            {type == 'create' ? (
            <h3>Add Employee</h3>):(<h3>Update Employee Details</h3>)}
          </div>
        }open={open} width={1000} onOk={handleAddUser} onCancel={handleCancel} modalRender={(modal) => (<Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}><div ref={draggleRef}>{modal}</div></Draggable>)}>
        <Form labelCol={{span: 5,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}} >
        {/* onFinish={onFinish} */}
  
{type == 'create' ? (
  <Row>
        <Col span={12}>
      
        <Form.Item label="First names"
        name="Fnames"
        rules={[
          {
            required: true,
            message: 'Please input the Last Names!',
          },]}>
             <Input
              name="Fnames"
              value={userData.Fnames}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Address 1" >
          <Input   name="address1"
              value={userData.address1}
              onChange={handleInputChange}  />
        </Form.Item>
        <Form.Item label="Address 2">
          <Input 
            name="address2"
            value={userData.address2}
            onChange={handleInputChange}  />
        </Form.Item>
        <Form.Item label="ID/Passport"
          rules={[
            {
              required: true,
              message: 'Please input the ID/Passport!',
            },
          ]}>
             <Input
              name="NID"
              value={userData.NID}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="grade"
      
         rules={[
           {
             required: true,
             message: 'Please input the Grade!',
           },
         ]}>
         
          <Select
             
              onChange={handleGradeChange}
            >
              {open && gradeData.map(grade => (
                <Select.Option key={grade.grade_id} value={grade.grade_id}>
                 {grade.grade_name}
                </Select.Option>
              ))}
            </Select>

      </Form.Item>
        {/* <Form.Item label="job"
         name="job">
            <Select
            value={selectedGrade ? selectedGrade.id : ''}
            // onChange={handlejobChange}
            >
            {selectedGrade.jobs.map(job => (
              <div>{job}</div>
            // <Select.Option key={job} value={job}>{job}</Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="Contract type" >
              <Select 
                name="contracttype"
                onChange={handleContractChange} 
                value={userData.contracttype}
              >
                <Select.Option value="1">Contract</Select.Option>
                <Select.Option value="2">Permanent and Pensionable</Select.Option>
              </Select>
      </Form.Item>
        <Form.Item label="Payment" >
          <Select
          value={userData.payment}
          onChange={handlePayChange}
          >
            <Select.Option value="1">Mpesa</Select.Option>
            <Select.Option value="2">Bank</Select.Option>
            <Select.Option value="3">Cash</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Salary" >
          <Input
          name="salary"
          value={userData.salary}
          onChange={handleInputChange} 
          />
        </Form.Item>

        </Col>

      <Col span={12}>

        <Form.Item label="Last names"
        name="Lnames"
        rules={[
          {
            required: true,
            message: 'Please input the Last Names!',
          },]}>
             <Input
              name="Lnames"
              value={userData.Lnames}
              onChange={handleInputChange} 
          />
        </Form.Item>
      <Form.Item
        label="Period From"
  
        value={userData.periodf}>
       <DatePicker  onChange={(date, dateString) => handleInputChangedate('periodf', dateString)} />
      </Form.Item>
      <Form.Item
        label="Period To"
    
        value={userData.periodt}>
        <DatePicker  onChange={(date, dateString) => handleInputChangedate('periodt', dateString)} />;
      </Form.Item>
        <Form.Item label="Phone"
    
         onChange={handleInputChange} 
         rules={[
           {
             required: true,
             message: 'Please input the phone Number!',
           },
         ]}
        >
          <Input name="phone"
              value={userData.phone}
              onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Email">
             <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nssf" >
             <Input
              name="nssf"
              value={userData.nssf}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nhif" >
             <Input
              name="nhif"
              value={userData.nhif}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Tax pin" >
          <Input
              name="pin"
              value={userData.pin}
              onChange={handleInputChange} 
          />
        </Form.Item>
    
        <Form.Item label="Upload" 
        valuePropName="fileList" 
        getValueFromEvent={normFile}
        // name="pic_url"
         >
          <Upload 
                  listType="picture-card" 
                  className="avatar-uploader"
                  name="pic_url"
                  accept="image/*"
                  action={`${BASE_API_URL}/upload`} 
                  onChange={handleInputChangefile}
                  >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload passport
              </div>
            </button>
          </Upload>
        </Form.Item>
        </Col>
  </Row>

):( record ? (
        <Row>
        <Col span={12}>
        <Form.Item label="First names"
        rules={[
          {
            required: true,
            message: 'Please input the Last Names!',
          },]}>
             <Input
              name="Fnames"
              value={userData.Fnames}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Address 1"

        >
          <Input   name="address1"
              value={userData.address1}
              onChange={handleInputChange}  />
        </Form.Item>
        <Form.Item label="Address 2" 
        >
          <Input 
            name="address2"
            value={userData.address2}
            onChange={handleInputChange}  />
        </Form.Item>
        <Form.Item label="ID/Passport"
          rules={[
            {
              required: true,
              message: 'Please input the ID/Passport!',
            },
          ]}>
             <Input
              name="NID"
              value={userData.NID}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="grade"
         rules={[
           {
             required: true,
             message: 'Please input the Grade!',
           },
         ]}>
         
          <Select
              onChange={handleGradeChange}
              value={userData.grade}
            >
              {gradeData ? gradeData.map(grade => (
                <Select.Option key={grade.grade_id} value={grade.grade_id}>
                  {grade.grade_name}
                </Select.Option>
              )):null}
            </Select>

      </Form.Item>
        {/* <Form.Item label="job"
         name="job">
            <Select
            value={selectedGrade ? selectedGrade.id : ''}
            // onChange={handlejobChange}
            >
            {selectedGrade.jobs.map(job => (
              <div>{job}</div>
            // <Select.Option key={job} value={job}>{job}</Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item label="Contract type" >
    
              <Select 
                initialValue="2"
                name="contracttype"
                onChange={handleContractChange} 
                value={userData.contracttype}
              >
                <Select.Option value="1">Contract</Select.Option>
                <Select.Option value="2">Permanent and Pensionable</Select.Option>
              </Select>
      </Form.Item>
        <Form.Item label="Payment"  >
          <Select
          value={userData.pay_id}
          onChange={handlePayChange}
          >
            <Select.Option value='1'>Mpesa</Select.Option>
            <Select.Option value="2">Bank</Select.Option>
            <Select.Option value="3">Cash</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Salary" 

        >
          <Input
          name="salary"
          value={userData.salary}
          onChange={handleInputChange} 
          />
        </Form.Item>

        </Col>

        <Col span={12}>

        <Form.Item label="Last names"
    
        rules={[
          {
            required: true,
            message: 'Please input the Last Names!',
          },]}>
             <Input
              name="Lnames"
              value={userData.Lnames}
              onChange={handleInputChange} 
          />
        </Form.Item>
      <Form.Item
        label="Period From"
  
        value={userData.periodf}>
       <DatePicker  onChange={(date, dateString) => handleInputChangedate('periodf', dateString)} />
      </Form.Item>
      <Form.Item
        label="Period To"
  
        value={userData.periodt}>
        <DatePicker  onChange={(date, dateString) => handleInputChangedate('periodt', dateString)} />;
      </Form.Item>
        <Form.Item label="Phone"
         onChange={handleInputChange} 
         rules={[
           {
             required: true,
             message: 'Please input the phone Number!',
           },
         ]}
        >
          <Input name="phone"
              value={userData.phone}
              onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Email">
             <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nssf" >
             <Input
              name="nssf"
              value={userData.nssf}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nhif" >
             <Input
              name="nhif"
              value={userData.nhif}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Tax pin" >
          <Input
              name="pin"
              value={userData.pin}
              onChange={handleInputChange} 
          />
        </Form.Item>
     </Col>
        </Row>
):null)}

        {renderBankDetails()}
       
      </Form>
      </Modal>
    </>
  );
};



export default Employee;