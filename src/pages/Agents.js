import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { getAgents, createAgent } from '../services/api';
import { withAuthorization } from '../utils/rbac';

const Agents = () => {
  // ... (previous code remains the same)
};

export default withAuthorization(Agents, 'admin');