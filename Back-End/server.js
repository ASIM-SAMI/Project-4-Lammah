require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify :true },
  () => {
    console.log("mongoDB is connected");
  }
);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
app.use("/api/user", require("./routes/user"));
app.use("/api/facility", require("./routes/facility"));
app.use("/api/appointment", require("./routes/appointment"));



app.listen(PORT, () => console.log(`server running in ${PORT}`));