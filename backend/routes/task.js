const express = require("express");
const router = express.Router();
const taskCntrl=require("../controllers/taskController");
const auth=require("../middleware/user");

router.post("/getTaskCount",auth,taskCntrl.getTasksCount);
router.post("/getTask",auth,taskCntrl.getTasks);
router.put("/updateTask",taskCntrl.updateTasks);

module.exports=router;