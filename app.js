const express = require('express');
const app = express();
const moragan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const port = process.env.PORT || 3000;

const dataRouter = require('./api/routes/data');

mongoose.connect('mongodb://localhost:27017/tests').then(
    console.log('Database Connect'),
)

app.use(cors({origin: 'http://localhost:4200'}))
app.use(moragan('dev'));
app.use(bodyParser.json());
app.use('/data', dataRouter);
// app.use((req, res, next) => {
//     res.header('Acess-Control-Allow-Origin','*');
//     res.header('Acess-Control-Allow-Headers',
// 'Origin, X-Requested-With, Content-type, Accept, Authorization');
// if(req.method === 'OPTIONS') {
//     res.header('Acess-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
// }
//    next();
// });

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

app.listen(port,  () => {
    console.log('Port starting');
})