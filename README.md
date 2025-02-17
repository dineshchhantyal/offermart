# RenewMart

A sustainable e-commerce platform built with Next.js 14, focusing on buying and selling renewable energy products and reducing waste through reuse and recycling.

## Overview

RenewMart connects environmentally conscious buyers with sellers offering sustainable and renewable energy products. Our platform aims to reduce waste and promote eco-friendly commerce.

### Key Goals

- Reduce waste through product reuse
- Support sustainable energy initiatives
- Create a community of eco-conscious traders
- Promote transparent and secure transactions

## Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/) - React framework with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Shadcn/ui](https://ui.shadcn.com/) - Reusable component system

### Backend

- [Prisma](https://www.prisma.io/) - Type-safe ORM
- [PostgreSQL](https://www.postgresql.org/) - Primary database
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

### DevOps & Tools

- ESLint - Code linting
- Prettier - Code formatting
- Husky - Git hooks
- Jest - Testing framework

## Features

### User Management

- Email & Social authentication
- User profiles with ratings
- Seller verification system

### Product Management

- Multi-image product listings
- Category-based navigation
- Advanced search and filters
- Condition tracking (New/Used)

### Shopping Experience

- Real-time cart management
- Secure checkout process
- Multiple payment methods
- Order tracking system

### Seller Tools

- Product listing dashboard
- Order management
- Analytics and insights
- Inventory tracking

### Platform Features

- Dark/Light mode
- Responsive design
- Real-time notifications
- SEO optimization

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm/yarn/pnpm

### Environment Setup

Copy `.env.example` to `.env` and update with your values:

```bash
cp .env.example .env
```

### Installation

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
renew-mart/
├── src/
│   ├── app/          # Next.js 14 app router
│   ├── components/   # Reusable components
│   ├── lib/         # Utilities and configurations
│   ├── store/       # Redux store setup
│   └── types/       # TypeScript definitions
├── prisma/          # Database schema and migrations
├── public/          # Static assets
└── tests/           # Test suites
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Follow the existing code style
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Shadcn for the amazing UI components
- Vercel for hosting and deployment
- The Next.js team for the fantastic framework
