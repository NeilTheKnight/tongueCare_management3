import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { getDevices, createDevice, getClinics } from '../services/api';
import { withAuthorization } from '../utils/rbac';

const Devices = () => {
  // ... (previous code remains the same)
};

export default withAuthorization(Devices, 'clinic_admin');