import React, { useEffect, useState } from 'react';
import { Table,Button,Row,Col,theme,Avatar} from 'antd';
import { Link } from "react-router-dom";
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import { useDispatch,useSelector  } from 'react-redux';
import Spinner from '../../default/spinner';
import Alert from '../../default/alert'
import Emp from '../../home/input/employee'
import Confrim from '../../default/confrim'
import {useReloadKey} from '../../default/index'
import {UserOutlined } from '@ant-design/icons';
const onChange = (pagination, filters, sorter, extra) => {console.log('params', pagination, filters, sorter, extra);};

const breadcrumbs = ['dashboard','employees'];
const Employeedash = () => {
  const {reloadKey, handleReload} = useReloadKey();
    const columns = [
      {
        title: 'Profile',
        dataIndex: 'pic_link',
        render: (avatarUrl, record) => (
          <Avatar size={64} src={avatarUrl} icon={<UserOutlined />}/>
        )
      },
        {
          title: 'First Name',
          dataIndex: 'firstname',
          onFilter: (value, record) => `${record.firstname} ${record.lastname}`.indexOf(value) === 0,
          sorter: (a, b) => `${a.firstname} ${a.lastname}`.length - `${b.firstname} ${b.lastname}`.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Other Names',
          dataIndex: 'lastname',
          onFilter: (value, record) => `${record.firstname} ${record.lastname}`.indexOf(value) === 0,
          sorter: (a, b) => `${a.firstname} ${a.lastname}`.length - `${b.firstname} ${b.lastname}`.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Grade',
          dataIndex: 'grade_name',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address1',
          filters: [{text: 'London',value: 'London',},{text: 'New York',value: 'New York',},],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
          title: 'Department',
          dataIndex: 'dept_name',
          filters: [{text: 'London',value: 'London',},{text: 'New York',value: 'New York',},],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {title: 'Action',
          render: (text, record) => (
            <Row gutter={[20]}>
             <Col>
            <Button >
              <Link to={`/employees/${record.emp_id}`}>View</Link>
            </Button>
            </Col>

            <Col>
            {<Emp  key={record.emp_id} record={record} type="update"/>}
            </Col>
            <Col>      
            {<Confrim  msg ={'Are sure you want ot delete the Employees ?'}
             handleDelete={() => handleDel(record.emp_id)} 
            />}
              </Col>
          </Row>
              
          ),
        },
      ];

const handleDel= async (dept_id)=>{

  try {
    await del_data(`/employees/${dept_id}`, 'employees')(dispatch);
    handleReload()   
  } catch (err) {
    console.error(err);
  }
}
const employeeData = useSelector((state) =>  state.all.employees.data);
const isLoading = useSelector((state) =>  state.all.isLoading);
const error = useSelector((state) => state.error.id);

const dispatch = useDispatch()

useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/employees', 'employees')(dispatch);
        await get_data('/grades', 'grades')(dispatch);
        await get_data('/entity/ent/departments', 'departments')(dispatch);        
      } catch (err) {
        console.error(err);
      }
    };
    if(reloadKey != 0){fetchData();}
  }, [dispatch,reloadKey]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

if (isLoading){
   return <Spinner/>
}else{
    return(<Table columns={columns} dataSource={employeeData} onChange={onChange} />)
}
};
const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Employeedash} Buttons={Emp} />;
export default Home;