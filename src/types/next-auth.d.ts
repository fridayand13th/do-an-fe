import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    token?: string;
    hasRefreshedToken: boolean;
    error?: "RefreshAccessTokenError";
  }

  interface User {
    id?: string | number;
    username?: string;
    provider?: string;
    name?: string;
    email?: string;
    profileImage?: string;
    refreshToken?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
    iat?: number;
    jti?: string;
    hasRefreshedToken: boolean;
    error?: "RefreshAccessTokenError";
  }
}
