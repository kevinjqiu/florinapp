export const setupIndex = async db => {
  const indexes = [
    { index: { fields: ["metadata.type"] } }
  ];

  await Promise.all(indexes.map(async index => {
    await db.createIndex(index);
    console.log(`Created index ${JSON.stringify(index)}`);
  }))
};

export const setupViews = async db => {
  const emit = null;
  let ddoc = null;
  try {
    ddoc = await db.get("_design/transactions");
  } catch (error) {
    ddoc = {};
  }
  const transactionByDate = Object.assign(ddoc, {
    _id: "_design/transactions",
    views: {
      byDate: {
        map: function(doc) {
          if (doc.metadata && doc.metadata.type === "Transaction") {
            emit(doc.date, null);
          }
        }.toString()
      }
    }
  });
  await db.put(transactionByDate);
};
