import express from "express";
import { login,register,updateProfile,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
 const router = express.Router();


 router.route("/register").post(singleUpload,register);
 router.route("/login").post(login);
 router.route("/logout").get(logout);
 router.post("/profile/update", isAuthenticated,singleUpload, updateProfile);


// router.route("/profile/update").post(isAuthenticated,singleUpload,async(req,res) => {
//     console.log("Received file:", req.file);
//     if (!req.file) {
//               return res.status(400).json({ message: 'Missing required parameter - file' });
//             }
          
//          res.json({ success: true, message: 'Profile updated successfully', file: req.file });
//          updateProfile
          
// });
 

export default router;