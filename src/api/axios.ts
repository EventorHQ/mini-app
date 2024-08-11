import { BASE_URL } from "@/config/config";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";

const { initDataRaw } = retrieveLaunchParams();

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `tma ${initDataRaw}`,
  },
});

export default instance;
