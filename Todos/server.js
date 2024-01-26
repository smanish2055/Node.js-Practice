const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Sample data (tasks)
let tasks = ['Buy groceries', 'Complete homework'];

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/addTask', (req, res) => {
    const { task } = req.body;

    if (task) {
        tasks.push(task);
        res.json(tasks);
    } else {
        res.status(400).json({ error: 'Task is required' });
    }
});
app.post('/test',(req,res) => {
    console.log(req.body);
    res.send({
        status  : 200,
        data : req.body
    })
})
app.get('*', (req, res) => {
    // Handle any other routes by serving the index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
