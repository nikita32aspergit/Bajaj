const express = require('express');
//const bodyParser = require('body-parser');
const mime = require('mime-types');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());

// Helper function to check if a number is prime
const isPrime = (n) => {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
};

app.use(express.json());

// POST route
app.post('/bfhl', (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        // Hardcoded user info
        const user_id = 'john_doe_17091999';
        const email = 'john@xyz.com';
        const roll_number = 'ABCD123';

        // Process input data
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /[a-zA-Z]/.test(item));

        // Find the highest lowercase alphabet
        const highest_lowercase = alphabets.filter(a => a === a.toLowerCase());
        const max_lowercase = highest_lowercase[highest_lowercase.length - 1];

        // Check for prime numbers
        const is_prime_found = numbers.some(num => isPrime(parseInt(num)));

        // File handling (basic base64 check)
        let file_valid = false;
        let file_mime_type = null;
        let file_size_kb = 0;

        if (file_b64) {
            const buffer = Buffer.from(file_b64, 'base64');
            file_valid = true;
            file_size_kb = buffer.length / 1024; // KB
            file_mime_type = mime.lookup(file_b64) || 'unknown';
        }

        const response = {
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: [max_lowercase],
            is_prime_found,
            file_valid,
            file_mime_type,
            file_size_kb
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: error.message });
    }
});

// GET route
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
