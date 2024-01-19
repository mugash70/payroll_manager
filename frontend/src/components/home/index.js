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
<div style={{minHeight: 380,}}>

<Col>
      <Row gutter={16}>
        <Col span={6}>
        <Link to="/employees">
   
          <Card hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>
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
          <Card  hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>

          <Row align="middle">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <h3>Roles/Grades</h3>
              </Col>
              <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
                <DeploymentUnitOutlined  style={{ fontSize: '30px', color: '#08c' }} />
              </Col>
            </Row>
          </Card>
          </Link>
       </Col>
       <Col span={6}>
        <Link to="/departments">
          <Card  hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>
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
          <Card hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>
          <Row align="middle">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <h3>Bonuses/Deductions</h3>
              </Col>
              <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
                <DollarOutlined  style={{ fontSize: '30px', color: '#08c' }} />
              </Col>
            </Row>
          </Card>
          </Link>
       </Col>
        {/* <Col span={6}>
        <Link to="/others">
          <Card  hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>
          <Row align="middle">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <h3>Others</h3>
              </Col>
              <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
                <HourglassOutlined  style={{ fontSize: '30px', color: '#08c' }} />
              </Col>
            </Row>
          </Card>
          </Link>
       </Col>
        <Col span={6}>
        <Link to="/reports">
          <Card hoverable bordered={false} style={{ width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', marginBottom: '16px' }}>
          <Row align="middle">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <h3>Reports</h3>
              </Col>
              <Col xs={24} sm={12} md={16} lg={18} xl={20} style={{ textAlign: 'right' }}>
                <FolderViewOutlined  style={{ fontSize: '30px', color: '#08c' }} />
              </Col>
            </Row>
          </Card>
          </Link>
       </Col> */}
      </Row>
    </Col>


 
        </div>
)

};

const Home = () => <Layoutx breadcrumsx={breadcrumbs} DashComponent={Homedash} />;
export default Home;