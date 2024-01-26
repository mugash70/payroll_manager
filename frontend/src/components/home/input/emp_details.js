import React, { useEffect, useState } from 'react';
import {PlusOutlined,MinusOutlined,DollarOutlined,CalendarOutlined,FileSearchOutlined,FolderOpenOutlined,LoadingOutlined,TeamOutlined} from '@ant-design/icons';
import { Tabs,Avatar, List,Row,Typography } from 'antd';
import Layoutx  from '../../default/layout';
import { useDispatch,useSelector  } from 'react-redux';
import {useReloadKey} from '../../default/index'
import {post_data,get_data,update_data,del_data} from '../../../actions/all'

const { TabPane } = Tabs;
const { Title } = Typography;
const breadcrumbs = ['dashboard','employees','details'];





const Allowance =()=>{
  const allowancedata = useSelector((state) =>  state.all.adjustments.data);
  return(
    <>
    <List
    itemLayout="horizontal"
    dataSource={allowancedata}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={item.adj_type !=='Bonus' ?<MinusOutlined />:<PlusOutlined />} />}
          title={<a href="https://ant.design">{item.adj_name.toUpperCase()}{'('+ item.adj_type +')'}</a>}
          description={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ textAlign: 'left' }}>{item.amount}</h4>
            <h3 style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                  <span>From: {new Date(item.from).toLocaleDateString()}</span>
                  <span>To: {new Date(item.to).toLocaleDateString()}</span>
                </h3>
                <Title style={{ textAlign: 'right', fontSize: '200%', color: 'black' }}>
                  {item.amount_type === 'percentage' ? item.amount + '%' : item.amount}
                </Title>
       </div> }
        />
      </List.Item>
   )}
   />
    </>
  )
}
const Leave =()=>{
  return(
    <>
    
    
    </>
  )
}

const History =()=>{
  return(
    <>
    
    
    </>
  )
}

const Attendance =()=>{
  return(
    <>
    
    
    </>
  )
}
const Detailsdash = () => {
const dispatch = useDispatch()
const {reloadKey, handleReload} = useReloadKey();
useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/entity/ent/adjustments', 'adjustments')(dispatch);
        await get_data('/grades', 'grades')(dispatch);
        await get_data('/entity/ent/departments', 'departments')(dispatch);        
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
                case 4:
                  return <Attendance />;
                // case 5:
                //   return <Other />;
                default:
                  return null;
              }
            })()}
        </TabPane>
      );
    })}
  </Tabs>
  );
};
const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Detailsdash} />;
export default Home;