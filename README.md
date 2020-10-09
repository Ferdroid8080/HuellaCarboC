# carbon-footprint app (crbnfp)

### server api
Endpoints necesarios consumibles para registrar los viajes realizados de los trabajadores

### Instalacion y uso
Entrar a la carpeta `server` e instalar las dependencias especificadas en el `package.json`
```
$ npm install
```
Una vez instalada las dependencias, basta con ejecutar la siguiente instruccion para arrancar el servidor
```
$ npm start 
```
> Cabe resaltar, que la base de datos usada en esta api es **mongoDB** en la version 4.4 preferiblemente, el cual se puede descargar de [aqui](https://docs.mongodb.com/manual/installation/)

### Endpoints disponibles
Es posible consumir los siguientes endpoints desde postman o cualquier app:
| Metodo | URI | | Parameters |
|-	|-	|-	|-	|
| POST | /travels/create |  | startPoint:String, finalPoint:String, vehicleLabel:String, kilometers:Number, roundTrip:Boolean, workers:[firstName:String, lastName:String]
|  GET	| /travels |  	|  	|
| POST	| /vehicles/create |  	| name:String, emitfactor:String |
| GET	| /vehicles |  	|  |

<br>

### client
El cliente que consume la anterior api, está desarrollada usando el siguiente stack
    > React
    > Redux
    > React Router
Y esta ubicada en la carpeta `app`, que, de igual manera debes instalar las dependencias relacionadas
```
$ npm install 
```
Recuerda cambiar la direccion url del endpoint que esta configurada en la variable `REACT_APP_API_BASEURL` del archivo
`.env-example` por la direccion del servidor en donde hayas instalado la api y dicho archivo debe ser renombrado a `.env`

Para ejecutar el cliente, ejecuta
```
$ npm start 
```
Si quieres generar los estaticos del cliente para desplegar en algun hosting, debes ejecutar lo siguiente
```
$ npm run build
```
Y los archivos generados se encontrarán en la carpeta `build`
