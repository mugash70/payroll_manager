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

const { Title,Text } = Typography;
const breadcrumbs = ['dashboard','employees','details'];
const PayDetails = () => {
const location = useLocation();
const dispatch = useDispatch()
const {reloadKey, handleReload} = useReloadKey();


useEffect(() => {
  setTargetOffset(topRef.current?.clientHeight);
    const fetchData = async () => {
      try {await get_data(`/transactions/get/${user_selection.ent_id}`, 'transactions')(dispatch); 
      } catch (err) {console.error(err);}
    };
    if(reloadKey != 0){
      fetchData();
    }
    handleReload()
  },
  // []);
  [dispatch,reloadKey,user_selection.ent_id, handleReload]);


const {gradesData,isLoading,error,user_selection} = useSelector((state) =>({ 
  gradesData: state.all.transactions.data,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,
}));

const [open, setOpen] = useState(false);

const [disabled, setDisabled] = useState(true);
// const [transformedGradesData, setTransformedGradesData] = useState([]);
// const [totalSalaryAllGrades, setTotalSalaryAllGrades] = useState(0);
// const [pairedGrades,setpairedGrades] = useState([]);
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


  const topRef = React.useRef(null);
  const [targetOffset, setTargetOffset] = useState();
// useEffect(() => {
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
// },[transformedGradesData,pairedGrades,totalSalaryAllGrades]);




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