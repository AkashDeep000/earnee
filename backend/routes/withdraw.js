import express from 'express';
const router = express.Router()
import createError from "http-errors";
import getUserDetails from "../helper/userDetails.js"
import PocketBase from "pocketbase"
import dotenv from 'dotenv'
dotenv.config();
import pb from "../pb/index.js"

const client = new PocketBase(process.env.PB_URL);


router.post('/:profileId', async (req, res, next) => {

  const {
    profileId
  } = req.params

  const {
    token
  } = req.query

  const {
    amount
  } = req.body

  if (!profileId || !token || !amount) {
    next(createError.Unauthorized())
  }

  if (amount % 1 !== 0) {
    next(createError.Unauthorized())
  }

  try {
    client.authStore.save(token, {
      verified: false
    })
    const userDetails = await getUserDetails(profileId)
    const profile = await pb.records.getOne('profiles', profileId);

    if (amount > userDetails) {
      res.status(423).json({
        success: false, error: "Insufficient balance"
      })
    }
    const withdraw = await pb.records.create('withdraws', {
      profile: profileId,
      amount: amount,
      upi: profile.upi,
      accountIFSC: profile.accountIFSC,
      accountName: profile.accountName,
      accountNumber: profile.accountNumber,
      isPaid: false,
    });

    res.send(withdraw)

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false, error: error
    })
  }
});

export default router;