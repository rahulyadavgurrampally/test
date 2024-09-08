import { connectToDataBase } from '../../../db/database';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            await connectToDataBase();
            const { email, password, role, name, employeeID, managerCode } = req.body;
            
            // Hash the password before saving the user
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

            const newUser = new User({
                email,
                password: hashedPassword,
                role,
                name,
                employeeID,
                managerCode,
            });

            const result = await newUser.save();

            // Respond with a success message
            res.status(200).json({ message: "Registration successful!", userId: result._id });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "An error occurred during registration." });
        }
    } else {
        res.status(405).json({ error: "Only POST requests are allowed." });
    }
};
