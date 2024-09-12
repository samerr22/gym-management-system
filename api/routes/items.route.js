import  express  from "express";
import { Cartcrete, deleteItems, deleteItemss, getAllItems, getCartItem,Itcreate } from "../controllers/items.controller.js";

const router = express.Router();

router.post('/Icreate',Itcreate );
router.get('/IgetAll', getAllItems);
router.post('/Ccreate',Cartcrete );
router.get('/CgetAll/:CurrentuserId', getCartItem);
router.delete('/deletes/:itemsId',deleteItems);
router.delete('/deletesall/:CurrentuserId',deleteItemss);



export default router;