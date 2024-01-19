import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Popconfirm } from 'antd';
const Confrim = ({handleDelete,msg }) => (
  <Popconfirm
    title="Delete"
    description={msg}
    icon={<QuestionCircleOutlined style={{color: 'red' }} /> }
    okText="Yes"
    cancelText="No"
    onConfirm={handleDelete}
     ><Button danger >Delete</Button>
  </Popconfirm>
);
export default Confrim;