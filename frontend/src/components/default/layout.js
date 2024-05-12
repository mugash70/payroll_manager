import React, {useEffect, useState } from 'react';
import {DesktopOutlined,FileOutlined,PieChartOutlined,TeamOutlined,LogoutOutlined,UserOutlined,MoonOutlined,SunOutlined} from '@ant-design/icons';
import {Button, Result ,Breadcrumb, Layout, Menu, theme,Col, Row,Switch,ConfigProvider} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate,Link } from "react-router-dom";
import { persistor } from '../../store';
const { Header, Content, Footer, Sider } = Layout;



  const Layoutx = ({ breadcrumsx, DashComponent,Buttons}) => {
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();
    const {  user,isAuthenticated ,error} = useSelector(state => ({
      user: state.auth.user,
      isAuthenticated:state.auth.isAuthenticated,
      error: state.error.msg
  }));

  const [themex, setTheme] = useState('dark');
  const [collapsed, setCollapsed] = useState(false);
  
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

const dispatch = useDispatch();

const handleLogout = () => {
  dispatch({type:'CLEAR_AUTH'})
  persistor.purge(); 
  navigate('/');
};



function getItem(labelx, key, icon, link) {
  var label = (<a href={link} rel="noopener noreferrer">{labelx}</a>)
  return {key,icon,label};

}
const items = [
  // getItem('Dashboard', '1', <PieChartOutlined />,'/dashboard'),
  getItem('Home', '2', <DesktopOutlined />,'/dashboard'),
  getItem('Organizations', 'sub1', <UserOutlined />, '/organizations'),
  getItem('Entities', 'sub2', <TeamOutlined />, '/entities'),
  getItem('Reports', '9', <FileOutlined />,'/reports'),
  {
    key: 'userRole',
    style: {
      position: 'absolute',
      top: '90%'},
    disabled:true,
    label: (
      <Row>
      <Col span={8} >
          {collapsed ? <UserOutlined /> : (isAuthenticated ? user.role_id === 1 ? 'Admin:' : 'Super Admin :':null)}
        </Col>
        <Col span={3} >
        {collapsed ? '':(isAuthenticated ?  user.firstname + ' ' + user.lastname:null)}
        </Col>
      </Row>
    )
  },
  {
    key: 'logout',
    style: {
      position: 'absolute',
      top: '85%'},
    label: (<div onClick={handleLogout}><Row>  {collapsed ? null:<Col span={9}>Logout</Col>}<Col span={3}><LogoutOutlined style={{ color: 'red' }}/> </Col>  </Row> </div>)},
  {
    key: 'themeSwitch',
    style: {
      position: 'absolute',
      top: '80%' },
    label: (
      <Row >
      <Col>
        {collapsed ? (
          <Switch
            checked={themex === 'dark'}
            onChange={changeTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        ) : (
          <Switch
            checked={themex === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        )}
      </Col>
    </Row>

    )
  },

];
  return (
    <>
 {isAuthenticated?  

  <ConfigProvider theme={themex}>
    <Layout style={{minHeight: '100vh',}} >
      <Sider    theme={themex}  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <Menu theme={themex} defaultSelectedKeys={['1']} mode="inline" 
      items={items.map(item => ({
        key:item.key,
        style:item.style,
        icon:item.content ?null : item.icon,
        label:item.label,
        disabled:item.disabled,
      }
    ))}
    />

      </Sider>
      <Layout>
        <Header style={{padding: 0,background: colorBgContainer,margin: '0 16px',}}>
          
          <h3>Home</h3>
          
          </Header>
        <Content style={{margin: '0 16px',}}>
          <div  style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }} >
          <Breadcrumb
                 items={
              breadcrumsx.map((breadcrumb, index) => ({
                  key: index,
                  title: breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1),
                  href: `/${breadcrumb}`, 
                  isActive: index === activeIndex, 
                }))}
          />
             



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
    </ConfigProvider> : <><Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
  /> </>}
    </>
  );
};
export default Layoutx;