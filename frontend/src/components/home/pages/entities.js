import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col,Avatar,Skeleton,Space,Text} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import { useNavigate } from "react-router-dom";
import Enti from '../../home/input/entities'

import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
import {UserOutlined,CodeSandboxOutlined} from '@ant-design/icons';

import { setSelected, setRemove } from '../../../actions/all';

const breadcrumbs = ['dashboard','entities'];

const Entitydash = () => {
  const navigate = useNavigate();
  const {reloadKey, handleReload} = useReloadKey();
  const dispatch = useDispatch()
 

const handleDel= async (dept_id)=>{
  try {
    await del_data(`/entity/ent/entities/${dept_id}`, 'entities')(dispatch);   
    handleReload()
  } catch (err) {
    console.error(err);

}}


const {entitiesData,isLoading,error,user_selection}= useSelector((state) =>({  
    entitiesData: state.all.entities.data,
    isLoading:state.all.isLoading,
    error: state.error.id,
    user_selection:state.user_selection,
}));

  const columns = [

    {
      title: 'Entities',
      dataIndex: 'ent_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>  b.dept_id-a.dept_id ,
      render: (avatarUrl, record) => (
      <Space>
      <Avatar size={34} src={avatarUrl} icon={<CodeSandboxOutlined />} />
      <span ellipsis={{ tooltip: record.ent_name }} style={{ maxWidth: '150px' }}>
          {record.ent_name}
      </span>
    </Space>
       
      )
    },
    {
        title: 'ID',
        dataIndex: 'ent_id',
        onFilter: (value, record) => record.ent_id.indexOf(value) === 0,
        sorter: (a, b) => a.ent_id.length - b.ent_id.length,
        sortDirections: ['descend'],
        width: '10%',
      },

      {
        title: 'Payment',
        dataIndex: 'pay_name',
        onFilter: (value, record) => record.pay_name.indexOf(value) === 0,
        sorter: (a, b) => a.pay_name.length - b.pay_name.length,
        sortDirections: ['descend'],
        // width: '25%',
      },
      {
        title: 'Frequency',
        dataIndex: 'freq_name',
        onFilter: (value, record) => record.freq_name.indexOf(value) === 0,
        sorter: (a, b) => a.freq_name.length - b.freq_name.length,
        sortDirections: ['descend'],
        // width: '25%',
      },
      
    {
      title: 'No . Employees',
      dataIndex: 'dept_name',
      onFilter: (value, record) => record.dept_name.indexOf(value) === 0,
      sorter: (a, b) => a.dept_name.length - b.dept_name.length,
      sortDirections: ['descend'],
      width: '10%',
    },
    {title: 'Action',
    // width: '40%',
    render: (text, record) => (
      <div style={{ marginLeft: 'auto' }}>
         <Row gutter={[20]} justify="center"> {/* Adjust justify property as needed */}
         <Col>
        <Button
          type="primary" ghost 
          onClick={() => handleButtonClick('ent_id', record.ent_id)}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >Dashboard
        </Button>
      </Col>
      <Col>
        <Enti key={record.dept_id} record={record} type="update" />
      </Col>

      <Col>
        <Confrim
          msg={'Are you sure you want to delete the Entity?'}
          handleDelete={() => handleDel(record.dept_id)}
        />
      </Col>
    </Row>
        </div>
    ),
  },

  ];
  const handleButtonClick = (key, value) => {
    dispatch(setSelected(key, value));
    navigate('/dashboard');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data(`/entity/${user_selection.org_id}`, 'entities')(dispatch); 
      } catch (err) {
        console.error(err);
      }
    };
    if (reloadKey != 0) {
      fetchData();
    }
  }, [dispatch,reloadKey]);

  
  const onChange = (pagination, filters, sorter, extra) => {console.log('params', pagination, filters, sorter, extra);};
  
 

  if (isLoading){
    return <Spinner/>
 }else{
     return( 
        <Table columns={columns} dataSource={entitiesData} onChange={onChange}/>
)}}


const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Entitydash} Buttons={Enti}/>;
export default Home;