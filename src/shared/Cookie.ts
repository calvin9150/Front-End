const getCookie = (name: string): string | undefined => {
  let value = "; " + document.cookie;
  let parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
};

const setCookie = (name: string, value: string, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name: string) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie, getCookie };
