import User from '../../../models/User';
import { connectToDataBase } from '../../../db/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDataBase();
      const employees = await User.find({ role: 'employee' });
      res.status(200).json({ employees });
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
