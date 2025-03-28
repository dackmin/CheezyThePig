const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 9333;

app.use(express.static('./'));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
