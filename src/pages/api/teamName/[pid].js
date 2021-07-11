// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTeam } from '../../../utils/playerapi'
export default async (req, res) => {
  const details = await getTeam(req.query.pid);
  res.status(200).json(details)
}
