import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

let deviceInfo = null;

export const getDeviceInfo = async () => {
  let deviceToken = null
  try {
    deviceToken = await DeviceInfo.getDeviceToken();
  }
  catch (e) { }

  const [deviceType, appName, appIdentifier, deviceManufacturer, deviceBrand, model, deviceID, systemName, systemVersion, deviceName, userAgent, version, ip, macAddress] =
    await Promise.all(
      [DeviceInfo.getDeviceType(), DeviceInfo.getApplicationName(),
    DeviceInfo.getBundleId(), DeviceInfo.getManufacturer(), DeviceInfo.getDeviceId(), DeviceInfo.getModel(),
        getUniqueId(),
    DeviceInfo.getSystemName(), DeviceInfo.getSystemVersion(), DeviceInfo.getDeviceName(),
    DeviceInfo.getUserAgent(), DeviceInfo.getVersion(), DeviceInfo.getMacAddress()]);
  const uniqueId = await DeviceInfo.getUniqueId();

  deviceInfo = {
    deviceToken: deviceToken,
    deviceType: deviceType,
    runningDeviceType: deviceType,
    appName: appName,
    appIdentifier: appIdentifier,
    appVersion: version,
    pushType: "APN",
    deviceManufacturer: deviceManufacturer,
    deviceBrand: deviceBrand,
    model: model,
    //"deviceModel": "11",
    deviceID: deviceID,
    systemName: systemName,
    systemVersion: systemVersion,
    bundleID: appIdentifier,
    deviceName: deviceName,
    userAgent: userAgent,
    version: version,
    deviceLocale: "",
    deviceCountry: "",
    ip: ip,
    macAddress: macAddress
  };
  return deviceInfo;
}

export const getUniqueId = async () => {
  return await DeviceInfo.getUniqueId();
}

export const getDeviceManufacturer = async () => {
  return  await DeviceInfo.getManufacturer();
}

export const getDInfo = () => {
  return deviceInfo;
}

export const getAppVersion = () => {
  return DeviceInfo.getVersion();
}
