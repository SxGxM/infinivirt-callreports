 async function Converter(){
    const csvFilePath='uploads/file.csv'
    const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    })
     
    // Async / await usage
    const jsonArray=await csv().fromFile(csvFilePath);
    return jsonArray;
}

module.exports = {Converter}


