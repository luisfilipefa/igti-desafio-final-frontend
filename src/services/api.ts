import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001/api/transaction";

export const api = axios.create({ baseURL: API_URL });
