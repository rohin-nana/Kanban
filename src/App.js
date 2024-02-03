import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    // <div className="App">
    //   {/* <Home /> */}
    //   <Login />
    // </div>
    <BrowserRouter>
      <Routes>
        {/* <Route index path="/login" /> */}
        <Route path="/home" element={<ProtectedRoute flip={false} routeTo={"/login"}><Home /></ProtectedRoute>}/>
        <Route path="/login" element={<ProtectedRoute flip={true} routeTo={"/home"}><Login /></ProtectedRoute>}/>
        {/* <Route path="/login" element={<Login />}/> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;