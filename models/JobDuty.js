import mongoose from 'mongoose';

const JobDutySchema = new mongoose.Schema({
    duty: String,
    frequency: String,
    measurement: String,
    employee_id: String,
    Submit: String,
    comments: String,
    Date: Date
  });
  

const JobDuty = mongoose.models.JobDuty || mongoose.model('JobDuty', JobDutySchema);

export default JobDuty;
