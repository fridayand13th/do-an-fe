import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  // make the request to authenticate the user
  const tokensResponse = await fetch(
    "http://localhost:3030/auth/local/signin",
    options,
  ).then((res) => res.json());

  if ("error" in tokensResponse) {
    // Bad request
    return NextResponse.json(tokensResponse, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = NextResponse.json(tokensResponse, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  // Save the tokens in the cookie response
  response.cookies.set("tokens", JSON.stringify(tokensResponse));

  return response;
}
