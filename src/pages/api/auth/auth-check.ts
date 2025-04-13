import { NextApiRequest, NextApiResponse } from "next";
import cookies from "next-cookies";
import jwt, { decode } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import serverInstance from "src/server-instance";

const AUTH_REJECT = {
  code: 401,
  message: "권한 없음",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, headers, body } = req;
  let allCookies = cookies({ req });
  const accessToken = allCookies["next-auth.session-token"];

  const newHeaders = {
    ...headers,
    cookie: Object.entries(allCookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "),
  };

  try {
    const { data, status } = await serverInstance({
      method,
      headers: newHeaders,
      url: headers.original as string,
      data: body,
    });
    return res.status(status).json(data);
  } catch (e) {
    const _error = e as any;
    console.log(e);
    if (_error.status === 401) {
      return res.redirect("/sign-in");
    }
    return res
      .status(_error?.response?.status || 400)
      .json(_error?.response?.data);
  }
}
