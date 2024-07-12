import React,{useEffect} from 'react';
import { message } from 'antd';

const AlertMessage = ({ type, content,num }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (type && content) {
      showMessage();
    }
  }, [num]);

  const showMessage = () => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <>
      {contextHolder}
    </>
  );
};

export default AlertMessage;
