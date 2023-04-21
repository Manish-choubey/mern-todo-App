const express = require('express');
const sequelize = require('../backend/db');
const cors = require('cors')
app.use(cors())

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json())


// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
