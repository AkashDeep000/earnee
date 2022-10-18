import express from 'express';
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config();
import {
  uid
} from "uid"
import PocketBase from "pocketbase"
import createError from "http-errors";

router.post('/:paymentId', async (req, res, next) => {
  const {
    paymentId1
  } = req.params
  const {
    paymentId, transactionId
  } = req.body
  const {
    token
  } = req.query
  console.log(paymentId, paymentId1, token)
  if (!paymentId && !token) {
    console.log('request is not legit')
    return res.status(404).json()
  }
  try {
    const pb = new PocketBase(process.env.PB_URL);
    //  console.log(req.body.payload.payment.entity)
    pb.authStore.save(token)
    const paymentArray = await pb.records.getFullList('manualPayments', 1, {
      filter: `(id='${paymentId || paymentId1}')`,
      expand: 'package,profile,profile.referedBy'
    });
    const payment = paymentArray[0]


    if (payment["@expand"].profile.activePackage) {
      next(createError.Unauthorized())
    }

    console.log(payment)

    const paymentUpdate = await pb.records.update('manualPayments', payment.id, {
      verified: true,
      transactionId,
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
        manualPayment: payment.id,
      });
    }
    const referUpdate = await referUpdateFn()
    const userUpdate = await pb.records.update("profiles", payment.profile, {
      activePackage: payment.package,
    });



    return res.json({
      status: 'ok'
    })

  } catch (e) {
    console.log(e)
    return res.status(404).json()
  }

})
  export default router;