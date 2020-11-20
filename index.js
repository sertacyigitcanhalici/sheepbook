const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
//middleware

app.use(cors());
app.use(express.json());
//routes
app.use("/user", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`Server is starting on port {PORT}`);
});
