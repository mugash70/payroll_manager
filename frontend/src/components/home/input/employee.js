import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
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
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };



const Employee = () => {
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
    setUserData({ ...userData, grade: grade.grade_name, grade_id: grade.grade_id, jobs: '',salary: grade.salary });
  };

  const handleContractChange = (event) => {
  
    setUserData({ ...userData, contracttype: event });
  };
  const [userData, setUserData] = useState({
    Fnames:'',
    address1:'',
    address2:'',
    NID:'',
    grade:'',
    salary:'',
    phone:'',
    email:'',
    nssf:'',
    nhif:'',
    pin:'',
    pic_url:'',
    contracttype:''
  });
    const gradeData = [
      { grade_id: 1, grade_name: 'Grade A' },
      { grade_id: 2, grade_name: 'Grade B' },
      { grade_id: 3, grade_name: 'Grade C' },
      { grade_id: 4, grade_name: 'Grade D' },
    ];
    
    const jobs =[
      { grade_id: 1, grade_name: 'Grade A' },
      { grade_id: 2, grade_name: 'Grade B' },
      { grade_id: 3, grade_name: 'Grade C' },
      { grade_id: 4, grade_name: 'Grade D' },
    ]



  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pic_url', selectedImage);
      const response = await axios.post(`${BASE_API_URL}/proupload/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      return response.data.imageUrl; 
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const  handleAddUser = async (event) => {

    const pic_url = await handleUpload();

    const Adddata = {
      ...userData,
      pic_url: pic_url
    };
    console.log(Adddata);
    setOpen(false);
    // add2User(Adddata); 
    // onClose();
  }

  const handleInputChange = (event) => {
    const { name, value ,files} = event.target;
    if (name === 'pic_url') {
      const file = files[0];
      setSelectedImage(file);
      setUserData(prevFormData => ({
        ...prevFormData,
        [name]: file
      }));
    } else {
      setUserData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  const handleOk = async(e) => {
    // console.log(e);
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((errorInfo) => {
        console.error('Form validation failed:', errorInfo);
      });
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
    console.log(e);
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
  const onFinish = (values) => {
    console.log('Form input data:', values); // Log form input data
    try {
      // Handle form submission logic, e.g., make an API call
      // ...
    } catch (error) {
      console.error('Error submitting form:', error);
      // ...
    }
  };
  const handleSubmit = async () => {
    // try {
    //   const response = await axios.post('your_api_endpoint', formData);
    //   console.log('Server response:', response.data);
    //   message.success('Form submitted successfully!');
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    //   message.error('Failed to submit form. Please try again.');
    // }
  };

  const renderBankDetails = () => {
    if (userData.payment == 'bank') {
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
      <Button onClick={showModal}>Add employees</Button>
      <Modal
        title={
          <div
            style={{width: '100%',cursor: 'move',}}
            onMouseOver={() => {if (disabled) {setDisabled(false); }}}
            onMouseOut={() => {setDisabled(true);}}
            onFocus={() => {}}onBlur={() => {}}
           >
            <h3>Add Employee</h3>
          </div>
        }open={open} width={1000} onOk={handleAddUser} onCancel={handleCancel} modalRender={(modal) => (<Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}><div ref={draggleRef}>{modal}</div></Draggable>)}>
        
        
        <Form labelCol={{span: 5,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}} onFinish={onFinish}>

        <Row>
        <Col span={12}>
      
        <Form.Item label="Full names"
        name="Fnames"
        rules={[
          {
            required: true,
            message: 'Please input the Full Names!',
          },]}>
             <Input
              name="Fnames"
              value={userData.Fnames}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Address 1" name="address1">
          <Input   name="address1"
              value={userData.address1}
              onChange={handleInputChange}  />
        </Form.Item>
        <Form.Item label="Address 2" name="address2">
          <Input 
            name="address2"
            value={userData.address2}
            onChange={handleInputChange}  />
        </Form.Item>
        {/* <Form.Item label="Contract type">
             <Input
              name="taxpin"
              value={userData.taxpin}
              onChange={handleInputChange} 
          />
        </Form.Item> */}
        <Form.Item label="ID/Passport"  name="NID"
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
         name="grade"
         rules={[
           {
             required: true,
             message: 'Please input the Grade!',
           },
         ]}>
         
          <Select
              defaultValue={gradeData.length > 0 ? gradeData[0].grade_id : ''}
              onChange={handleGradeChange}
            >
              {gradeData.map(grade => (
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
        <Form.Item label="Contract type" name="contracttype">
              <Select 
              defaultValue="2"
              name="contracttype"
              onChange={handleContractChange} 
              value={userData.contracttype}
              >
                <Select.Option value="1">Contract</Select.Option>
                <Select.Option value="2">Permanent and Pensionable</Select.Option>
              </Select>
      </Form.Item>
        <Form.Item label="Payment" name="payment">
          <Select
          defaultValue="cash"
          value={userData.payment}
          onChange={handlePayChange}
          >
            <Select.Option value="mpesa">Mpesa</Select.Option>
            <Select.Option value="bank">Bank</Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Salary" name="salary">
          <InputNumber
          name="salary"
          value={userData.salary}
          onChange={handleInputChange} 
          />
        </Form.Item>

        </Col>

        <Col span={12}>

    
         <Form.Item
        label="Period"
        name="period"
   
      >
        {() => {return userData.contracttype == '2' ? (<DatePicker />) : (<RangePicker />);}}

      </Form.Item>
    
        <Form.Item label="Phone"
         name="phone"
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
        <Form.Item label="Email" name="email">
             <Input
              name="email"
              value={userData.email}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nssf" name="nssf">
             <Input
              name="nssf"
              value={userData.nssf}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Nhif" name="nhif">
             <Input
              name="nhif"
              value={userData.nhif}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Tax pin" name="pin">
          <Input
              name="pin"
              value={userData.pin}
              onChange={handleInputChange} 
          />
        </Form.Item>
        {/* <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item> */}
    


        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name="pic_url">
          <Upload action="/upload.do" listType="picture-card">
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
        {renderBankDetails()}
       
      </Form>
      </Modal>
    </>
  );
};



export default Employee;