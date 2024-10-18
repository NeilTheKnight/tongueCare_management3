import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, DashboardOutlined, TeamOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const getMenuItems = () => {
    const items = [
      { key: '1', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
    ];

    if (user && user.role === 'admin') {
      items.push(
        { key: '2', icon: <UserOutlined />, label: <Link to="/users">Users</Link> },
        { key: '3', icon: <TeamOutlined />, label: <Link to="/agents">Agents</Link> },
        { key: '4', icon: <MedicineBoxOutlined />, label: <Link to="/clinics">Clinics</Link> }
      );
    }

    return items;
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
        items={getMenuItems()}
      />
    </Sider>
  );
};

export default Sidebar;