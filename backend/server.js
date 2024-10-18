// ... (previous code remains the same)

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/clinics', require('./routes/clinics'));
app.use('/api/devices', require('./routes/devices'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/diagnosis', require('./routes/diagnosis'));

// ... (rest of the code remains the same)