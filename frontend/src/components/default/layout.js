import React, { useState } from 'react';
import {DesktopOutlined,FileOutlined,PieChartOutlined,TeamOutlined,UserOutlined,} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {return {key,icon,children,label,};}
const items = [getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Home', '2', <DesktopOutlined />),
  getItem('Organizations', 'sub1', <UserOutlined />, [getItem('Tom', '3'),getItem('Bill', '4'),getItem('Alex', '5'),]),
  getItem('Entities', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Reports', '9', <FileOutlined />),];


  const Layoutx = ({ breadcrumsx, DashComponent,Buttons}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh',}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{padding: 0,background: colorBgContainer,margin: '0 16px',}}><h3>Home</h3></Header>
        <Content style={{margin: '0 16px',}}>
          <div  style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }} >
          <Breadcrumb>
              {breadcrumsx.map((item, index) => (
              <Breadcrumb.Item key={index} ><a href={`/${item}`}>{item}</a></Breadcrumb.Item>
              ))}
          </Breadcrumb>
          <div style={{ marginLeft: 'auto' }}>{Buttons && <Buttons type="create"/>}</div>
          </div>
         
         
          <div style={{padding: 24,minHeight: 360,background: colorBgContainer,borderRadius: borderRadiusLG,}}>
            {DashComponent && <DashComponent/>}
          </div>
        </Content>
        <Footer style={{textAlign: 'center',}}>
          Cyco ©{new Date().getFullYear()} Created by cyril Mugash
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Layoutx;