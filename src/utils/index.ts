import cookie from "cookie"

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const toCabedCase = (text: string): string =>
  text.toLowerCase().split(" ").join("-")
