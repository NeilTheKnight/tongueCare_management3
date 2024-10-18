import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Agents from './pages/Agents';
import Clinics from './pages/Clinics';
import Devices from './pages/Devices';
import Diagnoses from './pages/Diagnoses';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/clinics" element={<Clinics />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/diagnoses" element={<Diagnoses />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;