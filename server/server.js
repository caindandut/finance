require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');

connectDB();
const app = express();

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const errorHandler = require('./middlewares/errorMiddleware');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.get('/error', (req, res, next) => {
    const error = new Error('Test Error Middleware');
    error.statusCode = 400;
    next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));