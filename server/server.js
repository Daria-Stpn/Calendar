import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/register', async (req, res) => {
  const { login, email, password } = req.body;
  try{
    let result = await pool.query('SELECT * FROM users WHERE email = ? OR login = ?', [email, login]);
    if(result[0].length > 0){
      return res.status(400).json({ message: 'User with this email or login already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query('INSERT INTO users (login, email, password) VALUES (?, ?, ?)', [login, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  }catch(error){
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
    try{
        const  [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if(users.length === 0){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: "14d" });
        res.status(200).json({ token });
    }catch(error){
            res.status(500).json({ message: 'Error logging in.' });
        }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(403).json({ message: 'Access denied.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}
    app.get('/protected', authenticateToken, (req, res) => {
        res.send({message: `Hello, user ${req.user.id}!`});
})




















const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});