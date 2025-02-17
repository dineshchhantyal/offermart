# RenewMart

A community-driven marketplace platform focused on reducing waste by connecting sellers of near-expiry goods with conscious buyers. Built with Next.js 14, the platform serves both B2B businesses and individual users.

## Overview

RenewMart empowers businesses and individuals to extend the life of near-expiry products through sales or donations. Our AI-powered platform ensures quality verification while promoting sustainable commerce and community impact.

### Key Goals

- Reduce waste through smart inventory management
- Connect businesses with cost-conscious buyers
- Enable individual participation in waste reduction
- Promote both commercial and donation-based transactions
- Verify product quality through AI technology

## Core Features

### Dual Sales Channels

#### B2B Platform

- Bulk listing capabilities
- Digital marketplace presence
- Physical store placement options
- Contractual agreement management
- Business-specific analytics

#### Individual Sellers

- Single item listings
- Flexible pricing options
- Donation capabilities
- Personal dashboard
- Transaction history

### AI-Powered Verification

- Image-based quality assessment
- Expiration date verification
- Product authenticity checks
- Automated listing validation
- Real-time feedback system

### Smart Logistics

- Seller-managed delivery options
- Pickup arrangement facilitation
- Secure contact exchange
- Location-based matching
- Delivery tracking integration

### Financial Structure

- 10% standard commission
- Commission-free donations
- Secure payment processing
- Automated profit sharing
- Transaction history tracking

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

## Platform Architecture

### Frontend Features

- Responsive design for all devices
- Dark/Light mode support
- Real-time notifications
- Advanced search and filters
- Interactive dashboard

### Backend Capabilities

- AI verification pipeline
- Real-time data processing
- Secure authentication
- Payment processing
- Analytics engine

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm/yarn/pnpm

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/dineshchhantyal/offer-mart

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Set up the database
npx prisma generate
npx prisma db push

# Start the development server
npm run dev


## Project Structure

```

renew-mart/
├── src/
│ ├── app/ # Next.js 14 app router
│ ├── components/ # Reusable components
│ ├── lib/ # Utilities and configurations
│ ├── store/ # Redux store setup
│ └── types/ # TypeScript definitions
├── prisma/ # Database schema and migrations
├── public/ # Static assets
└── tests/ # Test suites

````

## API Documentation

### Product Endpoints

```typescript
POST /api/products
GET /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
````

### Authentication Endpoints

```typescript
POST / api / auth / register;
POST / api / auth / login;
POST / api / auth / verify;
GET / api / auth / me;
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
