# Share Panda - File Sharing Platform

Share Panda is a secure and user-friendly file-sharing platform that allows you to upload files, share short URLs with friends, protect them with passwords, or send them directly via email. Built using modern technologies like [Clerk](https://clerk.dev/), [Supabase](https://supabase.com/), [Next.js](https://nextjs.org/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **File Upload**: Upload files securely and efficiently.
- **Short URL Sharing**: Generate a short URL for your uploaded files for easy sharing.
- **Password Protection**: Protect shared files with a password to ensure secure access.
- **Direct Email Sharing**: Send files directly to recipients via email.
- **User Authentication**: Seamless authentication and user management with Clerk.
- **Scalable Backend**: Powered by Supabase for robust and scalable backend services.
- **Modern UI**: Built with Next.js and styled using Tailwind CSS for a sleek and responsive design.

## Getting Started

### Development Server

To start the development server, run one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Editing the Application

You can begin editing the application by modifying the `app/page.js` file. Any changes made will automatically update in the browser.

## Environment Setup

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Replace the placeholders with your actual API keys and configuration values.

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/RahulJha93/file-share.git]
   cd file-share
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
yarn install
   ```

3. Set up environment variables as described above.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Documentation

To learn more about the technologies used in this project, refer to the following resources:

- [Next.js Documentation](https://nextjs.org/docs): Comprehensive guide on features, APIs, and best practices.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): Learn how to style your application.
- [Clerk Documentation](https://clerk.dev/docs): Guide to implementing authentication.
- [Supabase Documentation](https://supabase.com/docs): Learn about backend services and database integration.

## Deployment

Deploy your application using the [Vercel Platform](https://vercel.com/) for an optimized and scalable hosting solution.

For more information, visit the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions and feedback are welcome! Check out the [GitHub repository](https://github.com/your-username/share-panda) to report issues, suggest improvements, or contribute to the project.

---

Happy sharing with Share Panda!

