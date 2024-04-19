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