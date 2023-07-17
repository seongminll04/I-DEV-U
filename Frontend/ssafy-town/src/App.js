import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.tsx';
import Town from './components/ssafytown.tsx';
import SignupForm from './components/signup.tsx';
import Findpassword from './components/findpass.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 로그인여부에 따른 login, home 이동  */}
          <Route path="/" element={<Login />} /> 
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/findpassword" element={<Findpassword />} />
          <Route path="/home" element={<Town />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
