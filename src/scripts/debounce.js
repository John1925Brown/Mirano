export const debounce = (func, timeWait) => {
  let idTimeOut;

  return (...args) => {
    clearInterval(idTimeOut);
    idTimeOut = setTimeout(() => {
      func(...args);
    }, timeWait);
  };
};
