

export const timeConvertSecond = (timerString) => {

  const arrayTimer = timerString.split(":");
  const timerHour = parseInt(arrayTimer[0])* 60 * 60 +   parseInt(arrayTimer[1]) * 60+ parseInt(arrayTimer[2]);


  return  timerHour;
}
