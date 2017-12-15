import * as PouchDB from "pouchdb";
import FlorinBase from './FlorinBase';

export enum CategoryType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",

  TRANSFER = "TRANSFER"
}

export interface Category extends FlorinBase {
  name: string;
  parent: string | null;
  type: string;
  // Whether or not transactions are allowed to be tagged this category
  allowTransactions: boolean;
};

export const newCategory = (
  id: string,
  name: string,
  parent: string | null = null,
  allowTransactions: boolean = true,
  type: CategoryType = CategoryType.EXPENSE,
): Category => {
  return { metadata: { docType: "category" }, _id: id, name, parent, type, allowTransactions };
};

export const seed = (): Array<Category> => {
  return [
    newCategory("automobile", "Automobile", null, false),
    newCategory("automobile-carinsurance", "Automobile::Car Insurance", "automobile"),
    newCategory("automobile-carpayment", "Automobile::Car Payment", "automobile"),
    newCategory("automobile-gasoline", "Automobile::Gasoline", "automobile"),
    newCategory("automobile-highwaytolls", "Automobile::Highway Tolls", "automobile"),
    newCategory("automobile-maintenance", "Automobile::Maintenance", "automobile"),
    newCategory("automobile-parking", "Automobile::Parking", "automobile"),
    newCategory("automobile-other", "Automobile::Other", "automobile"),

    newCategory("bankcharges", "Bank Charges", null, false),
    newCategory("bankcharges-interestpaid", "Bank Charges::Interest Paid", "bankcharges"),
    newCategory("bankcharges-servicecharge", "Bank Charges::Service Charge", "bankcharges"),
    newCategory("bankcharges-other", "Bank Charges::Other", "bankcharges"),

    newCategory("bills", "Bills", null, false),
    newCategory("bills-cablesatellitetv", "Bills:Cable/Satellite Television", "bills"),
    newCategory("bills-cellphone", "Bills:Cell Phone", "bills"),
    newCategory("bills-hydro", "Bills:Hydro", "bills"),
    newCategory("bills-gas", "Bills:Gas", "bills"),
    newCategory("bills-onlineservice", "Bills:Online/Internet Service", "bills"),
    newCategory("bills-telephone", "Bills:Telephone", "bills"),
    newCategory("bills-other", "Bills:Other", "bills"),

    newCategory("donations", "Donations", null, false),
    newCategory("donations-charity", "Donations::Charity", "donations"),
    newCategory("donations-church", "Donations::Church", "donations"),
    newCategory("donations-other", "Donations::Other", "donations"),

    newCategory("diningout", "Dining Out", null, false),
    newCategory("diningout-fastfood", "Dining Out::Fast Food/Coffee Shops", "diningout"),
    newCategory("diningout-restaurants", "Dining Out::Restaurants", "diningout"),
    newCategory("diningout-other", "Dining Out::Other", "diningout"),

    newCategory("publictransportation", "Public Transportation"),

    newCategory("grocery", "Grocery"),

    newCategory("mortgage", "Mortgage"),

    newCategory("shopping", "Shopping", null, false),
    newCategory("shopping-books", "Shopping::Books", "shopping"),
    newCategory("shopping-electronics", "Shopping::Electronics", "shopping"),
    newCategory("shopping-entertainment", "Shopping::Entertainment", "shopping"),
    newCategory("shopping-hobbies", "Shopping::Hobbies", "shopping"),
    newCategory("shopping-pets", "Shopping::Pets", "shopping"),
    newCategory("shopping-other", "Shopping::Other", "shopping"),

    newCategory("travel", "Travel/Vacation", null, false),
    newCategory("travel-lodging", "Travel/Vacation::Lodging", "travel"),
    newCategory("travel-flights", "Travel/Vacation::Flights", "travel"),
    newCategory("travel-membership", "Travel/Vacation::Membership", "travel"),
    newCategory("travel-other", "Travel/Vacation::Other", "travel"),

    newCategory("healthcare", "Health Care", null, false),
    newCategory("healthcare-dental", "Health Care::Dental", "healthcare"),
    newCategory("healthcare-eyecare", "Health Care::Eyecare", "healthcare"),
    newCategory("healthcare-hospital", "Health Care::Hospital", "healthcare"),
    newCategory("healthcare-prescription", "Health Care::Prescription", "healthcare"),
    newCategory("healthcare-petcare", "Health Care::Pet Care", "healthcare"),
    newCategory("healthcare-other", "Health Care::Other", "healthcare"),

    newCategory("income-interest", "Interest Income", null, true, CategoryType.INCOME),
    newCategory("income-salary", "Salary", null, true, CategoryType.INCOME),
    newCategory("income-salaryspouse", "Salary (Spouse)", null, true, CategoryType.INCOME),
    newCategory("income-rewards", "Rewards", null, true, CategoryType.INCOME),
    newCategory("income-other", "Other Income", null, true, CategoryType.INCOME),

    newCategory("internaltransfer", "Account Transfer", null, true, CategoryType.TRANSFER),
  ];
};