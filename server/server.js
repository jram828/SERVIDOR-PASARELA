
import  https from 'https';
import  fs from 'fs';
import cors from 'cors'
import { MercadoPagoConfig, Preference } from "mercadopago";
import  express from "express";

import  dotenv from "dotenv";
dotenv.config();

const client = new MercadoPagoConfig({accessToken: process.env.ACCESS_TOKEN || ""})

const options = {
  key: fs.readFileSync('./localhost-key.pem'), // Reemplaza con la ruta de tu llave generada
  cert: fs.readFileSync('./localhost.pem') // Reemplaza con la ruta de tu certificado generado
}


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  console.log('Estableciendo politica de referencia')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json());

app.post("/create_preference", async (req, res) => {
  console.log('Estoy en crear preferencia por https!!!')
  console.log('Mail del pagador...  ',req.body.payer)
  const producto = req.body;

  try {
  
// Crear un objeto de preferencia
let body = {
  items: [
        {

          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
          
        },
      ],
      payer: {
        email: req.body.payer
        //email: 'test_user_1490493949@testuser.com',
      },
      payment_methods: {
        // excluded_payment_types: [
        //   {
        //     id: 'ticket', // Excluir métodos de pago no deseados
        //   },
        // ],
        installments: 1,
      },
      back_urls: {
        success: "http://www.youtube.com/",
        failure: "http://www.youtube.com",
      },

      auto_return: "approved",
    }
    
    const preference= new Preference(client)
    const result = await preference.create({body});
    console.log(result)
    // {redirectUrl: preference.init_point}
    console.log('Esto se devuelve al front.......  ',result.sandbox_init_point)
    
    res.status(200).json({redirectUrl:result.sandbox_init_point});
   // res.status(200).json({id:result.id});
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

  
  
  
app.use((req, res, next) => {
  res.send('<h1>HTTPS Works!</h1>');
});

https.createServer(options, app).listen(port,() => {
  console.log('Server listening on port ' + port);
});







