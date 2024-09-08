import mongoose from 'mongoose';
import { comment } from 'postcss';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  name : {type: String},
  employeeID : {type: String},
  managerCode : {type: String},
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
