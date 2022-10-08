import express from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import dotenv from 'dotenv'
dotenv.config();
import cors from "cors"
import payment from "./routes/payment.js"
import paymentValidation from "./routes/paymentValidation.js"
import api from "./routes/api.route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({
    message: 'Awesome it works 🐻'
  });
});

app.use('/payment', payment);
app.use('/payment-validation', paymentValidation);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

process.on('SIGINT', () => {
  console.log("SIGINT recieved.")
  server.close(() => {
    console.log("Server is closed...")
    process.exit(0)
  })
})

process.on('SIGTERM', () => {
  console.log("SIGTERM recieved.")
  server.close(() => {
    console.log("Server is closed...")
    process.exit(0)
  })
})