import { Router } from "express";
const router = Router();

//import all controllers
import * as controller from "../controllers/appController.js";

/** POST Methods */
router.route("/register").post(controller.register);
// router.route("/registerMail").post((req, res) => {
//   res.json("your mail has been registered");
// });
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(controller.login);

/**GET Methods */
router.route("/user/:username").get(controller.getUser);
router.route("/generatorOTP").get(controller.generatorOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

//PUT Methods
router.route("/updateuser").put(controller.updateUser);
router.route("/resetPassword").put(controller.resetPassword);

export default router;
