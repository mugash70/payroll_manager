import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import Ded from '../../home/input/adjustments'
import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'

const breadcrumbs = ['dashboard','adjustments'];

const Deddash = () => {
const {reloadKey, handleReload} = useReloadKey();
const dispatch = useDispatch()
const {deductionData,isLoading,error,user_selection} = useSelector((state) =>({ 
  deductionData: state.all.adjustments.data,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,

}));


const handleDel= async (adj_id)=>{
  try {
    await del_data(`/entity/ent/adjustments/${adj_id}`, 'adjustments')(dispatch);   
    handleReload()
  } catch (err) {
    console.error(err);
  }
}

  const columns = [
    {
      title: 'No.',
      dataIndex: 'adj_id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.adj_id - b.adj_id,
      width: '15%',
    },
    {
      title: 'Adjustment',
      dataIndex: 'adj_name',
      onFilter: (value, record) => record.adj_name.indexOf(value) === 0,
      sorter: (a, b) => a.adj_name.length - b.adj_name.length,
      sortDirections: ['descend'],
      width: '15%',

    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      onFilter: (value, record) => record.amount.indexOf(value) === 0,
      sorter: (a, b) => a.amount.length - b.amount.length,
      sortDirections: ['descend'],
      width: '5%',
 
    },
    {
      title: 'From',
      dataIndex: 'from',
      onFilter: (value, record) => record.from.indexOf(value) === 0,
      sorter: (a, b) => a.from.length - b.from.length,
      sortDirections: ['descend'],
      width: '10%',

    },
      {
      title: 'To',
      dataIndex: 'to',
      onFilter: (value, record) => record.to.indexOf(value) === 0,
      sorter: (a, b) => a.to.length - b.to.length,
      sortDirections: ['descend'],
      width: '10%',

    },
    {
      title: 'Period',
      dataIndex: 'period',
      onFilter: (value, record) => record.period.indexOf(value) === 0,
      sorter: (a, b) => a.period.length - b.period.length,
      sortDirections: ['descend'],
      width: '10%',

    },
    {title: 'Action',
    width: '50%',
    render: (text, record) => (
      <div style={{ marginLeft: 'auto' }}>
        <Row gutter={[20]}>
          <Col>
          {<Ded  key={record.adj_id} record={record} type="update"/>}
          </Col>
          <Col>      
          {<Confrim  msg ={'Are sure you want ot delete the Department ?'}
           handleDelete={() => handleDel(record.adj_id)} 
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
        await get_data( `/entity/ent/adjustments/${user_selection.ent_id}`, 'adjustments')(dispatch); 
      } catch (err) {
        console.error(err);
      }
    };
    if(reloadKey != 0){fetchData();}
  }, [dispatch,reloadKey]);
  const onChange = (pagination, filters, sorter, extra) => {console.log('params', pagination, filters, sorter, extra);};
  if (isLoading){
    return <Spinner/>
 }else{
     return(<Table columns={columns} dataSource={deductionData} onChange={onChange} />)
 }
}

const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Deddash} Buttons={Ded}/>;
export default Home;