import NextAuth, { DefaultUser } from 'next-auth';
import { User as NextAuthUser } from 'next-auth';

declare module 'next-auth' {
  interface User {
    githubAccountName?: string;
    githubId?: number;
  }
  interface Session {
    user: {
      githubAccountName?: string;
      githubId?: number;
    } & DefaultUser['user'];
  }
}
