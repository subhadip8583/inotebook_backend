const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const connectToMongo = require("./db");
var cors = require('cors')
// database connection
connectToMongo();
const app = express();
const port =process.env.PORT || 5000 ;


app.use(cors())
app.use(express.json());

// availabel routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`);
});
