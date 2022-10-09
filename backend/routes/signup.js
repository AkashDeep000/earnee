import express from 'express';
const router = express.Router()
import createError from "http-errors";
import pb from "../pb/index.js"


router.post('/', async (req, res, next) => {

  const {
    name, email, phone, password, referId
  } = req.body

  if (!email || !password || !name || !phone) {
    next(createError.Unauthorized())
  }
  try {
    const user = await pb.users.create({
    email,
    password,
    passwordConfirm: password,
});
    res.send({})

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false, error: error
    })
  }
});

export default router;