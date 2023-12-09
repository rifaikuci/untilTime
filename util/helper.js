

export const timeConvertSecond = (timerString) => {

  const arrayTimer = timerString.split(":");
  const timerHour = parseInt(arrayTimer[0])* 60 * 60 +   parseInt(arrayTimer[1]) * 60+ parseInt(arrayTimer[2]);


  return  timerHour;
}


export const showTimer = (totalSeconds) => {

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTimer = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formattedTimer;
}
