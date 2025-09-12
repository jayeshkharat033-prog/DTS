import express from 'express'; 
 
const app = express(); 
 
app.use(express.json()); 
 
app.use((req, res, next) => { 
  const currentDate = new Date().toISOString(); 
  console.log(`[${currentDate}] - ${req.method} request to ${req.originalUrl}`); 
  next();  
}); 
 
const users = [ 
  { username: 'Jayesh', role: 'admini', lastAccessDate: '2025-09-02' }, 
  { username: 'Tejas', role: 'user', lastAccessDate: '2025-08-25' }, 
  { username: 'Shivam', role: 'user', lastAccessDate: '2025-08-29' },
  { username: 'Vedant', role: 'user', lastAccessDate: '2025-08-10' },  
]; 
 
app.get('/users', (req, res) => { 
  res.json(users); 
}); 
 
app.get('/users/recent', (req, res) => { 
  const now = new Date(); 
  const tenDaysBefore = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000); 
 
  const recentUsers = users.filter(user => new Date(user.lastAccessDate) >= 
tenDaysBefore); 
 
  res.json(recentUsers); 
}); 
 
const PORT = 4000; 
app.listen(PORT, () => { 
  console.log(`App is running at http://localhost:${PORT}`); 
}); 
 