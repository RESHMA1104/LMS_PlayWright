import dotenv from "dotenv";

dotenv.config({
    path: "env/qa.env"
});

console.log("BASE URL:", process.env.BASE_URL);

export const config = {
    baseUrl: process.env.BASE_URL!,
    addCourseStructureUrl: process.env.ADD_COURSE_STRUCTURE_URL!,
    courseName: process.env.COURSE_NAME!
};