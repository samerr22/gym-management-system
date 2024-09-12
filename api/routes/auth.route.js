import express from "express";
import {  signgin,   signup,  singOut, ssigngin, ssignup } from "../controllers/auth.controller.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.post("/signout", singOut);
route.post("/ssignup", ssignup);
route.post("/ssignin", ssigngin);



export default route;
