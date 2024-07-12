import React, { useEffect, useState,useRef  } from 'react';
import {PlusOutlined,MinusOutlined ,DollarOutlined,CalendarOutlined,FileSearchOutlined,FolderOpenOutlined,LoadingOutlined,TeamOutlined} from '@ant-design/icons';
import { Tabs,Avatar, List,Row,Typography,Divider,Skeleton,Descriptions,Table } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layoutx  from '../../default/layout';
import { useDispatch,useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {useReloadKey} from '../../default/index'
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
    setData(allowancedata.slice(0, currentPage * 10));  // Initial data load, adjust page size as needed
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

const Attendance =()=>{

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

const Slip =()=>{

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
        endMessage={<Divider plain>That is all, nothing more 🤐</Divider>}
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


const Detailsdash = () => {

const location = useLocation();
const emp_id = location.pathname.split('/').pop();
const [data,grade]= useSelector(state => {
  var data=state.all.employees.data.find(employee => employee.emp_id === parseInt(emp_id));
  var grade=state.all.grades.data.find(grade => grade.grade_id === parseInt(data.grade_id));
  return [data,grade]  
});

const items = [
  {
    key: '1',
    label: 'Employee Name',
    children: data?.firstname+' '+data?.lastname || 'N/A',
  },
  {
    key: '2',
    label: 'ID/Passport',
    children: data?.ID || 'N/A',
  },

  {
    key: '4',
    label: 'Phone',
    children: data?.phone || 'N/A',
  },
  {
    key: '5',
    label: 'Email',
    children: data?.email || 'N/A',
  },
  {
    key: '6',
    label: 'Department',
    children: data?.dept_name || 'N/A',
  },
  {
    key: '7',
    label: 'Tax pin',
    children: data?.pin || 'N/A',
  },
  {
    key: '8',
    label: 'Grade',
    children: data?.grade_name || 'N/A',
  },
  {
    key: '3',
    label: 'Basic Salary',
    children: data?.salary || 'N/A',
  },
];

const dispatch = useDispatch()
const {employeeData,isLoading,error,user_selection} = useSelector((state) =>({ 
  employeeData: state.all.employees,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,
}));

const {reloadKey, handleReload} = useReloadKey();
useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data(`/entity/ent/adjustments/${user_selection.ent_id}`, 'adjustments')(dispatch);
        await get_data(`/grades/${user_selection.ent_id}`, 'grades')(dispatch);
        await get_data(`/entity/ent/departments/${user_selection.ent_id}`, 'departments')(dispatch);
        // await get_data('/entity/ent/departments', 'departments')(dispatch);     
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

  return (
    <>
    <div>
      <Descriptions title="Employee Info" items={items} />
    </div>
    <Tabs defaultActiveKey="1">
    {[DollarOutlined, CalendarOutlined, FolderOpenOutlined, FileSearchOutlined, TeamOutlined, LoadingOutlined].map((Icon, i) => {
      const id = String(i + 1);
      return (
        <TabPane
          tab={<span>{Icon && <Icon />} {TabNames[i]}</span>}key={id}>
           {(() => {
              switch (i) {
                case 0:
                  return <Allowance />;
                case 1:
                  return <Leave />;
                case 2:
                  return <History />;
                case 3:
                  return <Attendance />;
                case 4:
                  return <Slip />;
                case 6:
                  return <Slip />;
                default:
                  return null;
              }
            })()}
        </TabPane>
      );
    })}
  </Tabs></>
  );
};
const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Detailsdash} />;
export default Home;