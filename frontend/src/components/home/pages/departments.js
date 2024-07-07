import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col,Avatar} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import Dept from '../../home/input/departments'
import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
const breadcrumbs = ['dashboard','departments'];

const Deptdash = () => {
  const {reloadKey, handleReload} = useReloadKey();
  const dispatch = useDispatch()
 

const handleDel= async (dept_id)=>{
  try {
    await del_data(`/entity/ent/departments/${dept_id}`, 'departments')(dispatch);   
    handleReload()
  } catch (err) {
    console.error(err);

}}



const {departmentData,isLoading,error,user_selection} = useSelector((state) =>({ 
  departmentData:state.all.departments.data,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,
}));

  const columns = [

    {
      title: 'No.',
      dataIndex: 'dept_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.dept_id - b.dept_id,
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'dept_name',
      onFilter: (value, record) => record.dept_name.indexOf(value) === 0,
      sorter: (a, b) => a.dept_name.length - b.dept_name.length,
      sortDirections: ['descend'],
      width: '40%',
    },
    {title: 'Action',
    width: '40%',
    render: (text, record) => (
      <div style={{ marginLeft: 'auto' }}>
        <Row gutter={[20]}>
          <Col>
          {<Dept  key={record.dept_id} record={record} type="update"/>}
          </Col>
          <Col>
          {/* DISPLAY EMPLOYEES */}
          <Button type="secondary"  onClick={()=>{console.log(record.dept_id)}} >Employees</Button>
          </Col>
          <Col>      
          {<Confrim  msg ={'Are sure you want ot delete the Department ?'}
           handleDelete={() => handleDel(record.dept_id)} 
          />}
            </Col>
        </Row>
        </div>
    ),
  },

  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data(`/entity/ent/departments/${user_selection.ent_id}`, 'departments')(dispatch); 
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
     return(<Table columns={columns} dataSource={departmentData} onChange={onChange} />)
 }
}


const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Deptdash} Buttons={Dept}/>;
export default Home;