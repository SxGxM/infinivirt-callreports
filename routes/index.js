const express = require("express");
const app = express();
const bodyParser= require('body-parser')
const multer = require('multer');
const { ReporteLlamadasTrafico, ReporteLlamadasCliente, ReporteLlamadasRepVent, ReporteLlamadasPais, ReporteLlamadasTipoCl} = require("../services/Reports");

  var storage = multer.diskStorage({    //Guardar archivo csv en el proyecto desde la api
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + ".csv")
    }
  })
  
  var upload = multer({ storage: storage })

  app.use(bodyParser.urlencoded({extended: true}))

  app.post('/api', upload.single('file'), function (req, res) {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
  });

  app.get('/CRFKindOfTraffic', async function (req, res) {  //Ruta para generar el reporte por tipo de tráfico
    const respuesta = await ReporteLlamadasTrafico(req.query.kind)
    res.status(respuesta.status)
    res.send({response:respuesta})
  });

  app.get('/CRFClient', async function (req, res) {   //Ruta para generar el reporte por cliente
    const respuesta = await ReporteLlamadasCliente(req.query.clientName)
    res.status(respuesta.status)
    res.send({response:respuesta})
  });

  app.get('/CRSalesRep', async function (req, res) {  //Ruta para generar el reporte por representante de ventas
    const respuesta = await ReporteLlamadasRepVent(req.query.salesName)
    res.status(respuesta.status)
    res.send({response:respuesta})
  });

  app.get('/CRCountry', async function (req, res) { //Ruta para generar el reporte por pais
    const respuesta = await ReporteLlamadasPais(req.query.country)
    res.status(respuesta.status)
    res.send({response:respuesta})
  });

  app.get('/CRClientType', async function (req, res) {
    const respuesta = await ReporteLlamadasTipoCl(req.query.typeCl)
    res.status(respuesta.status)
    res.send({response:respuesta})
  });

  app.listen(3000, () => {
   console.log("El servidor está inicializado en el puerto 3000");
  });