import db from "./index";

export default () => async () => {
  const allDocs = await db.allDocs();                                                                                                                                                         
  allDocs.rows
    .filter(row => !(row.id.startsWith("_design/")))
    .forEach(async row => {
      await db.remove(row.id, row.value.rev);
    });
};