const db = require("../config/database");

const studentdashboardController = {
    getProfile: (req, res) => {
        const userId = req.userId;

        const query = `
    SELECT s.FullName, st.Course, st.CourseFee, st.DiscountAppiled, st.TotalFee, st.TotalDue
    FROM student_login s 
    JOIN student st ON s.can_id = st.studentid 
    WHERE s.id = ?
`;


        db.query(query, [userId], (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            if (results.length === 0) return res.status(404).json({ message: "User not found" });

            const { FullName, Course, CourseFee, DiscountAppiled, TotalFee, TotalDue } = results[0];
            res.json({ FullName, Course, CourseFee, DiscountAppiled, TotalFee, TotalDue });
        });
    },


};
module.exports = studentdashboardController;