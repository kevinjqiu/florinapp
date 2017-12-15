import { Response, Request } from "express";
import db from '../db'

interface Category {
    name: string;
}

export const index = async (req: Request, resp: Response) => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "category" }
  });
  console.log(result);
  resp.send(<Array<Category>>result);
};