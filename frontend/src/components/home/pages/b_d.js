import React, { useEffect,useState } from 'react';
import { Table,Button,Row,Col} from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import Ded from '../../home/input/adjustments'
import Spinner from '../../default/spinner';
import Confrim from '../../default/confrim'
import { useDispatch,useSelector  } from 'react-redux';

const breadcrumbs = ['dashboard','adjustments'];

const Deddash = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey(prevKey => prevKey + 1);
  };


const handleDel= async (Ded_id)=>{

  try {
    await del_data(`/entity/ent/adjustments/${Ded_id}`, 'adjustments')(dispatch);   
  } catch (err) {
    console.error(err);
  }finally{
  
    handleReload()
  
  }
}
const dispatch = useDispatch()
const deductionData = useSelector((state) =>  state.all.bonusdeductions.data);
const isLoading = useSelector((state) =>  state.all.isLoading);
const error = useSelector((state) => state.error.id);

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
          {<Ded  key={record.Ded_id} record={record} type="update"/>}
          </Col>
          <Col>
          {/* DISPLAY EMPLOYEES */}
          <Button type="secondary"  onClick={()=>{console.log(record.Ded_id)}} >Employees</Button>
          </Col>
          <Col>      
          {<Confrim  msg ={'Are sure you want ot delete the Department ?'}
           handleDelete={() => handleDel(record.Ded_id)} 
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
        await get_data('/entity/ent/adjustments', 'adjustments')(dispatch); 
        handleReload()  
      } catch (err) {
        console.error(err);
      }finally{
        handleReload();
      }
    };
    fetchData();
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