import React ,{useEffect} from 'react';
import { Button, Result } from 'antd';
const App = ({operation}) =>{
    useEffect(() => {
        const timer = setTimeout(() => {}, 2000);
        return () => clearTimeout(timer);
      }, []);

  return (<Result
    status="success"
    title={operation}
  />)
};
export default App;