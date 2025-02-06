// next-auth.d.ts
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string;
    accessToken?: string;
  }
}

export {};
