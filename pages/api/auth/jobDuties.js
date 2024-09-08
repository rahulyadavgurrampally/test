import { use } from "react";
import { connectToDataBase } from "../../../db/database";
import JobDuty from "../../../models/jobDuty";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { employeeId } = req.query;

    try {
      await connectToDataBase();

      const user = await User.findOne({ employeeID: employeeId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const jobDuties = await JobDuty.find({
        employee_id: user._id,
        Submit: "No",
      });

      console.log("jobDuties:", jobDuties);

      res.status(200).json({ jobDuties }); // Return an empty array if no job duties are found
    } catch (error) {
      console.error("Error fetching job duties:", error);
      res.status(500).json({ error: "Failed to fetch job duties" });
    }
  }

  if (req.method === "POST") {
    try {
      await connectToDataBase();
      const jobDuties = req.body;

      // Log the jobDuties data to verify it contains all fields
      console.log("jobDuties before insertion:", jobDuties);

      jobDuties.forEach((jobDuty) => {
        jobDuty.Submit = jobDuty.Submit || "No";
        jobDuty.comments = jobDuty.comments || "";
        jobDuty.Date = jobDuty.Date || new Date(); // Ensure Date is set
      });

      console.log("jobDuties after defaults:", jobDuties);

      const savedDuties = await JobDuty.insertMany(jobDuties);

      res.status(200).json({ savedDuties });
    } catch (error) {
      console.error("Error saving job duties:", error);
      res.status(500).json({ error: "Failed to save job duties" });
    }
  }

  if (req.method === "PUT") {
    const { employee_id, comments } = req.body;
    console.log("employee_id:", employee_id);
    try {
      await connectToDataBase();
      // Find the user based on employeeID
      const user = await User.findOne({ employeeID: employee_id });

      // Find the JobDuty document based on the user's _id
      const jobDuty = await JobDuty.findOneAndUpdate(
        { employee_id: user._id }, // Find the document
        {
          $set: {
            Submit: "Yes", // Update the Submit field
            comments: comments, // Set the comments field
          },
        },
        { new: true } // Return the updated document
      );

      res
        .status(200)
        .json({ message: "Job duties updated successfully", jobDuty });
    } catch (error) {
      console.error("Error updating job duties:", error);
      res.status(500).json({ error: "Failed to update job duties" });
    }
  }
}
