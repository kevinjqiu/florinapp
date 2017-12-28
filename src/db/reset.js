import db from "./index";

export default () => async () => {
  const allDocs = await db.allDocs();                                                                                                                                                         
  const promises = allDocs.rows
    .filter(row => !(row.id.startsWith("_design/")))
    .map(async row => {
      await db.remove(row.id, row.value.rev);
    });
  await Promise.all(promises);
};