import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly',
                        // Add other scopes if necessary
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token to the token right after signin

            if (account) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.id_token = token.id_token;
            return session;
        },
    },
    debug: true,
});

export { handler as GET, handler as POST };
