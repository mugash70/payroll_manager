import React, { useEffect } from "react";

import { Button, Form, Grid, Input, theme, Typography,Card,Alert } from "antd";
import Animate from './default/animate'
import { MailOutlined } from "@ant-design/icons";
import { useDispatch,useSelector} from 'react-redux';
import {post_data} from '../actions/all'
import {clearError } from '../actions/error'
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  // const  error = useSelector(state => (state.error.msg));
  const {  data, error } = useSelector(state => ({
    data: state.auth.user,
    error: state.error.msg
}));

  const onFinish = async (values) => {
    await post_data('AUTH_LOADING',values, '/user/forgot', 'AUTH_LOADING')(dispatch)
  
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
        dispatch(clearError());
        
    }, 3000);
    return () => clearTimeout(timeout);
}, [dispatch, error]);

useEffect(() => {
  const timeout = setTimeout(() => {
      dispatch({type:'CLEAR_AUTH'});
      
  }, 3000);
  return () => clearTimeout(timeout);
}, [dispatch,data]);


  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      // width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: token.marginXL,
      alignItems: 'center',
    },
 
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    }
  };

  return (
    <div id='large-header'>
        <Animate/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginTop:'-5%' }}>
        <Card className="shadow" style={{ width: '22rem', background: 'transparent'}}>
            <div style={styles.header}>
              {/* {error ?<Alert message={JSON.stringify(error)} type="error" ></Alert>:null} */}
              {error && Object.keys(error).length > 0 ? <Alert message={JSON.stringify(error)} type="error" /> : null}
              {data && Object.keys(data).length > 0 ? <Alert message={JSON.stringify(data)} type="success" /> : null}
              <Title style={{ ...styles.title, textAlign: 'center' }} >Forgot password ?</Title>
            </div>
                              <Form name="normal_login" initialValues={{remember: true,}} onFinish={onFinish} layout="vertical"requiredMark="optional">
                                <Form.Item name="email"
                                  rules={[ {
                                      type: "email",
                                      required: true,
                                      message: "Please input your Email!",
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={<MailOutlined />}
                                    placeholder="Email"
                                  />
                                </Form.Item>
                              
                                <Form.Item style={{ marginBottom: "0px" }}>
                                  <Button block="true" type="primary" htmlType="submit">
                                    Reset Password
                                  </Button>
                                  <div style={styles.footer}>
                                    <Text style={styles.text}>Remember your password?</Text>{" "}
                                    <Link href="/">Log in</Link>
                                  </div>
                                </Form.Item>
                              </Form>
        </Card>
        </div>
        </div>
  );
}