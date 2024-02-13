const express = require('express');
const app = express();
const PORT = 7000;

app.use(express.json());

const apiroutes = require('./routes/api.js');
app.use('/api', apiroutes);

app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`);
});