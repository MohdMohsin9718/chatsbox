const path = require('path');
const { urlencoded } = require('express');
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 6868;
console.log(port);
const app = express();

connectDB();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
  })
);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to prduction'));
}

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
