import React from 'react';
import { Card, Col,Row } from 'antd';
import Layoutx  from '../default/layout';
import { Link } from 'react-router-dom';

import { TeamOutlined,FolderViewOutlined,HomeOutlined,DeploymentUnitOutlined,DollarOutlined,HourglassOutlined } from '@ant-design/icons';
const breadcrumbs = ['dashboard'];
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Homedash = () => {

return(
  <div style={{ minHeight: 400 }}>
  <Row gutter={16}>

    <Col span={6}>
      <Link to="/employees">
        <Card
          hoverable
          bordered={true}
          className="dashboard-card"
          style={{backgroundColor:'#d9d9d9'}}
        >
          <Row align="middle">
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <h3>Employees</h3>
            </Col>
            <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
              <TeamOutlined style={{ fontSize: '30px', color: '#08c' }} />
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>

    <Col span={6}>
      <Link to="/roles">
        <Card
          hoverable
          bordered={true}
          className="dashboard-card"
          style={{backgroundColor:'#d9d9d9'}}
        >
          <Row align="middle">
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <h3>Roles/Grades</h3>
            </Col>
            <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
              <DeploymentUnitOutlined style={{ fontSize: '30px', color: '#08c' }} />
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>

    <Col span={6}>
      <Link to="/departments">
        <Card
          hoverable
          bordered={true}
          className="dashboard-card"
          style={{backgroundColor:'#d9d9d9'}}
        >
          <Row align="middle">
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <h3>Departments</h3>
            </Col>
            <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
              <HomeOutlined style={{ fontSize: '30px', color: '#08c' }} />
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>

    <Col span={6}>
      <Link to="/b&d">
        <Card
          hoverable
          bordered={true}
          className="dashboard-card"
          style={{backgroundColor:'#d9d9d9'}}
          shadow
        >
          <Row align="middle">
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
              <h3>Bonuses/Deductions</h3>
            </Col>
            <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
              <DollarOutlined style={{ fontSize: '30px', color: '#08c' }} />
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>

  
  </Row>



</div>

)

};

const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Homedash} />;
export default Home;