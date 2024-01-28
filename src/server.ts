import express from "express"
import dotenv from 'dotenv'
import cors,{ CorsOptions } from 'cors'
import clientRoute from './routes/clientRoute'
import connectDB from "./config/db"
const app = express()
dotenv.config()
dotenv.config()
connectDB()

const whitelist =[process.env.URL_FRONTEND]
const corsOptions:CorsOptions={
    origin:function(origin,callback){
        if(origin!==undefined && whitelist.includes(origin)){
            // puedede consultar la api
            callback(null,true)
        }else{
            // no esta permitido
            callback(new  Error("Error de Cors"))
        }
    }
    
}
app.use(cors(corsOptions))
app.use(express.json())
const PORT = process.env.PORT || 4000


//rutas
app.use('/api/clients',clientRoute)

app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})