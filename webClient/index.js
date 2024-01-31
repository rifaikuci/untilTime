// AxiosClient.js

import axios from 'axios';
import { getDeviceInfo } from "../util/deviceInfo";

const createWebClient = async () => {
  try {
    const deviceInfo = await getDeviceInfo();


    const WebClient = axios.create({
      baseURL: 'http://localhost/rifaikuci.com/untilTime/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return WebClient;
  } catch (error) {
    console.error('Error getting device info:', error);
    throw error;
  }
};

export default createWebClient;
