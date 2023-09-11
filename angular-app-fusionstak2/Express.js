const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Simulated user data (replace with your database)
const users = [
  { username: 'user1', password: 'hashed_password_1' },
  { username: 'user2', password: 'hashed_password_2' },
];

app.post('/api/reset-password', (req, res) => {
  const { username, newPassword } = req.body;

  // Find the user in your database (you should use a real database)
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's password (you should hash the newPassword)
  user.password = newPassword;

  return res.status(200).json({ message: 'Password reset successful' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
