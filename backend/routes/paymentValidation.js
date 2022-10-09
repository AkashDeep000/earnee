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

      const paymentArray = await pb.records.getFullList('payments', 1, {
        filter: `(orderId='${req.body.payload.payment.entity.order_id}')`,
        expand: 'package,profile,profile.referedBy'
      });
      const payment = paymentArray[0]


      if (payment["@expand"].profile.activePackage) {
        next(createError.Unauthorized())
      }
      
      console.log(payment)
      const paymentUpdate = pb.records.update('payments', payment.id, {
        status: "successfull",
        payload: req.body
      });


      const referUpdateFn = async () => {
        console.log('referedId', payment['@expand'].profile.referedBy)
        if (!payment['@expand'].profile.referedBy) return
        let commission2 = 0 
        if (payment['@expand'].profile["@expand"]?.referedBy?.referedBy) {
          commission2 = payment['@expand'].package.commission2
        }
        const referArray = await pb.records.getFullList('refers', 1, {
          filter: `(referedBy='${payment['@expand'].profile.referedBy}' && referedTo='${payment['@expand'].profile.id}')`
        });
        console.log("referArray", referArray)
        const refer = referArray[0]
        const referUpdate = await pb.records.update('refers', refer.id, {
          commission1: payment['@expand'].package.commission1,
          commission2: commission2,
          package: payment.package,
          payment: payment.id,
        });
      }
      const referUpdate = referUpdateFn()
      const userUpdate = pb.records.update("profiles", payment.profile, {
        activePackage: payment.package,
      });



      await Promise.all([userUpdate, referUpdate, paymentUpdate])
      .catch(err => {
        return res.status(404).json()
        throw err
      })
      .then(() => {
        //  console.log(paymentUpdate, userUpdate)
        res.json({
          status: 'ok'
        })
      })

    } catch (e) {
      console.log(e)
    }


  } else {
    // pass it
    return res.status(404).json()
  }
});

export default router;