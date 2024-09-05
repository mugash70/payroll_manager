import React, { useEffect, useState,useRef  } from 'react';
import {PlusOutlined,MinusOutlined ,DollarOutlined,CalendarOutlined,FileSearchOutlined,FolderOpenOutlined,LoadingOutlined,TeamOutlined} from '@ant-design/icons';
import {Col,Row,Modal,Button, Tabs,Avatar, List,Typography,Divider,Skeleton,Descriptions,Table } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layoutx  from '../../default/layout';
import { useDispatch,useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {useReloadKey} from '../../default/index'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Draggable from 'react-draggable';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'

const { TabPane } = Tabs;
const { Title,Text } = Typography;
const breadcrumbs = ['dashboard','employees','details'];


const Allowance = () => {
  const allowancedata = useSelector((state) => state.all.adjustments.data);
  // const [dataLength, setDataLength] = useState(10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef(null);


  const columns = [

    {
      title: 'Name',
      dataIndex: 'adj_name',
      key: 'adj_name',
      onFilter: (value, record) => record.adj_name.toLowerCase().includes(value.toLowerCase()),
      sorter: (a, b) => a.adj_name.length - b.adj_name.length,
      sortDirections: ['descend', 'ascend'],
      render: (adj_name, record) => (
        <>
          <Avatar
            icon={record.adj_type !== 'Bonus' ? <MinusOutlined /> : <PlusOutlined />}
            style={{ backgroundColor: record.adj_type !== 'Bonus' ? 'red' : 'green', marginRight: 8 }}
          />{'\u00A0\u00A0\u00A0'}
          <a href="#">{adj_name.toUpperCase()}</a>
        </>
      ),
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      render: (text, record) => (
        <h4 style={{ textAlign: 'left' }}>
          {record.period}{'(' + record.adj_type + ')'}
        </h4>
      ),
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (text, record) => (
        record.from && record.to ? (
          <Title level={5} style={{ textAlign: 'center' }}>
            <Text>From: {new Date(record.from).toLocaleDateString()} </Text>
            {'\u00A0\u00A0\u00A0'}
            <Text>To: {new Date(record.to).toLocaleDateString()}</Text>
          </Title>
        ) : (
          <Title level={5} style={{ textAlign: 'center' }}>
              <Title level={3}>∞</Title>
          </Title>
        )
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <Title style={{ textAlign: 'right', fontSize: '20px'}}>
          {record.amount_type === 'percentage' ? amount + '%' : amount}
        </Title>
      ),
    },
  ];
  useEffect(() => {
    setData(allowancedata.slice(0, currentPage * 10));
  }, [allowancedata, currentPage]);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (
      scrollContainer.scrollTop + scrollContainer.clientHeight === scrollContainer.scrollHeight
      && !loading && hasMore
    ) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setLoading(false);
      }, 1000);  // Simulating API call delay, replace with actual data fetching
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);
  return (
    <div ref={scrollContainerRef} style={{ height: '400px', overflowY: 'auto' }}>
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record, index) => index}
      pagination={false}  // Disable default pagination
    />
    {loading && (
      <Skeleton active />
    )}
    {!loading && !hasMore && (
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Text type="secondary">No more data</Text>
      </div>
    )}
  </div>

 
  );
};



const Leave =()=>{
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

  return(
    <>
        <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    
    </>
  )
}

const History =()=>{
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const loadMoreData = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
        .then((res) => res.json())
        .then((body) => {
          setData([...data, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    useEffect(() => {
      loadMoreData();
    }, []);
  
    return(
      <>
          <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      
      </>
  )
}




const PayDetails = () => {
const location = useLocation();
const dispatch = useDispatch()
const {gradesData,isLoading,error,user_selection} = useSelector((state) =>({ 
  gradesData: state.all.transactions.data,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,
}));

console.log(gradesData);
const [open, setOpen] = useState(false);
const {reloadKey, handleReload} = useReloadKey();
const [disabled, setDisabled] = useState(true);
const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {return;}
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const draggleRef = useRef(null);
const showModal = () => {
    setOpen(true);
  };

  const  handleAddEnt = async () => {
    // try {
    //   await post_data('ADDED',entData,'/entity','entities')(dispatch);
    //   setOpen(false);
    //   // setentData({})
    //   handleReload()
    // } catch (err) {
    //   console.error(err);
    // }
}

  const handleCancel = (e) => {
    setOpen(false);
  };
useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data(`/transactions/get/${user_selection.ent_id}`, 'transactions')(dispatch); 
      } catch (err) {
        console.error(err);
      }
    };
    if(reloadKey != 0){fetchData();}
  }, [dispatch,reloadKey]);


  const topRef = React.useRef(null);
  const [targetOffset, setTargetOffset] = useState();
  
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  const TabNames = ['Allowance/Deductions', 'Leave/Attendnace', 'History', 'slips', 'Attendnace', 'Other'];
  const transformedGradesData = Object.entries(gradesData).map(([gradeName, { salary, employees }]) => ({
    gradeName,
    salary,
    employees,
  }));
  const groupIntoPairs = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push(data.slice(i, i + 2));
    }
    return result;
  };
  const pairedGrades = groupIntoPairs(transformedGradesData);

  const totalSalaryAllGrades = pairedGrades.reduce((grandTotal, gradePair) => {
    return grandTotal + gradePair.reduce((total, grade) => {
      const totalEmployeeSalary = grade.employees.reduce((total, employee) => total + employee.salary, 0);
      return total + totalEmployeeSalary;
    }, 0);
  }, 0);
var Buttonactions = (<>
                <Button key="back" onClick={handleCancel}>Cancel</Button>
                <Button key="submit" type="primary" onClick={handleAddEnt}>Payout</Button>
                <Button key="auto" type="primary" onClick={handleAddEnt} danger>Auto Pay</Button>
</>)
  return (
    <>
    <Button onClick={showModal}>Run Payroll</Button>
    <Modal
        open={open}
        width={1000}
        onCancel={handleCancel} 
        title={<>
        <Divider/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <h3>Grades Payout</h3>
            <h3>Total Payout: {totalSalaryAllGrades}</h3>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>{Buttonactions}</div></div>
        </>}
        
        footer={Buttonactions}

        // style={{ maxHeight: '100vh' }}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
          <Divider/>
        {pairedGrades.map((pair, index) => (
          <Row gutter={[16, 16]} key={index}>
            {pair.map((grade) => {
                  const totalEmployeeSalary = grade.employees.reduce((total, employee) => total + employee.salary, 0);
            return(<Col span={12} key={grade.gradeName}>
                <div>
                  <h4 level={5}><Title level={3}>{grade.gradeName}</Title>Salary: {grade.salary} | Total: {totalEmployeeSalary}</h4>
                  <List
                    size="small"
                    bordered
                    dataSource={grade.employees}
                    renderItem={(employee) => (
                      <List.Item>
                        <Text>({employee.ID}):{employee.firstName}  - salary : {employee.salary}</Text>
                      </List.Item>
                    )}
                    style={{ maxHeight: '150px', overflowY: 'auto' }} // Scrollable employee list
                  />
                </div>
              </Col>
              
            )
            
                    })}
                     <Divider/>
          </Row>
        ))}
      </Modal>
   
  </> 
  );
};
export default PayDetails;