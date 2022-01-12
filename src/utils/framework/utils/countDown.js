const setCountDown = (ck = () => {}, timeStart) =>{
  const countTime = () => {
    let day = 0, hour = '00', min = '00', seconds = '00';
    // 当前时间
    const now = new Date().getTime();
    // 截止时间
    const end = new Date(timeStart).getTime();
    const diffTime = end - now;
    if(diffTime >= 0) {
      // 天
      day = Math.floor(diffTime / 1000 / 60 / 60 / 24);
      // 时
      const h = Math.floor(diffTime / 1000 / 60 / 60 % 24);
      hour = h < 10 ? `0${h}` : h;
      // 分
      const m = Math.floor(diffTime / 1000 / 60 % 60);
      min = m < 10 ? `0${m}` : m;
      // 秒
      const s = Math.floor(diffTime / 1000 % 60);
      seconds = s < 10 ? `0${s}` : s;
      if(Number(hour) === 0 && Number(day) === 0 && Number(min) === 0 && Number(seconds) === 0) return { day, hour,  min, seconds };
      setTimeout(countTime, 1000);
    } else {
      day = 0;
      hour = '00';
      min = '00';
      seconds = '00';
    }
    return { day, hour,  min, seconds }
  }
  let x = countTime();
  ck(x);
}
export default setCountDown;
