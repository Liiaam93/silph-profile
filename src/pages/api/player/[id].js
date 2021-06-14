// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSilph } from '../../../utils/api'
export default async (req, res) => {
  const details = await getSilph(req.query.id);
  res.status(200).json(details)
}
