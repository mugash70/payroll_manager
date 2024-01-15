import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Layoutx  from '../../default/layout';
import {post_data,get_data,update_data,del_data} from '../../../actions/all'
import { useDispatch,useSelector  } from 'react-redux';
import Spinner from '../../default/spinner';
import Alert from '../../default/alert'
import Emp from '../../home/input/employee'
const onChange = (pagination, filters, sorter, extra) => {console.log('params', pagination, filters, sorter, extra);};

const breadcrumbs = ['dashboard','employees'];
const Employeedash = () => {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Jim',
              value: 'Jim',
            },
            {
              text: 'Submenu',
              value: 'Submenu',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Black',
                  value: 'Black',
                },
              ],
            }, ],
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Grade',
          dataIndex: 'grade',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filters: [{text: 'London',value: 'London',},{text: 'New York',value: 'New York',},],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
          title: 'Department',
          dataIndex: 'department',
          filters: [{text: 'London',value: 'London',},{text: 'New York',value: 'New York',},],
          onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
      ];

const [employeeData, setEmployeeData] = useState([]);

const data = useSelector((state) => state.all.employees);
const error = useSelector((state) => state.error.id);

const dispatch = useDispatch()
useEffect(() => {
    const fetchData = async () => {
      try {
        await get_data('/employees', 'employees')(dispatch);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);



if (data.isLoading){
   return <Spinner/>
}else{
    return(<Table columns={columns} dataSource={employeeData} onChange={onChange} />)
}
};
const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Employeedash} Buttons={Emp} />;
export default Home;