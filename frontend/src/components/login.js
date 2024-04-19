import React from "react";

import { Button, Checkbox, Form, Grid, Input, theme, Typography,Card } from "antd";
import Animate from './default/animate'
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {post_data,get_data,update_data,del_data} from '../actions/all'
import { useDispatch,useSelector  } from 'react-redux';
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      await post_data(values,'/user/login','auth')(dispatch);  
      // handleReload()
    } catch (err) {
      console.error(err);
    }
  };

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
                                  <Button block="true" type="primary" htmlType="submit">
                                    Log in
                                  </Button>
                                  {/* <div style={styles.footer}>
                                    <Text style={styles.text}>Don't have an account?</Text>{" "}
                                    <Link href="/changepass">Sign up now</Link>
                                  </div> */}
                                </Form.Item>
                              </Form>
        </Card>
        </div>
        </div>
  );
}