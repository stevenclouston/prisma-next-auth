# Passkeys with Authsignal and NextAuth.js

This example shows how to integrate Authsignal Passkeys with your Next.js application, using NextAuth.js. The application is a full-stack solution designed to provide a robust starting point for web applications that use Authsignal for Passkeys.

## Overview

This demo uses NextAuth's built in email magic link provider for account creation and email magic link login. Once a user is logged in, they can add a new Passkey to their account for sign in with Passkey.

### Installation
1. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn
    ```

2. **Environment Variables**

    Copy the `.env.example` file to a new file named `.env.local` and fill in your environment variables, including database URL and authentication providers details.

4. **Setup Prisma**

    - Initialize Prisma with your database:

      ```bash
      npx prisma init --datasource-provider <YOUR_DATABASE_PROVIDER>
      ```

    - Run the Prisma migration to update your database schema:

      ```bash
      npx prisma migrate dev
