import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
  <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
</div>
);
export default Spinner;