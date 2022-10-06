import express from 'express';
const router = express.Router()

import {
  uid
} from "uid"
import Razorpay from 'razorpay'
import pb from "../pb/index.js"
import createError from "http-errors";

router.post('/', async (req, res, next) => {
  const {
    userId, packageId
  } = req.body
  if (!userId || !packageId) {
    next(createError.Unauthorized())
  }

  const Package = await pb.records.getOne('packages', packageId);
console.log(Package)
  const payment_capture = 1
  const amount = Package.price
  const currency = 'INR'

  //production
  //	key_id: 'rzp_live_EwHLrT8UTaUgoG',
  //key_secret: 'bYut9jQaNdDb8S1bIQXrnCOw'
  //testing
  //key_id: 'rzp_test_dhlZTnBnAibhF6',
  //	key_secret: 'V088sC8GxHmOjwdv9K3VLkIn'
  const razorpay = new Razorpay({
    key_id: 'rzp_test_dhlZTnBnAibhF6',
    key_secret: 'V088sC8GxHmOjwdv9K3VLkIn'
  })

  const options = {
    amount: amount * 100,
    currency,
    receipt: uid(16),
    notes: {
      number: req.body.number
    },
    payment_capture
  }

  try {
    const response = await razorpay.orders.create(options)
    console.log(response)

    try {
      console.log("number: " + req.body.number)
      await pb.records.create('payments', {
        user: userId,
        package: Package.id,
        orderId: response.id,
        amount: response.amount,
        currency: response.currency,
        status: "pending",
      })
      //after storing order details sends ifo to client
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      })

    } catch (e) {
      console.log(e)
      res.status(200).json({
        success: false, error: e
      })
    }


  } catch (error) {
    console.log(error)
    res.status(200).json({
      success: false, error: error
    })
  }
});

export default router;