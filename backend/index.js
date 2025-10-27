const express = require('express');
const app = express();
const PORT = 4444;
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth",require("./routes/auth"));
app.use("/api/project/task",require("./routes/task"))
app.use("/api/project",require("./routes/project"));


app.listen(PORT, () => {
  console.log(`http://localhost:`+PORT);
});