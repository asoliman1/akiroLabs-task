const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); 
const port = 3001; // Choose a port for your API

app.use(bodyParser.json());
app.use(cors());

app.post('/validate', (req, res) => {
  const token = req.body.token;
  const isValid = validateToken(token);
  res.json({ isValid });
});

function validateToken(token) {
  const digits = token.replace(/-/g, '').split('').map(Number);
  let sum = 0;
  let isSecond = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let num = digits[i];
    if (isSecond) {
      num *= 2;
      if (num > 9) num -= 9;
    }
    sum += num;
    isSecond = !isSecond;
  }

  return sum % 10 === 0;
}

app.listen(port, () => {
  console.log(`Token Validator Service is running on port ${port}`);
});
