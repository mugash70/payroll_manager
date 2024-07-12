import React, {useEffect, useState } from 'react';
import {DesktopOutlined,FileOutlined,PieChartOutlined,TeamOutlined,LogoutOutlined,UserOutlined,MoonOutlined,SunOutlined} from '@ant-design/icons';
import {Button, Result ,Breadcrumb, Layout, Menu, theme,Col, Row,Switch,ConfigProvider,Typography} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate,Link } from "react-router-dom";
import { persistor } from '../../store';
import { setTheme } from '../../actions/all'; // Import the setTheme action

const { Content, Footer, Sider } = Layout;
const { Title,Text } = Typography;


  const Layoutx = ({ breadcrumsx,titlex,DashComponent,Buttons}) => {
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();
    const {  user,isAuthenticated ,error, } = useSelector(state => ({
      // theme: themex
      user: state.auth.user,
      isAuthenticated:state.auth.isAuthenticated,
      error: state.error.msg,
      theme: state.theme.theme,
  }));

  const dispatch = useDispatch();
  const [themex, setTheme] = useState('dark');
  const [collapsed, setCollapsed] = useState(true);
  
  const changeTheme = (value) => {
 
    // dispatch(setTheme(value ? 'dark' : 'light')); 
    setTheme(value ? 'dark' : 'light');
  };


const handleLogout = () => {
  dispatch({type:'CLEAR_AUTH'})
  persistor.purge().then(() => {
    localStorage.removeItem('persist:root');
    navigate('/');
  });
};




function getItem(labelx, key, icon, link) {
  return { key, icon, label: (<a href={link} rel="noopener noreferrer">{labelx}</a>) };
}

const items = [
  getItem('Home', '2', <DesktopOutlined />,'/dashboard'),
  getItem('Organizations', 'sub1', <UserOutlined />, '/organizations'),
  getItem('Entities', 'sub2', <TeamOutlined />, '/entities'),
  getItem('Reports', '9', <FileOutlined />,'/reports'),
  {
    key: 'userRole',
    style: {position: 'absolute',top: '87%'},
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
    style: {position: 'absolute',top: '82%'},
    label: (<div onClick={handleLogout}><Row>  {collapsed ? null:<Col span={9}>Logout</Col>}<Col span={3}><LogoutOutlined style={{ color: 'red' }}/> </Col>  </Row> </div>)},
  {
    key: 'themeSwitch',
    style: { position: 'absolute',top: '75%' },
    label: (
      <Row >
      <Col>
        {collapsed ? (
          <Switch
            checked={themex === 'dark'}
            onChange={changeTheme}
            style={{right:'80%',}}
          />
        ) : (
          <Switch
            checked={themex === 'dark'}
            onChange={changeTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        )}
      </Col>
    </Row>

    )
  },

];

const themeOverrides = themex === 'dark' ? {
  token: {
    colorPrimary: '#1890ff',
    colorBgBase: '#001529',
    colorTextBase: '#ffffff',
    colorBgContainer: '#001529',
    colorText: '#ffffff',
  }
} : {
  token: {
    colorPrimary: '#1890ff',
    colorBgBase: '#ffffff',
    colorTextBase: '#000000',
    colorBgContainer: '#ffffff',
    colorText: '#000000',
  }
};
  return (
    <>
 {isAuthenticated?  

  <ConfigProvider theme={themeOverrides}>
    <Layout style={{minHeight: '100vh'}}>
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
    /></Sider>

      <Layout>
        <Content style={{margin: '0 2%',}}>
          <div  style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }} >
          <Breadcrumb
                 items={
              breadcrumsx.map((breadcrumb, index) => ({
                  key: index,
                  title: breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1),
                  href: `/${breadcrumb}`, 
                  isActive: index === activeIndex, 
                }))}/>
              
          <div style={{ marginLeft: 'auto' }}>
          {titlex && (
                <div style={{ marginLeft: '16px', display: 'flex', justifyContent: 'center' }}>
                  {/* <span>{titlex}</span> */}
                  <Text type="secondary">{titlex}</Text>
                </div>
              )}
            {Buttons && <Buttons type="create"/>}
            </div>
          
          </div>
         {DashComponent && <DashComponent/>}
  
        </Content>
        <Footer style={{textAlign: 'center',}}>
          Cyco ©{new Date().getFullYear()} Created by cyril Mugash
        </Footer>
      </Layout>
    </Layout>
    </ConfigProvider> : <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
  />}
    </>
  );
};
export default Layoutx;