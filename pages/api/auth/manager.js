import User from '../../../models/User';
import { connectToDataBase } from '../../../db/database';

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        await connectToDataBase();
  
        const { code } = req.query; // Access code directly from req.query
  
        if (!code) {
          return res.status(400).json({ error: 'Code query parameter is required' });
        }
  
        console.log("Manager profile code:", code);
  
        const profile = await User.findOne({ managerCode: code }); // Use findOne to get a single document
  
        if (!profile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
  
        console.log('profile:', profile);
        
        res.status(200).json({ profile }); // Return the single profile object
      } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  