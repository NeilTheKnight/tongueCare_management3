import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { getDiagnoses, createDiagnosis, getDevices } from '../services/api';
import { withAuthorization } from '../utils/rbac';

const { Option } = Select;

const Diagnoses = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDiagnoses();
    fetchDevices();
  }, []);

  const fetchDiagnoses = async () => {
    setLoading(true);
    try {
      const response = await getDiagnoses();
      setDiagnoses(response.data);
    } catch (error) {
      message.error('Failed to fetch diagnoses');
    } finally {
      setLoading(false);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await getDevices();
      setDevices(response.data);
    } catch (error) {
      message.error('Failed to fetch devices');
    }
  };

  const handleCreateDiagnosis = async (values) => {
    try {
      await createDiagnosis(values);
      message.success('Diagnosis created successfully');
      setModalVisible(false);
      form.resetFields();
      fetchDiagnoses();
    } catch (error) {
      message.error('Failed to create diagnosis');
    }
  };

  const columns = [
    { title: 'Patient ID', dataIndex: 'patientId', key: 'patientId' },
    { title: 'Device', dataIndex: ['deviceId', 'deviceId'], key: 'deviceId' },
    { title: 'Diagnosis Result', dataIndex: 'diagnosisResult', key: 'diagnosisResult' },
    { title: 'Diagnosis Date', dataIndex: 'diagnosisDate', key: 'diagnosisDate', render: (text) => new Date(text).toLocaleString() },
  ];

  return (
    <div>
      <h1>Diagnoses</h1>
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
        Add Diagnosis
      </Button>
      <Table columns={columns} dataSource={diagnoses} loading={loading} rowKey="_id" />
      <Modal
        title="Add Diagnosis"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateDiagnosis}>
          <Form.Item name="patientId" rules={[{ required: true, message: 'Please input the patient ID!' }]}>
            <Input placeholder="Patient ID" />
          </Form.Item>
          <Form.Item name="deviceId" rules={[{ required: true, message: 'Please select a device!' }]}>
            <Select placeholder="Select a device">
              {devices.map(device => (
                <Option key={device._id} value={device._id}>{device.deviceId}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="diagnosisResult" rules={[{ required: true, message: 'Please input the diagnosis result!' }]}>
            <Input.TextArea placeholder="Diagnosis Result" />
          </Form.Item>
          <Form.Item name="diagnosisData" rules={[{ required: true, message: 'Please input the diagnosis data!' }]}>
            <Input.TextArea placeholder="Diagnosis Data (JSON format)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Diagnosis
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withAuthorization(Diagnoses, 'doctor');