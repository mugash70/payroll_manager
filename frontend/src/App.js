import './App.css';
import { ChakraProvider} from '@chakra-ui/react'
import Dashboard from './components/dashboard'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Routes >
        <Route exact path='/' element={<Dashboard/>} />
      </Routes>
      </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
