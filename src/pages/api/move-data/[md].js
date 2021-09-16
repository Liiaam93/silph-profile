import { getMoveData } from "../../../utils/move-dataAPI";
export default async (req, res) => {
  const details = await getMoveData(req.query.md);
  res.status(200).json(details);
};
