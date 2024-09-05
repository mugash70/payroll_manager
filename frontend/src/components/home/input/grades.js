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
import {useReloadKey} from '../../default/index'; 
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const Roles = ({ type,record }) => {
  const { reloadKey, handleReload } = useReloadKey();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const dispatch = useDispatch()
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const user_selection = useSelector((state) =>  state.user_selection);
 const showModal = () => {
    setOpen(true);
  };
  const [gradeData, setgradeData] = useState({
    // grade_name:'',
    ent_id:user_selection.ent_id,
 
  });

    useEffect(() => {
    if (record) {
        setgradeData({
            grade_name: record.grade_name,
            salary: record.salary,
            payment_period: record.payment_period,
            ent_id:user_selection.ent_id,

        });
    }
    }, [record]); 


  const isLoading = useSelector((state) =>  state.all.isLoading);
 
  const  handleAddRole = async () => {
    dispatch(setLoading(true)); 
    try{
      await post_data('ADDED',gradeData,'/grades','grades')(dispatch);
      // setgradeData({});
      handleReload() 
      setOpen(false);
      dispatch(setLoading(false),'grades'); 
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
      setgradeData(prevFormData => ({
        ...prevFormData,
        [name]: value
      })); };
      const handleInputChange2 = (value, option) => {
        setgradeData(prevFormData => ({
          ...prevFormData,
          payment_period: value
        }));
      };
    

  const onFinish = (values) => {
    console.log('Form input data:', values); // Log form input data
    try {

    } catch (error) {
      console.error('Error submitting form:', error);
      // ...
    }
  };
  const paymentPeriods = ['Minute', 'Hourly', 'Daily', 'Monthly', 'Yearly'];

  return (
    <>
 
    {type == 'create' ? (
      <Button onClick={showModal} type="primary">Add Grades/Roles</Button>
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
            <h3>Add Roles</h3>):(<h3>Update Roles Details</h3>)}
          </div>
        }open={open} width={500} onOk={handleAddRole} onCancel={handleCancel} modalRender={(modal) => (
        <Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}
            {/* {isLoading ? <Spinner /> : modal} */}
          </div>
        </Draggable>)}>
        
        
        <Form labelCol={{span: 8,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}} onFinish={onFinish}>
  
{type == 'create' ? (
    <>
{/* <Row> */}
  <Col>
  <Form.Item label="Grade names">
             <Input
              name="grade_name"
              value={gradeData.grade_name}
              onChange={handleInputChange} 
       
          />
        </Form.Item>
  </Col>
  <Col>
  <Form.Item label="Grade Salary">
             <Input
              name="salary"
              value={gradeData.salary}
              onChange={handleInputChange} 
            
          />  </Form.Item>
  </Col>
  <Col>
  <Form.Item label="Payment Period" >
    <Select
      name="payment_period"
      value={gradeData.payment_period}
      onChange={handleInputChange2}
    
    >
      {paymentPeriods.map(period => (
        <Select.Option key={period} value={period}>
          {period}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
</Col>
{/* </Row> */}
</>
):( record ? (
  <>  <Col>
  <Form.Item label="Grade names">
             <Input
              name="grade_name"
              value={gradeData.grade_name}
              onChange={handleInputChange} 
            
          />
        </Form.Item>
  </Col>
  <Col>
  <Form.Item label="Grade Salary">
             <Input
              name="salary"
              value={gradeData.salary}
              onChange={handleInputChange} 
            
          />  </Form.Item>
  </Col>
  <Col>
  <Form.Item label="Payment Period" >
    <Select
      name="payment_period"
      value={gradeData.payment_period}
      onChange={handleInputChange2}
    
    >
      {paymentPeriods.map(period => (
        <Select.Option key={period} value={period}>
          {period}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
</Col>
  
  </>

    ):null)}

      </Form>
      </Modal>
    </>
  );
};



export default Roles;