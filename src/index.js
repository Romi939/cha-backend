import dns from "node:dns";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

// Use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MONGODB connection failed:", error);
});