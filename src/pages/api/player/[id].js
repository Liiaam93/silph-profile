// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTrainerInfo } from "../../../utils/trainer-cardAPI";
export default async (req, res) => {
  const details = await getTrainerInfo(req.query.id);
  res.status(200).json(details);
};
