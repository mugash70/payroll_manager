import React, { useEffect, useState,useRef  } from 'react';
import {PlusOutlined,MinusOutlined ,DollarOutlined,CalendarOutlined,FileSearchOutlined,FolderOpenOutlined,LoadingOutlined,TeamOutlined} from '@ant-design/icons';
import {Col,Row,Modal,Button, Tabs,Avatar, List,Typography,Divider,Result ,Skeleton,Descriptions,Table,Checkbox } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layoutx  from '../../default/layout';
import { useDispatch,useSelector  } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Complete from '../../default/completed'
import Spinner from '../../default/spinner';
import {useReloadKey} from '../../default/index'
// import 'bootstrap/dist/css/bootstrap.min.css';
import AlertMessage from '../../default/AlertMessage'
import Draggable from 'react-draggable';
import {post_data,get_data,update_data,del_data,setLoading} from '../../../actions/all'

const { Title,Text } = Typography;
const breadcrumbs = ['dashboard','employees','details'];
const PayDetails = () => {
const location = useLocation();
const dispatch = useDispatch()
const {reloadKey, handleReload} = useReloadKey();
const [selectedEmployees, setSelectedEmployees] = useState([]);
const [selectAll, setSelectAll] = useState(false);
const [AComplete,setAComplete]=useState(false)
const {gradesData,isLoading,error,user_selection} = useSelector((state) =>({ 
  gradesData: state.all.transactions.data,
  isLoading:state.all.isLoading,
  error:state.error.msg,
  user_selection:state.user_selection,
}));
const [showAlert, setShowAlert] = useState({
  show:false,
  num:0
});
useEffect(() => {
  dispatch(setLoading(true))
  setTargetOffset(topRef.current?.clientHeight);
    const fetchData = async () => {
      try {await get_data(`/transactions/get/${user_selection.ent_id}`, 'transactions')(dispatch); 
      } catch (err) {console.error(err);}finally{dispatch(setLoading(false))}
    };
    if(reloadKey != 0){
      fetchData();
    }
    handleReload()
  },
  []);
  // [dispatch,reloadKey,user_selection.ent_id, handleReload]);




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


const handleAddTrans = async (type)=>{
  dispatch(setLoading(true)) 
  var trasData =[]
  // type == 'auto' ? 
  try {
      await post_data('ADDED',selectedEmployees,'/transactions','transactions')(dispatch);
      setOpen(false);
      handleReload()
      
    } catch (err) {
      console.error(err);
      setShowAlert(prevState => ({ ...prevState, num: prevState.num + 1, show: true}));
    }finally{
      setAComplete(true)
      dispatch(setLoading(false))
      setSelectedEmployees([])
      setSelectAll(false)
      // setAComplete(false)
    }
}

  const handleCancel = (e) => {
    setOpen(false);
    setSelectedEmployees([])
    setSelectAll(false)
    setAComplete(false)
  };


  let topRef = React.useRef(null);
  let [targetOffset, setTargetOffset] = useState();
  let totalSalaryAllGrades =0
  let transformedGradesData=[]
  let pairedGrades=[]
  if(gradesData){
// useEffect(() => {
  transformedGradesData = Object.entries(gradesData).map(([gradeName, { salary, employees }]) => ({
    gradeName,
    salary,
    employees,
  }));
  const groupIntoPairs = (data) => {
    const result = [];
    for (let i = 0; i < data.length; i += 3) {
      result.push(data.slice(i, i + 3)); // Slice 3 items at a time
    }
    return result;
  };
  
   pairedGrades = groupIntoPairs(transformedGradesData);

   totalSalaryAllGrades = pairedGrades.reduce((grandTotal, gradePair) => {
    return grandTotal + gradePair.reduce((total, grade) => {
      const totalEmployeeSalary = grade.employees.reduce((total, employee) => total + employee.salary, 0);
      return total + totalEmployeeSalary;
    }, 0);
  }, 0);
}
// },[transformedGradesData,pairedGrades,totalSalaryAllGrades]);




var Buttonactions = (<>
                <Button key="back" onClick={handleCancel}>Cancel</Button>
                <Button key="submit" type="primary" onClick={handleAddTrans('select')}>Payout</Button>
                <Button key="auto" type="primary" onClick={handleAddTrans('auto')} danger>Auto Pay</Button>
</>)
  const handleSelect = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };


  const handleSelectAll = (gradeName, employees) => {
    const isAllSelected = selectAll[gradeName] || false;
    const newSelectedState = !isAllSelected;

    setSelectAll((prevSelectAll) => ({
      ...prevSelectAll,
      [gradeName]: newSelectedState,
    }));

    setSelectedEmployees((prevSelected) => ({
      ...prevSelected,
      [gradeName]: employees.reduce((acc, employee) => {
        acc[employee.ID] = newSelectedState;
        return acc;
      }, {}),
    }));
  };
  const handleIndividualSelect = (gradeName, employeeId) => {
    setSelectedEmployees((prevSelected) => ({
      ...prevSelected,
      [gradeName]: {
        ...prevSelected[gradeName],
        [employeeId]: !prevSelected[gradeName]?.[employeeId],
      },
    }));
  };
var select_list =(       <>
  {pairedGrades.map((pair, index) => (
    <Row gutter={[16, 16]} key={index}>
      {pair.map((grade) => {
        const totalEmployeeSalary = grade.employees.reduce((total, employee) => total + employee.salary, 0);
   
        return (
          <Col span={8} key={grade.gradeName}>
            <div>
              <Title level={3}>{grade.gradeName}</Title>
              {grade.employees.length >0 ?<> <h4>Salary: {grade.salary} | Total: {totalEmployeeSalary}</h4><Checkbox onChange={() => handleSelectAll(grade.gradeName, grade.employees)} checked={selectAll[grade.gradeName] || false}>Select All </Checkbox></> :null}
              {grade.employees.map((employee) => (
                <div key={employee.ID}>
                  <Checkbox
                    onChange={() => handleIndividualSelect(grade.gradeName, employee.ID)}
                    checked={selectedEmployees[grade.gradeName]?.[employee.ID] || false}
                  >
                    {employee.firstName} (ID: {employee.ID}) - Salary: {employee.salary}
                  </Checkbox>
                </div>
              ))}

              <Divider />
            </div>
          </Col>
        );
      
      })}
    </Row>
  ))}
</>)

  return (
    <>
    <Button onClick={showModal}>Run Payroll</Button>

    <Modal
        open={open}
        style={{top: 0 }} 
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
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}>

            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >  
        
          <Divider/>  
          {null}
          {isLoading ? <Spinner/>:AComplete ?<Complete operation="Payment Complete"/> :select_list}
          <Divider/>
          {showAlert.show && <AlertMessage type="error" content="Error running Payroll" num={showAlert.num} />}
      
      </Modal>
   
  </> 
  );
// }
};
export default PayDetails;