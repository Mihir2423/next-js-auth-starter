
# NextAuth GitHub Template

This is a GitHub template project using the latest version of NextAuth.js. It implements the following authentication methods:

- Google Sign-in
- Magic Link Sign-in
- Sign-in with Email
- Forgot Password
- Reset Password

This template provides a quick and easy way to get started with authentication in your Next.js projects.

---

## 🚀 Quick Start

To get the project running locally, follow these steps:

1. Install dependencies:
   ```bash
   pnpm i
   ```

2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```

---

## 📁 Project Structure

The project follows a structured approach with the latest Next.js layout:

- **data-access/**: This folder contains all files interacting with the database. It includes Prisma models and database operations.
  
- **use-cases/**: This folder contains logic implementations for different functionalities. Business logic is separated from data access to ensure modularity.
  
- **emails/**: This folder contains templates for sending emails, such as reset password emails and magic link emails.

The rest of the files follow the latest Next.js structure, leveraging App Router for an optimized developer experience.

---

## 🖼️ Screenshots

<table>
  <tr>
    <td><img width="600" alt="Screenshot 2024-09-15 at 2 32 19 PM" src="https://github.com/user-attachments/assets/34d91483-e1ad-47b3-91d2-cf0093ac22aa"></td>
    <td><img width="600" alt="Screenshot 2024-09-15 at 2 32 35 PM" src="https://github.com/user-attachments/assets/b830cb18-1070-4ce2-bb09-1f2727c84f38"></td>
  </tr>
  <tr>
    <td><img width="600" alt="Screenshot 2024-09-15 at 2 32 44 PM" src="https://github.com/user-attachments/assets/41b98e70-79d0-4e85-b96e-acf3fbf7b2e5"></td>
    <td><img width="600" alt="Screenshot 2024-09-15 at 2 32 54 PM" src="https://github.com/user-attachments/assets/3b29ecf5-7aa7-47f4-a0fa-45e140b04581"></td>
  </tr>
</table>




---

## 🛠️ Tech Stack

- **Next.js**
- **NextAuth.js**
- **Prisma**
- **PNPM**

Feel free to modify this template according to your project's needs. Contributions and suggestions are always welcome!
