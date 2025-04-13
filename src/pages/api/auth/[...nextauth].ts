import NextAuth from "next-auth";
import type { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "@apis/auth";
import axiosInstance from "@apis/instance";
import { decodeJwt } from "@utils/common";

const REFRESH_THRESHOLD = 5 * 60 * 60; // 5 min

type JwtParams = {
  token: JWT;
  user?: User | AdapterUser;
  session?: any;
  trigger?: "signIn" | "signUp" | "update";
};

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      //@ts-ignore
      async authorize(credentials: Record<"email" | "password", string>) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("이메일과 비밀번호를 입력해 주세요.");
        }

        const result = await authenticate(email, password);
        if (!result.success) {
          throw new Error(
            result.errors || "요청이 실패했습니다. 나중에 다시 시도하세요.",
          );
        }

        return { ...result.data };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session, trigger }: JwtParams): Promise<JWT> {
      const _now = Math.round(Date.now() / 1000);
      if (session !== undefined) {
        if (trigger === "update" && session.hasRefreshedToken !== undefined) {
          token.hasRefreshedToken = session.hasRefreshedToken;
        }
      }
      //first time login
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.hasRefreshedToken = true;

        return token;
      }
      //reset refresh token first time
      if (!token.hasRefreshedToken) {
        const newToken = await refreshRefreshToken(token);
        return newToken;
      }
      //access token almost expired
      if (
        token.accessToken &&
        decodeJwt(token.accessToken).exp - _now < REFRESH_THRESHOLD
      ) {
        const newToken = await refreshAccessToken(token);
        return newToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.accessToken = token.accessToken;
        if (token.error) {
          session.error = "RefreshAccessTokenError";
        }
        if (token.refreshToken) {
          session.expires = decodeJwt(token.refreshToken).exp;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

async function authenticate(email: string, password: string) {
  try {
    const { data } = await LOGIN({
      email,
      password,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    //implement api call to get new access token
    const response = await axiosInstance.post(
      `/auth/refresh-access-token?refreshToken=${token.refreshToken}`,
    );
    return {
      ...token,
      accessToken: response.data.data.accessToken,
    };
  } catch (e) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function refreshRefreshToken(token: JWT): Promise<JWT> {
  try {
    const response = await axiosInstance.post(
      `/auth/generate-refresh-token?refreshToken=${token.refreshToken}`,
    );
    return {
      ...token,
      refreshToken: response.data.data,
      hasRefreshedToken: true,
    };
  } catch (e) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
