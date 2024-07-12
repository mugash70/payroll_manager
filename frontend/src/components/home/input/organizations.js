import React, { useRef, useState,useEffect } from 'react';
import Draggable from 'react-draggable';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch,useSelector  } from 'react-redux';
import AlertMessage from '../../default/AlertMessage'
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
import { useNavigate } from "react-router-dom";
import { setSelected, setRemove } from '../../../actions/all';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


const Organizations = ({ type,record }) => {
    const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState({
    show:false,
    num:0
});
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




  var {created_by,error} = useSelector(state => ({
    error: state.error.msg,
    created_by:state.auth.user.user_id
}));

  const { reloadKey, handleReload } = useReloadKey();

 const showModal = () => {
    setOpen(true);
  };
  const [orgData, setOrgData] = useState({
    org_name:'',
    created_by:created_by,
  });

    useEffect(() => {if (record) {setOrgData({
        org_name:record.org_name,
        phone: record.phone,
        org_id: record.org_id,
        email: record.email,
        Has_entity: record.Has_entity,
        logo: record.logo,
        no_entities: record.no_entities,
    });}}, [record]); 

    const  handleUpdateUser = async () => {
        console.log(orgData);
          await update_data(orgData,`/organization/${orgData.org_id}`,'organizations','org_id')(dispatch);
          handleReload()   
          setOpen(false);
    }
  const dispatch = useDispatch()
  const  handleAddEnt = async () => {

    try {
        if (!orgData.Has_entity || !orgData.org_name ) {
            setShowAlert(prevState => ({
                ...prevState,
                num: prevState.num + 1,
                show: true
              }));
            return 
          }
        const orgResponse = await post_data('ADDED',orgData,'/organization','organizations')(dispatch);
      
    if(orgData.Has_entity == 0){

        var entData ={
            ent_name:orgResponse.data?.data.org_name,
            org_id:orgResponse.data?.data.org_id
        }
        await post_data('ADDED',entData,'/entity','entities')(dispatch);
        dispatch(setSelected('org_id', orgResponse.data?.data.org_id));
        setOrgData({
            org_name:'',
            Has_entity:'',
        })
        setOpen(false);
        handleReload()
        navigate('/entities');
      }else{
        setOrgData({
            org_name:'',
            Has_entity:'',
        })
        setOpen(false);
        handleReload()
      }
     
    } catch (err) {
      console.error(err);
    }
    // finally{
     
    // }
}

  const handleCancel = (e) => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrgData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleInputChangefile =  async  (info) => {

    if (info.file.status === 'done') {
      const value = info.file.response.imageUrls[0].url
      setSelectedImage(info.file.response.imageUrls[0].url); 
      setOrgData((prevFormData) => ({
        ...prevFormData,
        logo: value,
      }));
    } else if (info.file.status ==='removed') {
      var x = info.file.response.imageUrls.map(image => image.filen)
      await axios.delete(`${BASE_API_URL}/upload/${x}`);

      setOrgData((prevFormData) => ({
        ...prevFormData,
        pic_url: null, 
      }));
    }
  };
  const handleRadioChange = (e) => {
    setOrgData({
      ...orgData,
      Has_entity: e.target.value,
    });
  };

  return (
    <>
    {showAlert.show && <AlertMessage type="error" content="Please Fill in All the details" num={showAlert.num} />}
    {/* {showAlert && <AlertMessage type="success" content="Action Completed" />} */}
    {type === 'create' ? (
      <Button onClick={showModal}>Add Organizations</Button>
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
            <h3>Add (Organization/Company/firm/Group)</h3>):(<h3>Update Details</h3>)}
          </div>
        }open={open} width={500}  onOk={type === 'create' ? handleAddEnt : handleUpdateUser} onCancel={handleCancel} modalRender={(modal) => (<Draggable disabled={disabled} bounds={bounds} nodeRef={draggleRef} onStart={(event, uiData) => onStart(event, uiData)}><div ref={draggleRef}>{modal}</div></Draggable>)}>
        
        
        <Form labelCol={{span: 8,}} wrapperCol={{span: 17,}}layout="horizontal" style={{maxWidth:'100%',}}>
  
{type === 'create' ? (
    <>
        <Form.Item label="Organization Name">
             <Input
              name="org_name"
              value={orgData.org_name}
              onChange={handleInputChange} 
          />
        </Form.Item>
        <Form.Item label="Entitie(s)">
        <Radio.Group 
        value={orgData.Has_entity} 
        onChange={handleRadioChange} 

      >
      <Radio.Button value="0" style={{ marginRight: '10px' }}>Single</Radio.Button><Radio.Button value="1">Multiple</Radio.Button>
    </Radio.Group>
        </Form.Item>



</>
):( record ? (
  <>
    <Form.Item label="Organizations names">
    <Input
     name="org_name"
     value={orgData.org_name}
     onChange={handleInputChange} 
     />
    </Form.Item>
      <Form.Item label="Email">
      <Input
       name="email"
       value={orgData.email}
       onChange={handleInputChange} 
       />
      </Form.Item>
        <Form.Item label="Phone" >
     <Input name="phone"
         value={orgData.phone}
         onChange={handleInputChange} />
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

</>)

:null)}


      </Form>
      </Modal>
    </>
  );
};



export default Organizations;