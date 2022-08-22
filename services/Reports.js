const { removeAccents } = require("../utils/converters")
const { Converter } = require("./ScvToJson")

async function ReporteLlamadasTrafico(kind){
    const array = await Converter()
    let status = 200
    let kindOfTraffic = null
    try{
    kindOfTraffic = array.filter((register) =>  removeAccents(register.Tipo_de_trafico.toLowerCase().replace(" ","")) === removeAccents(kind.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !kindOfTraffic ? 400 : 200 //operación ternaria

    return {status: status, result: kindOfTraffic}
}
async function ReporteLlamadasCliente(client){
    console.log({client})
    const array = await Converter()
    let status = 200
    let clientFilter = null
    try{
    clientFilter = array.filter((register) => removeAccents(register.Nombre_de_cliente.toLowerCase().replace(" ","")) === removeAccents(client.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !clientFilter ? 400 : 200

    return {status: status, result: clientFilter}
}

module.exports = {ReporteLlamadasTrafico, ReporteLlamadasCliente}