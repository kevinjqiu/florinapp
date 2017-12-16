import { db } from "../db";
import SearchResponse from "../dtos/SearchResponse";
import AccountDTO from "../dtos/Account";
import { Account } from "../db/Account";

class AccountSearchRequest {}
export const search = async (req: AccountSearchRequest): Promise<SearchResponse<AccountDTO> => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "account" }
  });

  const accountDtos = result.docs.map((account: Account) => new AccountDTO(account));
  return new SearchResponse<AccountDTO>(accountDtos);
};
