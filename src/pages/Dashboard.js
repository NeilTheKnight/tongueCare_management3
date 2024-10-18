import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, MedicineBoxOutlined, ExperimentOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import { getDashboardStats } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalClinics: 0,
    totalDevices: 0,
    deviceStatus: [],
    clinicsByRegion: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const deviceStatusOption = {
    title: {
      text: 'Device Status',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Device Status',
        type: 'pie',
        radius: '50%',
        data: stats.deviceStatus,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const clinicsByRegionOption = {
    title: {
      text: 'Clinics by Region',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: stats.clinicsByRegion.map(item => item.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Clinics',
        type: 'bar',
        data: stats.clinicsByRegion.map(item => item.value),
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Agents"
              value={stats.totalAgents}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Clinics"
              value={stats.totalClinics}
              prefix={<MedicineBoxOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Devices"
              value={stats.totalDevices}
              prefix={<ExperimentOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card>
            <ReactECharts option={deviceStatusOption} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <ReactECharts option={clinicsByRegionOption} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;