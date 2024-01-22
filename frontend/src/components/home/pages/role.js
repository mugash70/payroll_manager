import React, { useEffect,useState }  from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import { Table,Button,Row,Col } from 'antd';
import Layoutx  from '../../default/layout';

import Grad from '../../home/input/grades'
import {useReloadKey} from '../../default/index'
import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import {post_data,get_data,update_data,del_data} from '../../../actions/all'


const breadcrumbs = ['dashboard','roles'];
const RoleDash = () =>{
const {reloadKey, handleReload} = useReloadKey();
const dispatch = useDispatch()
const gradesData = useSelector((state) =>  state.all.grades.data);
const isLoading = useSelector((state) =>  state.all.isLoading);
const error = useSelector((state) => state.error.id);



const columns = [
  {
    title: 'Id',
    dataIndex: 'grade_id',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.grade_id - b.grade_id,
  },
  {
    title: 'Grade/Role',
    dataIndex: 'grade_name',
    onFilter: (value, record) => record.grade_name.indexOf(value) === 0,
    sorter: (a, b) => a.grade_name.length - b.grade_name.length,
    sortDirections: ['descend'],
    width: '40%',
  },
  {
    title: 'Grade salary',
    dataIndex: 'salary',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.salaray - b.salaray,
    width: '40%',
  },
  {
    title: 'payment_period',
    dataIndex: 'payment_period',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.payment_period - b.payment_period,
  },
  {title: 'Action',
  width: '40%',
  render: (text, record) => (
    <div style={{ marginLeft: 'auto' }}>
      <Row gutter={[20]}>
        <Col>
        {<Grad  key={record.grade_id} record={record} type="update"/>}
        </Col>
        <Col>      
        {<Confrim  msg ={'Are sure you want ot delete the Department ?'}
        // 
         handleDelete={() =>handleDel(record.grade_id)} 
        />}
          </Col>
      </Row>
      </div>
  ),
},
  
];


const handleDel= async (grade_id)=>{ ;try { await del_data(`/grades/${grade_id}`, 'grades')(dispatch); } catch (err) {console.error(err);}finally{ handleReload()}}

useEffect(() => {

  const fetchData = async () => {
    try {
      await get_data('/grades', 'grades')(dispatch);   
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
   return(<Table columns={columns} dataSource={gradesData} onChange={onChange} />)
}
}

const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={RoleDash} Buttons={Grad} />;
export default Home;