import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col,Avatar,Skeleton} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import { useNavigate } from "react-router-dom";
import Enti from '../../home/input/entities'

import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
import {UserOutlined,CodeSandboxOutlined} from '@ant-design/icons';
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


const {entitiesData,isLoading,error}= useSelector((state) =>({  
    entitiesData: state.all.entities.data,
    isLoading:state.all.isLoading,
    error: state.error.id,
}));

  const columns = [

    {
      title: 'Entities',
      dataIndex: 'dept_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) =>  b.dept_id-a.dept_id ,
      width: '20%',
      render: (avatarUrl, record) => (
        <Avatar size={64} src={avatarUrl} icon={<CodeSandboxOutlined />}/>
      
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

      // {
      //   title: 'Email',
      //   dataIndex: 'email',
      //   onFilter: (value, record) => record.email.indexOf(value) === 0,
      //   sorter: (a, b) => a.email.length - b.email.length,
      //   sortDirections: ['descend'],
      //   width: '10%',
      // },
      // {
      //   title: 'Phone',
      //   dataIndex: 'phone',
      //   onFilter: (value, record) => record.phone.indexOf(value) === 0,
      //   sorter: (a, b) => a.phone.length - b.phone.length,
      //   sortDirections: ['descend'],
      //   width: '10%',
      // },
      // {
      //   title: 'Default Payment Method',
      //   dataIndex: 'payment',
      //   onFilter: (value, record) => record.payment.indexOf(value) === 0,
      //   sorter: (a, b) => a.payment.length - b.payment.length,
      //   sortDirections: ['descend'],
      //   width: '25%',
      // },
      // {
      //   title: 'Default Payment Frequency',
      //   dataIndex: 'payment_period',
      //   onFilter: (value, record) => record.payment_period.indexOf(value) === 0,
      //   sorter: (a, b) => a.payment_period.length - b.payment_period.length,
      //   sortDirections: ['descend'],
      //   width: '25%',
      // },
      
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
        {/* <Row gutter={[20]}>
          <Col>
          {<Enti  key={record.dept_id} record={record} type="update"/>}
          </Col>
            <Col>
            <Button type="primary"  onClick={()=>{console.log(record.dept_id)}} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}  >Dashboard</Button>
            </Col>
          <Col>      
          {<Confrim  msg ={'Are sure you want ot delete the Department ?'}
           handleDelete={() => handleDel(record.dept_id)} 
          />}
            </Col>
        </Row> */}
         <Row gutter={[20]} justify="center"> {/* Adjust justify property as needed */}
         <Col>
        <Button
          type="primary" ghost 
          onClick={() => navigate('/dashboard')}
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/entity', 'entities')(dispatch); 
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
        // <Skeleton loading={isLoading} avatar active>
        <Table columns={columns} dataSource={entitiesData} onChange={onChange}/>
    //  </Skeleton>
)}}


const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Entitydash} Buttons={Enti}/>;
export default Home;