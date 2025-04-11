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
mongodbConfig();
Socket(server)
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['POST','GET'],
  credentials: true
}));
app.use('',auth)
app.use('',MusicRoute)
server.listen(3001, () => {
  console.log('Server Running At 3001');
});
