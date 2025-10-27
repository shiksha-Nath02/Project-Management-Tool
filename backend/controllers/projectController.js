const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.getAllProjects=async function (req,res){
        const userId=req.userId;

    
        const projectIds = await prisma.projectMember.findMany({
            where: {
                userId: userId
            },
            select: {
                projectId: true
            }
        })
        if (projectIds.length==0) res.status(200).json([])

        const ids = projectIds.map(p => p.projectId);

        // Fetch all projects in one query
        const projects = await prisma.project.findMany({
            where: { id: { in: ids } }
        });

        res.status(200).json(projects);
}

module.exports.createProject= async function(req,res){
    const userId = req.userId;
    const role=req.role;
    const {projectName}=req.body;

    if (role=="MEMBER") return res.status(404).json({
        msg:"not enough rights to create project"
    }) ;

    try{
        // const found=await prisma.project.findFirst({
        //     where: {
        //         name: projectName
        //     },
        //     select:{ id:true}
            
        // })

        // if (found) return res.status(400).json({
        //     msg:"project already exists"
        // });

        const project=await prisma.project.create({
            data:{
                name:projectName
            }
        })

        const member=await prisma.projectMember.create({
            data:{
                projectId: project.id,
                userId:userId,
            }
        })

        return res.status(200).json({ msg : "project added successfully"});

    }catch(err){

        res.status(404).json({
            msg:"cannot create a project",
            err
        });
    }
}

module.exports.deleteProject=async function(req,res){
    const id=Number(req.params.id);
    try {
        const deleteUser = await prisma.project.delete({
            where: {
                id: id
            },
        })
        res.json(deleteUser);

    } catch (err) {
        res.status(401).json({
            error: err
        })
    }
    
}