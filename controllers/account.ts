import { db } from "../db";
import SearchResponse from "../dtos/SearchResponse";
import AccountDTO from "../dtos/Account";

class AccountSearchRequest {}
export const search = async (req: AccountSearchRequest): Promise<SearchResponse<AccountDTO> => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "account" }
  });

  const accountDtos = result.docs.map(account => new AccountDTO(account));
  return new SearchResponse<AccountDTO>(accountDtos);
};
