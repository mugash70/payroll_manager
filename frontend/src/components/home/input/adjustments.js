import React, { useRef, useState,useEffect } from 'react';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector  } from 'react-redux';
import Spinner from '../../default/spinner';
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
import {post_data,handleUpload,setLoading} from '../../../actions/all'
import {useReloadKey} from '../../default/index'
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const Roles = ({ type,record }) => {

  const {reloadKey, handleReload} = useReloadKey();
  const dispatch = useDispatch()
  const isLoading = useSelector((state) =>  state.all.isLoading);

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
  const [AdjsData, setAdjsData] = useState({});

    useEffect(() => {
    if (record) {
        setAdjsData({
            grade_name: record.grade_name,
            salary: record.salary,
            payment_period: record.payment_period,

        });
    }
    }, [record]); 


  const  handleAddRole = async () => {
    dispatch(setLoading(true)); 
    try{
      await post_data(AdjsData,'/entity/ent/adjustments','adjustments')(dispatch);
      setAdjsData({});
      handleReload()
      setOpen(false);
      dispatch(setLoading(false)); 
    }catch(err){
      console.log(err);
    }
   
  }

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

  const handleInputChange = (event) => {
    const { name, value ,files} = event.target;
      setAdjsData(prevFormData => ({
        ...prevFormData,
        [name]: value
      })); };
      
  const handleInputChange2 = (name, value) => {
    setAdjsData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleInputChangedate = (name, value) => {
    if (name === 'xto' || name === 'xfrom') {
      setAdjsData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setAdjsData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    };

  const onFinish = (values) => {
    console.log('Form input data:', values); // Log form input data
    try {

    } catch (error) {
      console.error('Error submitting form:', error);
      // ...
    }
  };
  const adjtypes = ['Bonus', 'Deduction'];
  const periodstypes = ['permanent','temporary'];
  const amounttypes = ['percentage', 'numbers'];

  return (
    <>
 
    {type == 'create' ? (
      <Button onClick={showModal}>Add Adjustments</Button>
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
            <h3>Add Adjustments</h3>):(<h3>Update Adjustments Details</h3>)}
          </div>
        }open={open} width={500} onOk={handleAddRole} onCancel={handleCancel} modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>)}>
        
        
        <Form labelCol={{span: 10,}} wrapperCol={{span: 20,}}layout="horizontal" style={{maxWidth:'100%',}} onFinish={onFinish}>
  
{type == 'create' ? (
    <>
<Row>
  <Col span ={20}>
  <Form.Item label="Adjustment Type">
  <Select
      name="adjust_type"
      value={AdjsData.adjust_type}
      // onChange={handleInputChange2}>
      onChange={(value, option) => handleInputChange2("adjust_type", value)}
      >
      {adjtypes.map(adjtypes => (
        <Select.Option key={adjtypes} value={adjtypes}>
          {adjtypes}
        </Select.Option>
      ))}
    </Select>
        </Form.Item>
  <Form.Item label="Name">
             <Input
              name="adj_name"
              value={AdjsData.adj_name}
              onChange={handleInputChange} 
            
          />  </Form.Item>

  <Form.Item label="Period" >
    <Select
      name="payment_period"
      value={AdjsData.payment_period}
      onChange={(value, option) => handleInputChange2("payment_period", value)}
    
    >
      {periodstypes.map(payment_period => (
        <Select.Option key={payment_period} value={payment_period}>
          {payment_period}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item label="Amount Type" >
  <Select
    name="amount_type"
    value={AdjsData.amount_type}
    onChange={(value, option) => handleInputChange2("amount_type", value)}
  >
      {amounttypes.map(amount_type => (
        <Select.Option key={amount_type} value={amount_type}>
          {amount_type}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>

  {AdjsData.amount_type == 'percentage' ? (
    <Form.Item label="Amount" >
      <Input
      name="amount"
        value={AdjsData.amount}
        onChange={handleInputChange}
        addonAfter="%"
      />
    </Form.Item>
  ) : (
    <Form.Item label="Amount" >
      <Input
      name="amount"
        value={AdjsData.amount}
        onChange={handleInputChange}
      />
    </Form.Item>
  )}

{AdjsData.payment_period == 'temporary' ? (

<Row gutter={10}>
  <Col span={12}>
    <Form.Item label="From" name="xfrom">
      <DatePicker  onChange={(date, dateString) => handleInputChangedate('xfrom', dateString)} />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item label="To" name="xto">
      <DatePicker  onChange={(date, dateString) => handleInputChangedate('xto', dateString)} />
    </Form.Item>
  </Col>
</Row>



  ) : null}
</Col>
</Row>
</>
):( record ? (
  <Row>
  <Col span ={20}>
  <Form.Item label="Adjustment Type">
  <Select
      name="adjust_type"
      value={record.adj_type}
      onChange={(value, option) => handleInputChange2("adjust_type", value)}
      >
      {adjtypes.map(adjtypes => (
        <Select.Option key={adjtypes} value={adjtypes}>
          {adjtypes}
        </Select.Option>
      ))}
    </Select>
        </Form.Item>
  <Form.Item label="Name">
             <Input
              name="adj_name"
              value={record.adj_name}
              onChange={handleInputChange} 
            
          />  </Form.Item>

  <Form.Item label="Period" >
    <Select
      name="period"
      value={record.period}
      onChange={(value, option) => handleInputChange2("payment_period", value)}
    
    >
      {periodstypes.map(payment_period => (
        <Select.Option key={payment_period} value={payment_period}>
          {payment_period}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item label="Amount Type" >
  <Select
    name="amount_type"
    value={record.amount_type}
    onChange={(value, option) => handleInputChange2("amount_type", value)}
  >
      {amounttypes.map(amount_type => (
        <Select.Option key={amount_type} value={amount_type}>
          {amount_type}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>

  {record.amount_type == 'percentage' ? (
    <Form.Item label="Amount" >
      <Input
      name="amount"
        value={record.amount}
        onChange={handleInputChange}
        addonAfter="%"
      />
    </Form.Item>
  ) : (
    <Form.Item label="Amount" >
      <Input
      name="amount"
        value={record.amount}
        onChange={handleInputChange}
      />
    </Form.Item>
  )}

{record.period == 'temporary' ? (

<Row gutter={10}>
  <Col span={12}>
    <Form.Item label="From" name="xfrom">
      <DatePicker value={record.from}  onChange={(date, dateString) => handleInputChangedate('xfrom', dateString)} />
    </Form.Item>
  </Col>
  <Col span={12}>
    <Form.Item label="To" name="xto">
      <DatePicker value={record.to}  onChange={(date, dateString) => handleInputChangedate('xto', dateString)} />
    </Form.Item>
  </Col>
</Row>



  ) : null}
</Col>
</Row>

    ):null)}

      </Form>
      </Modal>
    </>
  );
};



export default Roles;