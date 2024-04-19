import React from "react";

import { Button, Checkbox, Form, Grid, Input, theme, Typography,Card } from "antd";
import Animate from './default/animate'
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
      float: "left"
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
              <Title style={styles.title}>Reset Password</Title>
            </div>
                              <Form name="normal_login" initialValues={{remember: true,}} onFinish={onFinish} layout="vertical"requiredMark="optional">
                                {/* <Form.Item name="email"
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
                                </Form.Item> */}
                                <Form.Item
                                  name="old_password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your old Password!",
                                    },
                                  ]}
                                >
                                  <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Old Password"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="new_password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your new Password!",
                                    },
                                  ]}
                                >
                                  <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="New Password"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="c_new_password"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input your confrim new Password!",
                                    },
                                  ]}
                                >
                                  <Input.Password
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Confrim new Password"
                                  />
                                </Form.Item>
                                <Form.Item>
                                  {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                  </Form.Item> */}
                                  {/* <a style={styles.forgotPassword} href="/forgot">
                                    Forgot password?
                                  </a> */}
                                </Form.Item>
                                <Form.Item style={{ marginBottom: "0px" }}>
                                  <Button block="true" type="primary" htmlType="submit">
                                    Update
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