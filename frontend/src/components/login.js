import React, { useEffect } from 'react';

import { Button, Checkbox, Form, Grid, Input, theme, Typography,Card,Alert} from "antd";
import Animate from './default/animate'
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {post_data} from '../actions/all'
import { useDispatch,useSelector  } from 'react-redux';
import { Navigate } from "react-router-dom";
import {clearError } from '../actions/error'
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  // const { isLoading, isAuthenticated } = useSelector(state => state.auth); // Assuming your reducer is named authReducer
  // console.log(isAuthenticated);
  const { isLoading, isAuthenticated, error,msg } = useSelector(state => ({
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error.msg,
    msg:state.auth.msg
}));
  
  const onFinish = async (values) => {
    dispatch({type:'AUTH_LOADING'});
    await post_data('SUCCESS',values, 'user/login', 'SUCCESS')(dispatch)
  };
  useEffect(() => {
    let timeoutId;
      if (error!=null) {
        timeoutId = setTimeout(() => {
            dispatch(clearError());
        }, 3000);
    }
    if (msg!=null) {
  //         dispatch({type:'CLEAR_AUTH'});
  //     navigate('/');
  }
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
  }, [msg, error,dispatch]);

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
      marginBottom: token.marginXL
    },
 
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <div id='large-header'>

        <Animate/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginTop:'-5%' }}>
        <Card className="shadow" style={{ width: '22rem', background: 'transparent'}}>
            <div style={styles.header}>

           {error && Object.keys(error).length > 0   ? <Alert message={error} type="error" />:null}
           {isAuthenticated ? (<Navigate to="/dashboard" replace={true} />): null }
              <Title style={styles.title}>Log In</Title>
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
                                <Form.Item
                                  name="password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your Password!",
                                    },
                                  ]}
                                >
                                  <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                  />
                                </Form.Item>
                                <Form.Item>
                                  <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                  </Form.Item>
                                  <a style={styles.forgotPassword} href="/forgot">
                                    Forgot password?
                                  </a>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: "0px" }}>
                                 {/* {isLoading ? :} */}
                                 <Button block="true" type="primary" htmlType="submit">
                                    Log in
                                  </Button>
                            
                                </Form.Item>
                              </Form>
        </Card>
        </div>
        </div>
  );
}