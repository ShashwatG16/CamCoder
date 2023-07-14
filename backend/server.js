import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import downloadRoutes from "./routes/downloadRoutes.js";
import bodyParser from 'body-parser';

dotenv.config()
connectDB()

const app = express();
// // Configure body-parser middleware
 app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/upload',uploadRoutes)

app.use('/api/download', downloadRoutes)

const __dirname = path.resolve();
app.use('/uploads/', express.static(path.join(__dirname, '/uploads/')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Server is running on port ' + `${PORT}`);
});
