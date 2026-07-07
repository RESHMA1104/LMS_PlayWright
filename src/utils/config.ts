import dotenv from "dotenv";

dotenv.config({
    path: "env/qa.env"
});

console.log("BASE URL:", process.env.BASE_URL);

export const config = {
    baseUrl: process.env.BASE_URL!
};