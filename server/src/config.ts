import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const MP_ACCESS_KEY = process.env.MP_ACCESS_KEY;
export const MP_API_BASE_URL = process.env.MP_API_BASE_URL;
