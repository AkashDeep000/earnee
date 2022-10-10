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

    const updateData = {
      name,
      phone,
    }
    let currentRefers = []
    if (referId) {
      try {
        const referUser = await pb.records.getOne("profiles", referId.toLowerCase())
        updateData.referedBy = referUser.id
        currentRefers = referUser.refers
      } catch(e) {
        console.log(e)
        res.status(423).json({
          success: false, error: {
            message: "Wrong refer ID"
          },
        })
        return
      }
    }

    const user = await pb.users.create({
      email,
      password,
      passwordConfirm: password,
    });

    if (updateData.referedBy) {
      const refer = await pb.records.create("refers", {
        referedBy: updateData.referedBy,
        referedTo: user.profile.id
      })
      await pb.records.update('profiles', updateData.referedBy, {
        refers: [refer.id, ...currentRefers]
      });
    }
    const updatedProfile = await pb.records.update('profiles', user.profile.id, updateData);
    res.send(updatedProfile)

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false, error: error
    })
  }
});

export default router;