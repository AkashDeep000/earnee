import express from 'express';
const router = express.Router()

import {
  uid
} from "uid"
import Razorpay from 'razorpay'
import pb from "../pb/index.js"
import createError from "http-errors";
import dotenv from 'dotenv'
dotenv.config();

router.post('/', async (req, res, next) => {
  const {
    userId, packageId
  } = req.body
  if (!userId || !packageId) {
    next(createError.Unauthorized())
  }
try {
  const getPackage = pb.records.getOne('packages', packageId);
  const getUser = pb.users.getOne(userId)
  const [Package,
    user] = await Promise.all([getPackage, getUser])
if (!user.id || user.profile.activePackage) {
  next(createError.Unauthorized())
}
  console.log(Package)
  const payment_capture = 1
  const amount = Package.price * 100
  console.log(Package.price, amount)
  const currency = 'INR'

  const razorpay = new Razorpay({
    key_id: process.env.RP_KEY,
    key_secret: process.env.RP_SECRET
  })

  const options = {
    amount,
    currency,
    receipt: uid(16),
    notes: {
      number: req.body.number
    },
    payment_capture
  }

  
    const response = await razorpay.orders.create(options)
    console.log(response)

    try {
      
      const paymentObj = {
        profile: user.profile.id,
        package: Package.id,
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
        status: "pending",

      }
      if (user.profile.referBy) {
        Package.referBy = user.profile.referBy
      }
      await pb.records.create('payments', paymentObj)
      //after storing order details sends ifo to client
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      })

    } catch (e) {
      console.log(e)
      res.status(400).json({
        success: false, error: e
      })
    }


  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false, error: error
    })
  }
});

export default router;