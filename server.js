const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let quotes = [
    "Success is no accident.",
    "Keep pushing forward!",
    "You are capable of amazing things."
];

app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

app.post('/api/quote', (req, res) => {
    const { quote } = req.body;
    if (!quote) {
        return res.status(400).json({ error: "Quote is required." });
    }
    quotes.push(quote);
    res.status(201).json({ message: "Quote added successfully." });
});
app.get('/square', (req, res) => {
  const num = parseFloat(req.query.num);
  const square = num * num;
  res.send(`The square of ${num} is: ${square}`);
});
app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (isNaN(a) || isNaN(b)) {
        return res.send("Error: Please provide valid numbers using query parameters 'a' and 'b'.");
    }
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is: ${sum}`);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
