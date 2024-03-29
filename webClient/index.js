// AxiosClient.js

import axios from 'axios';
import { getDeviceInfo } from "../util/deviceInfo";

const createWebClient = async () => {
  try {
    const deviceInfo = await getDeviceInfo();


    const WebClient = axios.create({
      baseURL: 'https://rifaikuci.com/untilTime/',
    //  baseURL: 'http://192.168.1.43/rifaikuci.com/untilTime/',
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
