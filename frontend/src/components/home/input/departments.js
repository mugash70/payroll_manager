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
import {post_data} from '../../../actions/all'
import {useReloadKey} from '../../default/index'; 
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const Departments = ({ type,record }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const { reloadKey, handleReload } = useReloadKey();

 const showModal = () => {
    setOpen(true);
  };
  const [deptData, setdeptData] = useState({
    dept_name:'',
 
  });

    useEffect(() => {
    if (record) {
        setdeptData({
            dept_name: record.firstname});
    }
    }, [record]); 

  const dispatch = useDispatch()
  const  handleAddDept = async () => {
    try {
      await post_data('ADDED',deptData,'/entity/ent/departments','departments')(dispatch);
      setOpen(false);
      setdeptData({})
      handleReload()
    } catch (err) {
      console.error(err);
    }}

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
      setdeptData(prevFormData => ({
        ...prevFormData,
        [name]: value
      })); };

  const onFinish = (values) => {
    console.log('Form input data:', values); // Log form input data
    try {

    } catch (error) {
      console.error('Error submitting form:', error);
      // ...
    }
  };



  return (
    <>
    {type == 'create' ? (
      <Button onClick={showModal}>Add Departments</Button>
    ) : (
      <Button onClick={showModal} type="primary">update</Button>
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
            <h3>Add Departments</h3>):(<h3>Update Departments Details</h3>)}
          </div>
        }open={open} width={500} onOk={handleAddDept} onCancel={handleCancel} modalRender={(modal) => (<Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}><div ref={draggleRef}>{modal}</div></Draggable>)}>
        
        
        <Form labelCol={{span: 8,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}} onFinish={onFinish}>
  
{type == 'create' ? (
    <>
        <Form.Item label="Department names">
             <Input
              name="dept_name"
              value={deptData.dept_name}
              onChange={handleInputChange} 
          />
        </Form.Item>

</>
):( record ? (
    <Form.Item label="Department names">
    <Input
     name="dept_name"
     value={record.dept_name}
     onChange={handleInputChange} 
     />
    </Form.Item>
    ):null)}

      </Form>
      </Modal>
    </>
  );
};



export default Departments;