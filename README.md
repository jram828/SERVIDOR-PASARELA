El servidor esta configurado con https, para desarrollo local en el siguiente link se da una explicacion de como instalar un certificado local de prueba.
Para ejecutarlo localmentre se deben generar los certificados.

https://hive.blog/hive-193212/@jfdesousa7/usando-https-localmente-con-node-js

En el archivo .env se almacena el token de mercadopago.

Esta configurado en el puerto 3000

Para generar la preferencia se usa la ruta "/create_preference

Una vez desplegado de se puede configurar webhook para tener una url publica donde se recibira la notificacion de mercadopago.

En  /mercadoPago/client/src/components/Product.jsx hay un ejemplo de un componente que hace uso del endpoint
