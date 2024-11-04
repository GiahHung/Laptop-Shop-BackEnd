import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();
import cors from 'cors'

let app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// app config
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

configViewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("BackEnd NodeJs is running on port: " + port);
});
