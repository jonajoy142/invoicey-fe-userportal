# Invoicey Frontend

A modern React/Next.js frontend for the Invoicey blockchain invoice factoring platform.

## 📋 Features

### Phase 1 (Completed)
- ✅ User authentication (login/signup)
- ✅ Role-based access control (Business/Investor)
- ✅ Profile management and completion
- ✅ Dashboard with role-based redirection
- ✅ Invoice upload and management
- ✅ Transaction tracking
- ✅ Responsive design with Tailwind CSS

### Core Functionality
- **Authentication**: JWT-based auth with secure token storage
- **Invoice Management**: Upload, view, and track invoices
- **Transaction Tracking**: Real-time transaction status updates
- **Profile Management**: Complete user profiles with KYC support
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (FastAPI)

### Installation

1. **Clone and setup**
```bash
git clone <repository-url>
cd invoicey-frontend
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Run Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── dashboard/         # Protected dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/
│   └── ui/               # Reusable UI components
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── lib/
│   ├── api.ts           # API service layer
│   ├── validations.ts   # Zod validation schemas
│   └── utils.ts         # Utility functions
├── types/
│   └── index.ts         # TypeScript type definitions
└── middleware.ts        # Route protection middleware
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🔐 Authentication Flow

1. User visits protected route
2. Middleware checks for JWT token
3. Redirects to login if unauthenticated
4. Login/signup with backend validation
5. Store JWT token in localStorage
6. Redirect to appropriate dashboard based on role

## 📊 API Integration

### Base Configuration
```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Endpoints Used
- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `GET /users/me` - Get current user
- `PUT /users/me` - Update user profile
- `POST /invoices` - Upload invoice
- `GET /invoices` - List invoices
- `GET /transactions` - List transactions

## 🎨 UI Components

Custom UI components built with Tailwind CSS:
- **Button**: Multiple variants and states
- **Input/Textarea**: Form inputs with error handling
- **Card**: Content containers
- **Badge**: Status indicators
- **Table**: Data display
- **Select**: Dropdown selections

## 🔄 State Management

### Auth Context
```typescript
const { user, login, logout, loading } = useAuth();
```

### Form Validation
```typescript
const form = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
});
```

## 🎯 Key Features

### Role-Based Dashboard
- **Business Users**: Invoice upload, funding requests, transaction history
- **Investors**: Investment opportunities, portfolio management

### Invoice Management
- Drag & drop file upload
- Real-time status tracking
- Blockchain transaction linking

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces

## 📱 Pages Overview

### Public Pages
- **Home** (`/`): Landing page with features
- **Login** (`/login`): User authentication
- **Signup** (`/signup`): User registration

### Protected Pages
- **Dashboard** (`/dashboard`): Role-based overview
- **Upload** (`/dashboard/upload`): Invoice upload
- **Invoices** (`/dashboard/invoices`): Invoice management
- **Transactions** (`/dashboard/transactions`): Transaction history
- **Profile** (`/dashboard/profile`): User profile management

## 🚦 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 🔧 Configuration Files

- **next.config.js**: Next.js configuration
- **tailwind.config.js**: Tailwind CSS customization
- **tsconfig.json**: TypeScript configuration
- **middleware.ts**: Route protection

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Set these in your production environment:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: production

## 🔒 Security Features

- JWT token-based authentication
- Route protection middleware  
- Form validation with Zod
- CSRF protection
- Secure HTTP headers

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `NEXT_PUBLIC_API_URL` in `.env.local`
   - Ensure backend is running

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check JWT token expiration

3. **Build Errors**
   - Run `npm run type-check` for TypeScript errors
   - Check all imports and exports

## 📚 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind for styling
- Implement proper error handling

### Component Structure
```typescript
// Component props interface
interface ComponentProps {
  // props definition
}

// Component with forwardRef if needed
const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ prop1, prop2, ...props }, ref) => {
    // component logic
    return (
      // JSX
    );
  }
);

Component.displayName = 'Component';
export { Component };
```

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Document preview
- [ ] Bulk operations
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 📞 Support

For support and questions:
- Check the documentation
- Review the backend API docs
- Contact the development team

---

**Built with ❤️ using Next.js and Tailwind CSS**