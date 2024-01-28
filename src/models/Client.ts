import mongoose ,{  Schema } from "mongoose"
import { IClient } from "../interfaces/clientInterface"
const postSchema = new Schema< IClient>({
    nombre:{type:String,require:true},
    telefono:{type:Number,require:true},
    email:{type:String,require:true},
    empresa:{type:String,require:true}
},{timestamps:true})


const ClientModel = mongoose.model< IClient>('Clients', postSchema,'Clients');

export default ClientModel; 