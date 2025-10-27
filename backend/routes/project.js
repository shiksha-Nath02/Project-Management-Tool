const express = require("express");
const router = express.Router();
const auth=require("../middleware/user");
const projectCtrl=require("../controllers/projectController");

router.get("/",auth,projectCtrl.getAllProjects);
router.post("/create",auth,projectCtrl.createProject);
router.delete("/:id",auth,projectCtrl.deleteProject);

module.exports=router;