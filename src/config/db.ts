import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        const mongoURI: string = process.env.MONGO_URI ?? "";
       

    if (!mongoURI) {
      console.error("La variable de entorno MONGO_URI no está definida.");
      process.exit(1);
    }

    const connection= await mongoose.connect(mongoURI);
    const url =  `${connection.connection.host}:${connection.connection.port}`
    console.log(`MongoDB conectado en: ${url}`)

    }catch (error){
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}
export default connectDB