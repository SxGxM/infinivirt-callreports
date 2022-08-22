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

    return {status: status, total_Calls: kindOfTraffic.length, sucess_calls: calcSucessCalls(kindOfTraffic), fail_calls: kindOfTraffic.length-calcSucessCalls(kindOfTraffic), average_calls_duration: calcAvgCalls(kindOfTraffic), result: kindOfTraffic}
}

async function ReporteLlamadasCliente(client){
    
    const array = await Converter()
    let status = 200
    let clientFilter = null
    try{
    clientFilter = array.filter((register) => removeAccents(register.Nombre_de_cliente.toLowerCase().replace(" ","")) === removeAccents(client.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !clientFilter ? 400 : 200
    
    return {status: status, total_Calls: clientFilter.length, sucess_calls: calcSucessCalls(clientFilter), fail_calls: clientFilter.length-calcSucessCalls(clientFilter), average_calls_duration: calcAvgCalls(clientFilter), result: clientFilter}
}

async function ReporteLlamadasRepVent(salesRep){
    
    const array = await Converter()
    let status = 200
    let salesRepFilter = null
    try{
        salesRepFilter = array.filter((register) => removeAccents(register.Representante_de_Ventas.toLowerCase().replace(" ","")) === removeAccents(salesRep.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !salesRepFilter ? 400 : 200
    
    return {status: status, total_Calls: salesRepFilter.length, sucess_calls: calcSucessCalls(salesRepFilter), fail_calls: salesRepFilter.length-calcSucessCalls(salesRepFilter), average_calls_duration: calcAvgCalls(salesRepFilter), result: salesRepFilter}
}

async function ReporteLlamadasPais(country){
    
    const array = await Converter()
    let status = 200
    let countryFilter = null
    try{
        countryFilter = array.filter((register) => removeAccents(register.Pais.toLowerCase().replace(" ","")) === removeAccents(country.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !countryFilter ? 400 : 200
    
    return {status: status, total_Calls: countryFilter.length, sucess_calls: calcSucessCalls(countryFilter), fail_calls: countryFilter.length-calcSucessCalls(countryFilter), average_calls_duration: calcAvgCalls(countryFilter), result: countryFilter}
}

async function ReporteLlamadasTipoCl(typeCl){
    
    const array = await Converter()
    let status = 200
    let typeClFilter = null
    try{
        typeClFilter = array.filter((register) => removeAccents(register.Tipo_de_cliente.toLowerCase().replace(" ","")) === removeAccents(typeCl.toLowerCase().replace(" ","")))
    }catch(exception){
        status = 500
    }
    status = !typeClFilter ? 400 : 200
    
    return {status: status, total_Calls: typeClFilter.length, sucess_calls: calcSucessCalls(typeClFilter), fail_calls: typeClFilter.length-calcSucessCalls(typeClFilter), average_calls_duration: calcAvgCalls(typeClFilter), result: typeClFilter}
}

function calcSucessCalls(report){
    var total = 0
    for(var i = 0; i < report.length; i++){
        if(report[i].Segundos >= 60){
            total++
        }
    }
    return total
}

function calcAvgCalls(report){
    
    var add = 0
    for(var i = 0; i < report.length; i++){
        add = add + parseInt(report[i].Segundos)
        }
    return add/(report.length)
}
module.exports = {ReporteLlamadasTrafico, ReporteLlamadasCliente, ReporteLlamadasRepVent, ReporteLlamadasPais, ReporteLlamadasTipoCl}