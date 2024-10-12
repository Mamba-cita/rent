
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/homePage';




function App() {
  return (
    <>
  <Header />
<Routes>
<Route path="/" element={<Home />} />
{/* <Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} /> */}
</Routes>
  
    </>
  );
}

export default App;
