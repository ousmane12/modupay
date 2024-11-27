const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/countries', require('./routes/countryRoutes'));
app.use('/api/agencies', require('./routes/agencyRoutes'));
app.use('/api/investments', require('./routes/investmentRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));

// Serve frontend
/* if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
} */

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));