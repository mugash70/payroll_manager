import React from 'react';
import { notification, Space } from 'antd';

export  const Alert = ({msg,types}) => {

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message:{msg},
      // description:
      //   'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  
  return (<>{contextHolder}
  <Space>
      {openNotificationWithIcon(types)}
  </Space></>)};
