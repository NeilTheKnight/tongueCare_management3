// ... (previous code remains the same)

export const getDiagnoses = () => api.get('/diagnosis');
export const createDiagnosis = (diagnosisData) => api.post('/diagnosis', diagnosisData);

// ... (rest of the code remains the same)