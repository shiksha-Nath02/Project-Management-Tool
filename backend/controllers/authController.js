const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.Signup = async function (req, res) {
    try {
        const { username, email, password} = req.body;
        
        // // Input validation
        // if (!username || !email || !password) {
        //     return res.status(400).json({ message: "All fields are required" });
        //    }

        //   Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        const hashed = await bcrypt.hash(password, 12); //encryption

        //add data to data base
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashed,
            }
        });

        //add this data to token
        const token = jwt.sign(
            { 
                userId: newUser.id,
                role: newUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,      //makes cookie inaccessible to JS on client side
            secure: process.env.NODE_ENV === 'production',   //sends cookie only over https 
            sameSite: "lax",
            maxAge: 86400000,
        })

        //return user information
        const user = await prisma.user.findUnique({
            where: { id: newUser.id },
            select: { id: true, username: true, email: true,role:true }
        });

        console.log(user);
        res.status(201).json({ user });

    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Signup Failed", error });
    }

    // console.log({ username, email, password });
}

module.exports.Login = async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return res.status(404).json({ error: "User not Found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { 
                userId: user.id ,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie('token', token, {
            httpOnly: true,      //makes cookie inaccessible to JS on client side
            secure: process.env.NODE_ENV === 'production',   //sends cookie only over https 
            sameSite: "lax",
            maxAge: 86400000,
        })

        res.json({ user: { id: user.id, username: user.username, email ,role:user.role} });

    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Login Failed" });
    }
}

