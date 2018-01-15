// @flow
import Category from "../models/Category";
import type { CategoryType } from "../models/CategoryType";
import { categoryTypes } from "../models/CategoryType";

const newCategory = (
  _id: string,
  name: string,
  parent: ?string,
  allowTransactions: boolean = true,
  type: CategoryType = categoryTypes.EXPENSE
) => {
  return new Category({ _id, name, parent, type, allowTransactions });
};

const categorySeeds = (): Array<Category> => {
  return [
    newCategory("automobile", "Automobile", null, false),
    newCategory("automobile-carinsurance", "Car Insurance", "automobile"),
    newCategory("automobile-carpayment", "Car Payment", "automobile"),
    newCategory("automobile-gasoline", "Gasoline", "automobile"),
    newCategory("automobile-highwaytolls", "Highway Tolls", "automobile"),
    newCategory("automobile-maintenance", "Maintenance", "automobile"),
    newCategory("automobile-parking", "Parking", "automobile"),
    newCategory("automobile-other", "Other", "automobile"),

    newCategory("bankcharges", "Bank Charges", null, false),
    newCategory("bankcharges-interestpaid", "Interest Paid", "bankcharges"),
    newCategory("bankcharges-servicecharge", "Service Charge", "bankcharges"),
    newCategory("bankcharges-other", "Other", "bankcharges"),

    newCategory("bills", "Bills", null, false),
    newCategory(
      "bills-cablesatellitetv",
      "Cable/Satellite Television",
      "bills"
    ),
    newCategory("bills-cellphone", "Cell Phone", "bills"),
    newCategory("bills-hydro", "Hydro", "bills"),
    newCategory("bills-gas", "Gas", "bills"),
    newCategory("bills-onlineservice", "Online/Internet Service", "bills"),
    newCategory("bills-telephone", "Telephone", "bills"),
    newCategory("bills-other", "Other", "bills"),

    newCategory("donations", "Donations", null, false),
    newCategory("donations-charity", "Charity", "donations"),
    newCategory("donations-church", "Church", "donations"),
    newCategory("donations-other", "Other", "donations"),

    newCategory("diningout", "Dining Out", null, false),
    newCategory("diningout-fastfood", "Fast Food/Coffee Shops", "diningout"),
    newCategory("diningout-restaurants", "Restaurants", "diningout"),
    newCategory("diningout-other", "Other", "diningout"),

    newCategory("publictransportation", "Public Transportation"),

    newCategory("grocery", "Grocery"),

    newCategory("mortgage", "Mortgage"),

    newCategory("shopping", "Shopping", null, false),
    newCategory("shopping-books", "Books", "shopping"),
    newCategory("shopping-electronics", "Electronics", "shopping"),
    newCategory("shopping-entertainment", "Entertainment", "shopping"),
    newCategory("shopping-hobbies", "Hobbies", "shopping"),
    newCategory("shopping-pets", "Pets", "shopping"),
    newCategory("shopping-gifts", "Gifts", "shopping"),
    newCategory("shopping-other", "Other", "shopping"),

    newCategory("travel", "Travel/Vacation", null, false),
    newCategory("travel-lodging", "Lodging", "travel"),
    newCategory("travel-flights", "Flights", "travel"),
    newCategory("travel-membership", "Membership", "travel"),
    newCategory("travel-other", "Other", "travel"),

    newCategory("healthcare", "Health Care", null, false),
    newCategory("healthcare-dental", "Dental", "healthcare"),
    newCategory("healthcare-eyecare", "Eyecare", "healthcare"),
    newCategory("healthcare-hospital", "Hospital", "healthcare"),
    newCategory("healthcare-prescription", "Prescription", "healthcare"),
    newCategory("healthcare-petcare", "Pet Care", "healthcare"),
    newCategory("healthcare-other", "Other", "healthcare"),

    newCategory(
      "income-interest",
      "Interest Income",
      null,
      true,
      categoryTypes.INCOME
    ),
    newCategory("income-salary", "Salary", null, true, categoryTypes.INCOME),
    newCategory(
      "income-salaryspouse",
      "Salary (Spouse)",
      null,
      true,
      categoryTypes.INCOME
    ),
    newCategory("income-rewards", "Rewards", null, true, categoryTypes.INCOME),
    newCategory(
      "income-other",
      "Other Income",
      null,
      true,
      categoryTypes.INCOME
    ),

    newCategory(
      "internaltransfer",
      "Account Transfer",
      null,
      true,
      categoryTypes.TRANSFER
    )
  ];
};

export default async db => {
  const promises = categorySeeds().map(async doc => {
    try {
      try {
        let existingDoc = await db.get(doc._id);
        doc._rev = existingDoc._rev;
      } catch (error) {
        if (error.status !== 404) {
          throw error;
        }
      }
      const response = await db.put(doc);
      return await db.get(response.id);
    } catch (error) {
      return { doc: doc, error };
    }
  });
  await Promise.all(promises);
};
