import axios from "axios";

export default axios.create({
  baseURL:
    "https://promoter-backend-v2jk.onrender.com/api", // Use the backend URL from the .env file
});