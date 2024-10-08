import { POST } from '@/app/api/auth/[...nextauth]/route';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ClIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.access_token) {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${account.access_token}`,
          },
        });
        const userData = await response.json();
        user.githubAccountName = userData.login;
        user.githubId = userData.id;

        // updating the database
        console.log(user);
        const res = await fetch('http://localhost:8000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        console.log(data);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // here user is undefined after the sign in process(basically after first req)
        token.githubAccountName = user.githubAccountName;
        token.githubId = user.githubId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.githubAccountName = token.githubAccountName;
        session.user.githubId = token.githubId;
      }
      return session;
    },
  },
};
