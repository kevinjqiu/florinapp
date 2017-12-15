import FlorinBase from "./FlorinBase";
import { seed as seedCategories } from "./Category";

const SEEDERS = [seedCategories];

export const seed = (): Array<FlorinBase> => {
  let result: Array<FlorinBase> = [];
  SEEDERS.forEach(seeder => {
    result = result.concat(seeder());
  });
  return result;
};
