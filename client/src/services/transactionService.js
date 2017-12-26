// @flow
import PromiseFileReader from "promise-file-reader";
import Banking from "banking";

const parseOfx = (fileContent) => {
  return new Promise((resolve, reject) => {
    Banking.parse(fileContent, (res) => {
      resolve(res);
    });
  });
}

export const importAccountStatement = async (statementFile: File) => {
    const fileContent = await PromiseFileReader.readAsText(statementFile);

    const result = await parseOfx(fileContent);
    console.log(result);
}
//b.parseFile("/home/kevin/Downloads/Primary.QFX", (res)=>console.log(res.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST));