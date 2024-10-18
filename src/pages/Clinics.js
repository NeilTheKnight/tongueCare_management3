import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { getClinics, createClinic, getAgents } from '../services/api';
import { withAuthorization } from '../utils/rbac';

const Clinics = () => {
  // ... (previous code remains the same)
};

export default withAuthorization(Clinics, 'admin');