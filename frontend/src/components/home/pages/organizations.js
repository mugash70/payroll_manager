import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col,Avatar,Skeleton,Space,Text} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import { useNavigate } from "react-router-dom";
import Orgi from '../../home/input/organizations'

import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
import {UserOutlined,CodeSandboxOutlined} from '@ant-design/icons';

import { setSelected, setRemove } from '../../../actions/all';

const breadcrumbs = ['dashboard','organizations'];

const OrganDash = () => {
  const navigate = useNavigate();
  const {reloadKey, handleReload} = useReloadKey();
  const dispatch = useDispatch()
 

const handleDel= async (dept_id)=>{
  try {
    await del_data(`/organization/${dept_id}`, 'organizations')(dispatch);   
    handleReload()
  } catch (err) {
    console.error(err);

}}


const {organData,isLoading,error}= useSelector((state) =>({  
    organData: state.all.organizations.data,
    isLoading:state.all.isLoading,
    error: state.error.id,
}));

  const columns = [

    {
      title: 'organization',
      dataIndex: 'org_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>  b.dept_id-a.dept_id ,
      render: (avatarUrl, record) => (
      <Space>
      <Avatar size={34} src={avatarUrl} icon={<CodeSandboxOutlined />} />
      <span ellipsis={{ tooltip: record.org_name }} style={{ maxWidth: '150px' }}>
          {record.org_name}
      </span>
    </Space>
       
      )
    },
    {
        title: 'ID',
        dataIndex: 'org_id',
        onFilter: (value, record) => record.org_id.indexOf(value) === 0,
        sorter: (a, b) => a.org_id.length - b.org_id.length,
        sortDirections: ['descend'],
        // width: '10%',
      },

      {
        title: 'No of Entities',
        dataIndex: 'pay_name',
        onFilter: (value, record) => record.pay_name.indexOf(value) === 0,
        sorter: (a, b) => a.pay_name.length - b.pay_name.length,
        sortDirections: ['descend'],
        // width: '25%',
      },
      {
        title: 'Bussiness No',
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
      // width: '10%',
    },
    {title: 'Action',
    // width: '40%',
    render: (text, record) => (
      <div style={{ marginLeft: 'auto' }}>
         <Row gutter={[20]} justify="center"> {/* Adjust justify property as needed */}
         <Col>
        <Button
          type="primary" ghost 
          onClick={() => handleButtonClick('org_id', record.org_id)}
          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >View
        </Button>
      </Col>
      <Col>
        <Orgi key={record.dept_id} record={record} type="update" />
      </Col>

      <Col>
        <Confrim
          msg={'Are you sure you want to delete the Organization?'}
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
    navigate('/entities');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/organization', 'organizations')(dispatch); 
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
        <Table columns={columns} dataSource={organData} onChange={onChange}/>
)}}


const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={OrganDash} Buttons={Orgi}/>;
export default Home;