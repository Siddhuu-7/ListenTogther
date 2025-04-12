const express = require('express');
const cors = require('cors');
const http=require('http');
const app = express();
const auth=require('./routes/auth')
require('dotenv').config()
const mongodbConfig=require('./Models/mongodb.config')
const Socket=require('./socket/socket')
const MusicRoute=require('./routes/musicRoutes')
const server=http.createServer(app)
const path = require('path');
mongodbConfig();
Socket(server)
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['POST','GET'],
  credentials: true
}));
app.use('',auth)
app.use('',MusicRoute)

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error("Error serving index.html:", error);
    res.status(500).send("Server error");
  }
});




server.listen(3001, () => {
  console.log('Server Running At 3001');
});
