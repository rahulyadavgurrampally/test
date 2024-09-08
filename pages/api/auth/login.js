import { connectToDataBase } from '../../../db/database';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            await connectToDataBase();
            const { email, password } = req.body;

            // Find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            // Compare the provided password with the stored hash
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ error: "Invalid email or password." });
            }

            // If authentication is successful, return a success response
            res.status(200).json({ message: "Login successful!", role: user.role, employeeID: user.employeeID, managerCode: user.managerCode });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "An error occurred during login." });
        }
    } else {
        res.status(405).json({ error: "Only POST requests are allowed." });
    }
};
