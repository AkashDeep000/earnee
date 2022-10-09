import express from 'express';
const router = express.Router()
import userDetails from "../helper/userDetails.js"
import createError from "http-errors";


//import NodeCache from "node-cache"

/*
const cache = new NodeCache({
  stdTTL: 5
})
function getUrlFromRequest(req) {
  const url = req.protocol + '://' + req.headers.host + req.originalUrl
  return url
}
*/

router.get('/:profileId', async (req, res, next) => {
  /*
  const url = getUrlFromRequest(req)
  const content = cache.get(url)
  console.log(content)
  if (content) {
    console.log("from cache")
    return res.status(200).send(content)
  }
*/
  const {
    profileId
  } = req.params

  console.log(profileId)

  if (!profileId) {
    next(createError.Unauthorized())
  }
  try {

    const data = await userDetails(profileId)
    //  cache.set(url, data)

    res.send(data)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false, error: error
    })
  }
});

export default router;