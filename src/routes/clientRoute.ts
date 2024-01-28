import express from 'express'
import {getAllClients,getClient,addClient,updateClient,deletClient} from '../controllers/clientController'
const router = express.Router()
router.get('/all-clients',getAllClients)
router.get('/client/:id',getClient)
router.post('/add-client',addClient)
router.put('/update-client/:id',updateClient)
router.delete('/delete-client/:id',deletClient)

export default router 