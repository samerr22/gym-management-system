import  express  from "express";
import { Cartcrete, deleteItem, deleteItems, deleteItemss, getAllItems, getCartItem,Itcreate, updateItem } from "../controllers/items.controller.js";

const router = express.Router();

router.post('/Icreate',Itcreate );
router.get('/IgetAll', getAllItems);
router.put('/Update/:itemId', updateItem);
router.get('/delete/:ItemmId', deleteItem);
router.post('/Ccreate',Cartcrete );
router.get('/CgetAll/:CurrentuserId', getCartItem);
router.delete('/deletes/:itemsId',deleteItems);
router.delete('/deletesall/:CurrentuserId',deleteItemss);



export default router;