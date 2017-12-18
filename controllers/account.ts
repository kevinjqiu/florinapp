import { db } from "../db";
import SearchResponse from "../dtos/SearchResponse";
import PostResponse from "../dtos/PostResponse";
import AccountDTO from "../dtos/Account";
import { Account, AccountType, newAccount } from "../db/Account";

export class AccountSearchRequest {}
export const search = async (
  req: AccountSearchRequest
): Promise<SearchResponse<AccountDTO>> => {
  const result = await (<any>db).find({
    selector: { "metadata.docType": "account" }
  });

  const accountDtos = result.docs.map(
    (account: Account) => new AccountDTO(account)
  );
  return new SearchResponse<AccountDTO>(accountDtos);
};

export class AccountPostRequest {
  name: string;
  financialIntitution: string;
  type: AccountType;
  constructor(name: string, financialInstitution: string, type: AccountType) {
    this.name = name;
    this.financialIntitution = financialInstitution;
    this.type = type;
  }

  validate() {
    if (!(this.type in AccountType)) {
      throw {
        type: "INVALID_ACCOUNT_TYPE",
        message: `${this.type} is not a valid account type`
      };
    }

    if (this.name === undefined) {
      throw { type: "REQUIRED_FIELD", message: `name is a required field` };
    }

    if (this.financialIntitution === undefined) {
      throw {
        type: "REQUIRED_FIELD",
        message: `financialInstitution is a required field`
      };
    }
  }
}
export const post = async (
  req: AccountPostRequest
): Promise<PostResponse<AccountDTO>> => {
  const postResult = await db.post(
    newAccount(req.name, req.financialIntitution, req.type)
  );
  const getResult = await db.get(postResult.id);
  // @ts-ignore
  return new PostResponse(new AccountDTO(<Account>getResult));
};
