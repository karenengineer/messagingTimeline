const app = require('./backend/handlers/api-requests')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
