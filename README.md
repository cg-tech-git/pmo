# PMO Application - Project Management Office

A comprehensive enterprise-grade Project Management Office (PMO) application built with Next.js, TypeScript, and Tailwind CSS. This application serves as a single source of truth for project management across multiple domains including commercial, engineering, logistics, and human resources.

## 🚀 Features

### Core Functionality
- **Real-time Dashboard** - Customizable widgets with KPIs, trends, and RAG status indicators
- **Project Portfolio Management** - Complete project lifecycle management with health scoring
- **Resource Management** - Track manpower, materials, and equipment allocation
- **Commercial Management** - Earned Value Management (EVM) with automated calculations
- **Process Library** - Central repository for standardized workflows
- **Self-Service Reporting** - Custom report builder with export capabilities
- **AI-Powered Insights** - Natural language summaries and predictive analytics

### Advanced Features
- **Interactive Flowcharts** - Dynamic process flows linking to forms and documents
- **Accreditation Tracker** - Monitor certifications and expiry dates
- **Role-Based Access Control** - Secure authentication with user permissions
- **Data Import/Export** - Bulk operations and multiple format support

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **Heroicons** for iconography
- **Recharts** for data visualization

### Backend & Infrastructure
- **Node.js** with Express/Fastify
- **Google Cloud Platform** (Cloud Run, Cloud SQL, Firestore)
- **Firebase Authentication**
- **BigQuery** for data warehousing
- **Gemini Models API** for AI features

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Tailwind CSS** for utility-first styling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pmo-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

The application uses a comprehensive design system built with Tailwind CSS:

### Color Palette
- **Primary**: Blue shades for primary actions and branding
- **Status Colors**: 
  - Green (#22c55e) for positive/on-track status
  - Amber (#f59e0b) for warning/at-risk status  
  - Red (#ef4444) for critical/error status
- **Neutrals**: Gray scale for backgrounds and text

### Typography
- **Font Family**: Inter for optimal readability
- **Scale**: Consistent sizing from 12px to 36px
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent shadow and border styling
- **Buttons**: Primary, secondary, and danger variants
- **Status Badges**: Color-coded indicators for project health
- **Navigation**: Responsive sidebar with active states

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main dashboard page
├── components/            # Reusable React components
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── DashboardHeader.tsx
│   │   ├── KPIGrid.tsx
│   │   ├── ProjectOverview.tsx
│   │   ├── RecentActivity.tsx
│   │   └── PerformanceCharts.tsx
│   └── layout/            # Layout components
│       ├── MainLayout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🚦 Getting Started

### User Roles
- **Project Manager**: Day-to-day project management and reporting
- **Team Lead**: Domain-specific task management and progress reporting
- **PMO Admin**: Portfolio oversight and strategic decision making
- **Executive**: High-level dashboards and performance insights

### Key Workflows
1. **Project Health Check**: View dashboard → Drill down → Analyze metrics → Generate reports
2. **Resource Planning**: Check utilization → Identify conflicts → Optimize allocation
3. **Commercial Analysis**: Review EVM metrics → Assess variances → Plan corrective actions

## 📊 Dashboard Features

### KPI Cards
- Total Budget tracking
- Average Project Duration
- Team Utilization rates
- Performance Index metrics

### Project Overview
- Real-time project status
- Health score indicators (RAG)
- Progress tracking
- Budget vs. actual spending

### Performance Analytics
- Budget performance trends
- Project health distribution
- Resource utilization by department
- Predictive insights

### Recent Activity
- Timeline of project activities
- User actions and updates
- Milestone completions
- Alert notifications

## 🔧 Configuration

### Environment Variables
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Google Cloud Configuration
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_REGION=

# API Configuration
NEXT_PUBLIC_API_URL=
```

### Customization
- **Themes**: Modify Tailwind config for brand colors
- **Components**: Extend or override component styles
- **Data**: Replace mock data with real API connections
- **Charts**: Customize Recharts configuration

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Accessibility**: WCAG 2.1 Level AA compliance

## 🚀 Deployment

### Google Cloud Platform
1. Build the application: `npm run build`
2. Deploy to Cloud Run
3. Configure environment variables
4. Set up CI/CD with Cloud Build

### Environment Setup
- **Development**: Local development with mock data
- **Staging**: Cloud environment with test data
- **Production**: Full cloud infrastructure with real data

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core dashboard functionality
- ✅ Project overview and management
- ✅ Basic reporting capabilities
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Firebase authentication integration
- 🔄 Real API connections
- 🔄 Advanced EVM calculations
- 🔄 AI-powered insights

### Phase 3 (Future)
- 📋 Process library implementation
- 📋 Advanced reporting engine
- 📋 Mobile application
- 📋 Advanced analytics and ML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For technical support or questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for efficient project management** 