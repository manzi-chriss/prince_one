const express= require('express');
const {connectDB}= require('./models/DBconnection');
const cors= require('cors');

const PORT = process.env.PORT || 5000;




connectDB();
const app = express();

app.use(express.json());
app.use(cors());




const uploadImgRoutes = require('./controllers/router/UploadImg')
const userRoutes = require('./controllers/router/User');
const accountRoutes = require('./controllers/router/User')
const loginRoute = require('./controllers/router/Login')
const messageRoute= require('./controllers/router/Message')

app.use('/uploadImg', uploadImgRoutes);
app.use('/api/users',userRoutes);
app.use('/api/account',accountRoutes)
app.use('/api/login',loginRoute)
app.use('/message',messageRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));