const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
// app.use(express.json());

// Sample route for testing
app.get('/api', (req, res) => {
    res.json({ message: 'hello hello!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});