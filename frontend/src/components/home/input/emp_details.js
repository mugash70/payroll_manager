import React, { useEffect, useState } from 'react';
import {PlusOutlined,MinusOutlined,DollarOutlined,CalendarOutlined,FileSearchOutlined,FolderOpenOutlined,LoadingOutlined,TeamOutlined} from '@ant-design/icons';
import { Tabs,Avatar, List,Row,Typography,Divider,Skeleton,Descriptions } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layoutx  from '../../default/layout';
import { useDispatch,useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {useReloadKey} from '../../default/index'
import {post_data,get_data,update_data,del_data} from '../../../actions/all'

const { TabPane } = Tabs;
const { Title } = Typography;
const breadcrumbs = ['dashboard','employees','details'];


const Allowance = () => {
  const allowancedata = useSelector((state) => state.all.adjustments.data);
  const [dataLength, setDataLength] = useState(3);

  const loadMoreItems = () => {
    setDataLength(prevDataLength => prevDataLength + dataLength); 
  };

  return (
    <div
    id="scrollableDiv"
    style={{
      height: 410,
      overflow: 'auto',
      padding: '0 16px',
      border: '1px solid rgba(140, 140, 140, 0.35)',
    }}
  >
    <InfiniteScroll
    
      dataLength={dataLength}
      next={loadMoreItems}
      hasMore={allowancedata.length}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 1,
          }}
          active
        />
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={allowancedata.slice(0, dataLength)}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar icon={item.adj_type !== 'Bonus' ? <MinusOutlined /> : <PlusOutlined />} />}
              title={<a href="https://ant.design">{item.adj_name.toUpperCase()}</a>}
              description={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ textAlign: 'left' }}>{item.period}{'(' + item.adj_type + ')'}</h4>
                  {item.from && item.to ? (
                    <Title level={5} style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                      <span>From: {new Date(item.from).toLocaleDateString()}</span>
                      {'\u00A0\u00A0\u00A0'} {/* Adjusting space */}
                      <span>To: {new Date(item.to).toLocaleDateString()}</span>
                    </Title>
                  ) : (
                    <Title level={3}>∞</Title>
                  )}
                  <Title style={{ textAlign: 'right', fontSize: '20px', color: 'black' }}>
                    {item.amount_type === 'percentage' ? item.amount + '%' : item.amount}
                  </Title>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </InfiniteScroll>
    </div>
  );
};


// const Allowance =()=>{
//   const allowancedata = useSelector((state) =>  state.all.adjustments.data);

//   return(
//     <>
//     <List
//     itemLayout="horizontal"
//     dataSource={allowancedata}
//     renderItem={(item, index) => (

//   <List.Item>
//   <List.Item.Meta
//     avatar={<Avatar icon={item.adj_type !== 'Bonus' ? <MinusOutlined /> : <PlusOutlined />} />}
//     title={<a href="https://ant.design">{item.adj_name.toUpperCase()}{'(' + item.adj_type + ')'}</a>}
//     description={
//      <div style={{display: 'flex', justifyContent: 'space-between' }}>
//         <h4 style={{ textAlign: 'left' }}>{item.period}</h4>
//         {item.from && item.to ? (
//           <Title level={4} style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
//             <span>From:{new Date(item.from).toLocaleDateString()}</span>{'\u00A0\u00A0\u00A0'}
//             <span>To:{new Date(item.to).toLocaleDateString()}</span>
//           </Title>
//         ) : (
//           <Title level={3} >∞</Title>
//         )}
//         <Title style={{ textAlign: 'right', fontSize: '20px', color: 'black' }}>
//           {item.amount_type === 'percentage' ? item.amount + '%' : item.amount}
//         </Title>
// </div>

    
    
//     }
//   />
// </List.Item>

//    )}
//    />
//     </>
//   )
// }
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
const {reloadKey, handleReload} = useReloadKey();
useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/entity/ent/adjustments', 'adjustments')(dispatch);
        await get_data('/grades', 'grades')(dispatch);
        await get_data('/entity/ent/departments', 'departments')(dispatch);
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