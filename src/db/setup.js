export const setupIndex = async db => {
  const indexes = [
    { index: { fields: ["date"] } },
    { index: { fields: ["categoryId", "metadata.type"] } },
    { index: { fields: ["accountId", "metadata.type"] } },
    { index: { fields: ["metadata.type"] } }
  ];

  await Promise.all(
    indexes.map(async index => {
      await db.createIndex(index);
      console.log(`Created index ${JSON.stringify(index)}`);
    })
  );
};

export const setupViews = async db => {
  const emit = null;
  let ddoc = null;
  try {
    ddoc = await db.get("_design/transactions");
  } catch (error) {
    ddoc = {};
  }
  const transactionsDdoc = Object.assign(ddoc, {
    _id: "_design/transactions",
    views: {
      byType: {
        map: function(doc) {
          if (doc.metadata && doc.metadata.type === "Transaction") {
            if (doc.categoryId !== "internaltransfer") {
              emit([doc.type, doc.date], parseFloat(doc.amount));
            }
          }
        }.toString(),
        reduce: "_sum"
      },
      byAmount: {
        map: function(doc) {
          if (doc.metadata && doc.metadata.type === "Transaction") {
            emit([doc.amount, doc.date], null);
          }
        }.toString()
      },
      byCategory: {
        map: function(doc) {
          if (doc.metadata && doc.metadata.type === "Transaction") {
            emit([doc.date, doc.categoryId], parseFloat(doc.amount));
          }
        }.toString(),
        reduce: function(key, values, rereduce) {
          var result = {}
          if (!rereduce) {
            for (var i=0; i<key.length; i++) {
              var categoryId = key[i][0][1];
              result[categoryId] = result[categoryId] || 0;
              result[categoryId] += values[i];
            }
            return result;
          }
          for (var j=0; i<values.length; j++) {
            for (var k in values[j]) {
              result[k] = result[k] || 0;
              result[k] += values[j][k];
            }
          }
          return result;
        }.toString()
      }
    }
  });
  await db.put(transactionsDdoc);
};
