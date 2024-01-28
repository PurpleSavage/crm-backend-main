import { Request,Response } from "express"
import ClientModel from "../models/Client"
import { IClient } from "../interfaces/clientInterface"
const getAllClients =async(_req:Request,res:Response)=>{
    try {
        const allClients:IClient[]= await ClientModel.find().select('-createdAt -updatedAt -__v')
        res.status(200).json(allClients)
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const getClient =async(req:Request,res:Response)=>{
    const {id}=req.params

   try {
        const client= await ClientModel.findById(id).select('-createdAt -updatedAt -__v')
        if(!client){
            const error = new Error("No encontrado")
            res.status(404).json({msg: error.message})
            return
        }
        res.json(client)
   } catch (error) {
        console.log(error)
        res.status(500).json({error:'Error interno del servidor'})
   }

}
const addClient =async(req:Request,res:Response)=>{
    const {nombre,telefono,email,empresa}=req.body
    if([nombre,telefono,email,empresa].includes("")){
        res.status(404).json({msg:"los campos son requeridos"})
        return
    }
    const newUser = new ClientModel(req.body)
    try {
        const userSaved = await newUser.save()
        res.status(200).json(userSaved )  
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Error interno del servidor'})
    }
}
const updateClient =async(req:Request,res:Response)=>{
    const {id}=req.params
    const {nombre,telefono,email,empresa}=req.body
    const user = await ClientModel.findById(id)
    if([nombre,telefono,email,empresa].includes("")){
        res.status(404).json({msg:"los campos son requeridos"})
        return
    }
    if(!user){
        const error = new Error("No encontrado")
        res.status(404).json({msg: error.message})
        return 
    }
    user.nombre=nombre||user.nombre
    user.telefono=telefono||user.telefono
    user.email=email||user.email
    user.empresa=empresa || user.empresa
    
    try {
        const userSaved = await user.save()
        res.json(userSaved)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Error interno del servidor'})
    }
}
const deletClient =async(req:Request,res:Response)=>{
    const {id}=req.params
    const user = await ClientModel.findById(id)
    if(!user){
        const error = new Error("No encontrado")
        res.status(404).json({msg: error.message})
        return 
    }
    try {
        await user.deleteOne()
        res.status(200).json({msg:"elemento eliminado"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Error interno del servidor'})
    }
}


export {getAllClients,getClient,addClient,updateClient,deletClient} 