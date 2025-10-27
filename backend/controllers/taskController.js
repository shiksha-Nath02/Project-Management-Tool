const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

/*
model Column {
  id        Int @id @default (autoincrement())
  projectId Int
  name      String

  project   Project @relation(fields: [projectId], references: [id])
  tasks     Task[]
}
*/


/*
model Task {
  id          Int @id @default (autoincrement())
  columnId    Int
  title       String
  description String
  assigneeId  Int

  assignee    User @relation(fields: [assigneeId], references: [id])
  column      Column @relation(fields: [columnId], references: [id])
}
*/
module.exports.getTasksCount = async function (req, res) {
    const role = req.role;
    if (role !== "ADMIN") return res.status(401).json({ msg: "not enough rights" });

    const { projectId } = req.body;

    try {
        // 1️⃣ Fetch all task columns for this project
        const columns = await prisma.column.findMany({
            where: { projectId: Number(projectId) },
            select: { id: true, name: true }
        });

        if (columns.length === 0) {
            return res.status(200).json([]);
        }

        const columnMap = {};
        columns.forEach(c => (columnMap[c.id] = c.name));

        // 2️⃣ Group tasks by assigneeId + columnId
        const grouped = await prisma.task.groupBy({
            by: ['assigneeId', 'columnId'],
            where: { columnId: { in: columns.map(c => c.id) } },
            _count: { id: true },
        });

        // 3️⃣ Collect all assigneeIds
        const assigneeIds = grouped
            .map(g => g.assigneeId)
            .filter(id => id !== null);

        // 4️⃣ Fetch usernames
        const users = await prisma.user.findMany({
            where: { id: { in: assigneeIds } },
            select: { id: true, username: true }
        });

        const userMap = {};
        users.forEach(u => (userMap[u.id] = u.username));

        // 5️⃣ Pivot results per user
        const resultMap = {};

        grouped.forEach(g => {
            const assigneeId = g.assigneeId;
            const username = assigneeId ? userMap[assigneeId] : "Unassigned";

            if (!resultMap[username]) {
                resultMap[username] = {
                    username,
                    todos: 0,
                    inProgress: 0,
                    done: 0
                };
            }

            const colName = columnMap[g.columnId];
            if (colName === "To Do") resultMap[username].todos = g._count.id;
            if (colName === "In Progress") resultMap[username].inProgress = g._count.id;
            if (colName === "Done") resultMap[username].done = g._count.id;
        });

        const finalResult = Object.values(resultMap);

        return res.json(finalResult);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Error in Fetching",
            error: err.message
        });
    }
}



module.exports.getTasks=async function(req,res){
    let id=(req.body.projectId);
    const {taskType}=req.body;
    const userId=Number(req.userId);
    const projectId=Number(id);


    console.log("inside get Tasks",{
        "userId": userId,
        "role":req.role,
        "projectId" : projectId,
        "taskType": taskType
    });

    try{
        const column = await prisma.column.findFirst({
            where:{projectId: projectId, name:taskType},
            select:{id:true}
        })

        if (!column) {
            console.log("no column found")
            return res.status(200).json([]);
        }

        const tasks=await prisma.task.findMany({
            where: {columnId:column.id , assigneeId:userId},
            select: {title: true, description:true},
        })

        if (tasks.length === 0) {
            return res.status(200).json([]);
        }

        res.json(tasks);

    }catch(err){

        res.status(404).json({
            msg :"Error in Fetching",
            error:err
        })
    }
}

module.exports.updateTasks=async function(req,res) {
    const projectId=Number(req.body.projectId);
    const {sourceCol,destCol,task}=req.body;

    const role = req.role;
    if (role != "MEMBER") return res.status(400).json({ msg: " cannot change not a member" });

    try{
        const sourceColId=await prisma.column.findFirst({      //return type object of findFirst  {id: 1}
            where :{projectId: projectId, name:sourceCol},
            select :{id:true}
        });
    
        const destColId = await prisma.column.findFirst({
            where: { projectId: projectId, name: destCol },
            select: { id: true }
        });

        await prisma.task.updateMany({
            where:{columnId:sourceColId.id ,title:task },
            data:{
                columnId:destColId.id
            }
        });

    }catch(err){
        res.status(404).json({
            msg:"Not able to Update",
            err
        })
    }
}
