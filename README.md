# 🎓 SkillBridge - Online Tutoring Platform

A modern, full-featured online tutoring platform connecting students with qualified tutors. SkillBridge provides a seamless experience for learning, teaching, and managing educational services.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://skill-bridge-client-by-shijan.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)](https://www.typescriptlang.org/)

## 🌐 Live Demo

**Live URL:** [https://skill-bridge-client-by-shijan.netlify.app/](https://skill-bridge-client-by-shijan.netlify.app/)

### 🔑 Demo Credentials

Test the platform with these pre-configured accounts:

| Role        | Email                 | Password       |
| ----------- | --------------------- | -------------- |
| **Student** | `student@example.com` | `Password123@` |
| **Tutor**   | `tutor@example.com`   | `Password123@` |
| **Admin**   | `admin@example.com`   | `Password123@` |

> **Note:** All demo accounts share the same password: `Password123@`

## ✨ Key Features

### 👨‍🎓 For Students

- **Browse Tutors** - Search and filter qualified tutors by subject, rating, and availability
- **Book Sessions** - Easy scheduling system with calendar integration
- **Review System** - Rate and review tutors after sessions
- **Profile Management** - Manage personal information and learning preferences
- **Session History** - Track all past and upcoming tutoring sessions
- **Secure Payments** - Integrated payment processing for session bookings

### 👨‍🏫 For Tutors

- **Tutor Profile** - Showcase qualifications, expertise, and availability
- **Manage Bookings** - View and manage student booking requests
- **Earnings Dashboard** - Track income and session statistics
- **Reviews & Ratings** - Build reputation through student feedback
- **Resource Management** - Upload and share learning materials
- **Availability Calendar** - Set and manage teaching schedule

### 🛡️ For Administrators

- **User Management** - Comprehensive user administration (Students, Tutors, Admins)
- **Category Management** - Organize and manage subject categories
- **Booking Oversight** - Monitor and manage all platform bookings
- **Analytics Dashboard** - View platform statistics and insights
- **Content Moderation** - Review and approve tutor profiles
- **System Configuration** - Manage platform settings and configurations

### 🔐 Authentication & Security

- **Secure Authentication** - Powered by Better Auth library
- **Email Verification** - Email-based account verification
- **Password Management** - Change password and forgot password functionality
- **Role-Based Access Control** - Granular permissions for different user roles
- **Protected Routes** - Middleware-based route protection

### 💎 Additional Features

- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Dark Mode Support** - Built-in theme switching with next-themes
- **Advanced Search** - Filter tutors by multiple criteria
- **Real-time Updates** - Dynamic content updates without page refresh
- **Optimized Performance** - Image optimization and lazy loading
- **SEO Friendly** - Meta tags and structured data for better visibility
- **Accessibility** - WCAG compliant UI components
- **Cache Management** - Smart caching for improved performance

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **UI Library:** [React 19.2.3](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Form Management:** TanStack React Form
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** Sonner

### Authentication & API

- **Auth:** [Better Auth](https://www.better-auth.com/)
- **HTTP Client:** Axios
- **Validation:** Zod
- **Email:** SendGrid

### Utilities

- **Class Management:** clsx & tailwind-merge
- **Theme:** next-themes
- **Progress Bar:** next-nprogress-bar
- **Styling Variants:** class-variance-authority

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skillbridge-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the required environment variables:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=your_api_url

   # Authentication
   BETTER_AUTH_SECRET=your_auth_secret

   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=your_sendgrid_key

   # Add other required environment variables
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
skillbridge-client/
├── public/              # Static assets
├── src/
│   ├── api/            # API routes and configurations
│   ├── app/            # Next.js app router pages
│   │   ├── (public)/   # Public pages (home, about, pricing)
│   │   ├── (users)/    # User pages (student, tutor)
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── api/        # API route handlers
│   │   ├── login/      # Login page
│   │   └── register/   # Registration page
│   ├── components/     # React components
│   │   ├── admin/      # Admin-specific components
│   │   ├── auth/       # Authentication components
│   │   ├── common/     # Shared components
│   │   ├── dashboard/  # Dashboard components
│   │   ├── home/       # Homepage sections
│   │   ├── layout/     # Layout components
│   │   ├── table/      # Table components
│   │   └── ui/         # UI components (Radix UI based)
│   ├── constants/      # Application constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries
│   ├── services/       # API service layers
│   └── middleware.ts   # Next.js middleware
├── components.json     # shadcn/ui configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features Highlights

### Smart Cache Management

The application includes advanced cache management utilities for optimized performance:

- Automatic cache invalidation
- Query-based data fetching
- Optimized API response handling

### Role-Based Dashboards

Each user role has a dedicated dashboard with role-specific features:

- **Student Dashboard:** View bookings, find tutors, manage profile
- **Tutor Dashboard:** Manage sessions, view earnings, update availability
- **Admin Dashboard:** User management, analytics, system configuration

### Modern UI/UX

- Clean and intuitive interface
- Smooth page transitions with progress indicators
- Responsive design for all screen sizes
- Accessible components following best practices
- Toast notifications for user feedback

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with PostCSS. Configuration is available in `tailwind.config.js`.

### TypeScript

Type-safe development with strict TypeScript configuration. See `tsconfig.json` for details.

### Environment Variables

Environment variables are validated using `@t3-oss/env-nextjs` in `src/env.ts`.

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn React
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/primitives) - Accessible component primitives
- [Better Auth](https://www.better-auth.com/docs) - Authentication library

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed by **Shijan**

---

**Note:** This is a client-side application. Make sure the backend API is running and properly configured for full functionality.
