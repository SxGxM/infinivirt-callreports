const express = require("express");
const app = express();
const bodyParser= require('body-parser')
const multer = require('multer');
const { ReporteLlamadasTrafico, ReporteLlamadasCliente} = require("../services/Reports");

  var storage = multer.diskStorage({
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

  app.get('/CRFKindOfTraffic', async function (req, res) {
    const respuesta = await ReporteLlamadasTrafico(req.query.kind)
    res.status(respuesta.status)
    res.send(respuesta.result);
  });

  app.get('/CRFClient', async function (req, res) {
    const respuesta = await ReporteLlamadasCliente(req.query.clientName)
    res.status(respuesta.status)
    res.send({response:respuesta});
  });

  app.get('/api', async function (req, res) {
    const respuesta = await ReporteLlamadas()
    res.send(respuesta);
  });

  app.get('/api', async function (req, res) {
    const respuesta = await ReporteLlamadas()
    res.send(respuesta);
  });

  app.get('/api', async function (req, res) {
    const respuesta = await ReporteLlamadas()
    res.send(respuesta);
  });

  app.listen(3000, () => {
   console.log("El servidor está inicializado en el puerto 3000");
  });