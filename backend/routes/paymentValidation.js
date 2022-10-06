import express from 'express';
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config();
import {
  uid
} from "uid"
import crypto from "crypto";
import pb from "../pb/index.js"
import createError from "http-errors";

router.post('/', async (req, res, next) => {
  const secret = process.env.PASSWORD
	console.log(req.body)

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')
 
	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		
try {
//  console.log(req.body.payload.payment.entity)
    const paymentArray = await pb.records.getFullList('payments', 1 /* batch size */, {
    filter: 'orderId = req.body.payload.payment.entity.order_id'
});
    const payment = paymentArray[0]
    console.log(payment)
    const paymentUpdate = pb.records.update('payments', payment.id, {
    status: "successfull",
    payload: req.body
});
    
    const userUpdate = pb.users.update(payment.user, {
    
});
    .updateOne({orderId:req.body.payload.payment.entity.order_id}, {$set:{
      payment: "successfull",
      endedOn: new Date(),
      rezorpayPayload: req.body
    }});
    
    await Promise.all([userUpdate, paymentUpdate]).then(() => {
      console.log(paymentUpdate, userUpdate)
      res.json({ status: 'ok' })
    })
    
} catch (e) {
  console.log(e)
}
    
    
    }	else {
		// pass it
		 return res.status(404).json()
    }
	}

	
 else return res.status(404).json()
});

export default router;