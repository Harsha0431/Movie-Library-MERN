// Secure, HttpOnly, and SameSite
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Strict";
}

export function getCookie(name){
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (const element of ca) {
    let c = element;
    while (c.startsWith(" ")) c = c.substring(1, c.length);
    if (c.startsWith(nameEQ)) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name){
  document.cookie = name + "=; Max-Age=-99999999;";
}