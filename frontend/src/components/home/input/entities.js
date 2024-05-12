import React, { useRef, useState,useEffect } from 'react';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector  } from 'react-redux';
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
import {post_data,update_data} from '../../../actions/all'
import {useReloadKey} from '../../default/index'; 
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const Entities = ({ type,record }) => {
  const paymentPeriods =[
    {id:"1",period_name:'Minute'},
    {id:"2",period_name:'Hourly'},
    {id:"3",period_name:'Daily'},
    {id:"4",period_name:'Monthly'},
    {id:"5",period_name:'Yearly'}
    
  ] 
  const paymentsMethods =[
    {id:"1",pay_name:'cash'},
    {id:"2",pay_name:'bank'},
    {id:"3",pay_name:'mpesa'},
    
  ] 
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // const [GradeData,setGradeData]=useState();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
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




  var {org_id,error,gradeData} = useSelector(state => ({
    org_id: state.auth.user.org_id,
    error: state.error.msg,
    gradeData:state.all.grades
    // msg:state.auth.msg
}));

  const { reloadKey, handleReload } = useReloadKey();

 const showModal = () => {
    setOpen(true);
  };
  const [entData, setentData] = useState({
    ent_name:'',
    org_id:org_id,
  });

    useEffect(() => {if (record) {setentData({
      ent_id:record.ent_id,
      ent_name: record.ent_name,
      org_id: record.org_id,
      email: record.email,
      phone: record.phone,
      payment: record.payment,
      payment_period: record.payment_period,
      account_no: record.account_no,
      account_type: record.account_type,
      bank_name:record.bank_name,
      bank_branch: record.bank_branch
    
    });}}, [record]); 
    const  handleUpdateUser = async () => {
  
            let updateData = null
            if (entData.payment === 1 ||entData.payment === 3  ){
              updateData = {
                ...entData,
                account_no:'',
                bank_branch:'',
                bank_name:'',
                account_type:''
              };
            }else{
              updateData = entData
            }
          await update_data(updateData,`/entity/${entData.ent_id}`,'entities')(dispatch);
          handleReload()   
          // setentData({})
          setOpen(false);
    }
  const dispatch = useDispatch()
  const  handleAddEnt = async () => {
    try {
      await post_data('ADDED',entData,'/entity','entities')(dispatch);
      setOpen(false);
      setentData({})
      handleReload()
    } catch (err) {
      console.error(err);
    }}

  const handleCancel = (e) => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setentData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  const handlePayChange = (event) => {
    const value  = event;
    setentData({ ...entData, payment: value });
  };
  
  const handlePaymentPeriodChange = (value) => {
    setentData({ ...entData, payment_period: value });
  };
  const renderBankDetails = () => {
    if (entData.payment === "2") {
      return (

      <Row gutter={16}>
      <Divider plain>Bank Details</Divider>
      <Row>
        <Col md={12}>
          <Form.Item label="Name" className="mb-3">
            <Input
              type="text"
              name="bank_name"
              value={entData.bank_name}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Account" className="mb-3">
            <Input
              type="text"
              name="account_no"
              value={entData.account_no}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col></Row>
        <Row>
        <Col md={12}>
          <Form.Item label="Branch" className="mb-3">
            <Input
              type="text"
              name="bank_branch"
              value={entData.bank_branch}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label="Type" className="mb-3">
            <Input
              type="text"
              name="account_type"
              value={entData.account_type}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Col>
        </Row>
      </Row>
      );
    }
    return null;
  };

  return (
    <>
    {type === 'create' ? (
      <Button onClick={showModal}>Add Entities</Button>
    ) : (
      <Button onClick={showModal} type="primary" ghost  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} >Update</Button>
    )}
      <Modal
        title={
          <div
            style={{width: '100%',cursor: 'move',}}
            onMouseOver={() => {if (disabled) {setDisabled(false); }}}
            onMouseOut={() => {setDisabled(true);}}
            onFocus={() => {}}onBlur={() => {}}
           >
            {type === 'create' ? (
            <h3>Add Entity</h3>):(<h3>Update Entity Details</h3>)}
          </div>
        }open={open} width={500}  onOk={type === 'create' ? handleAddEnt : handleUpdateUser} onCancel={handleCancel} modalRender={(modal) => (<Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}><div ref={draggleRef}>{modal}</div></Draggable>)}>
        
        
        <Form labelCol={{span: 8,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}}>
  
{type === 'create' ? (
    <>
        <Form.Item label="Entity Name">
             <Input
              name="ent_name"
              value={entData.ent_name}
              onChange={handleInputChange} 
          />
        </Form.Item>

</>
):( record ? (
  <>
    <Form.Item label="Entities names">
    <Input
     name="ent_name"
     value={entData.ent_name}
     onChange={handleInputChange} 
     />
    </Form.Item>
      <Form.Item label="Email">
      <Input
       name="email"
       value={entData.email}
       onChange={handleInputChange} 
       />
      </Form.Item>
        <Form.Item label="Phone" >
     <Input name="phone"
         value={entData.phone}
         onChange={handleInputChange} />
   </Form.Item>
   <Form.Item label="Payment">
  <Select
    value={entData.payment}
    onChange={handlePayChange}
  >
     {paymentsMethods.map(methods=> (
      <Select.Option key={methods.id} value={methods.id}>
        {methods.pay_name}
      </Select.Option>
    ))}

  </Select>
</Form.Item>
<Form.Item label="Payment frequency">
  <Select
    name="payment_period"
    value={entData.payment_period}
    onChange={handlePaymentPeriodChange}>
    {paymentPeriods.map(period => (
      <Select.Option key={period.id} value={period.id}>
        {period.period_name}
      </Select.Option>
    ))}
  </Select>
</Form.Item>
</>)

:null)}


     {renderBankDetails()}
      </Form>
      </Modal>
    </>
  );
};



export default Entities;