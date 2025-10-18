# 123 Fakturera - Invoice Management System

A full-stack invoice and product management application built with React, Node.js, and PostgreSQL. This project demonstrates modern web development practices with JWT authentication, responsive design, and real-time data editing.

![Project Banner](https://via.placeholder.com/1200x300/1976d2/ffffff?text=123+Fakturera)

## 🚀 Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Protected routes with middleware
- ✅ Secure password hashing with bcrypt
- ✅ Token expiration handling
- ✅ Auto-redirect on unauthorized access

### User Interface
- ✅ Modern, responsive design (Mobile, Tablet, Desktop)
- ✅ Bilingual support (English & Swedish)
- ✅ Sidebar navigation menu
- ✅ Toggle sidebar for better space utilization
- ✅ Beautiful login page with background imagery
- ✅ Terms and conditions page

### Product Management (Pricelist)
- ✅ Real-time editable product table
- ✅ 20+ sample products with scrolling
- ✅ Search functionality (Article No. & Product Name)
- ✅ Inline editing with auto-save
- ✅ Sort by columns
- ✅ Add, edit, and delete products
- ✅ Bulk operations support

### Database
- ✅ PostgreSQL with NeonDB (cloud hosting)
- ✅ Structured schema for users, products, and multilingual content
- ✅ Optimized queries with indexing

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Vanilla CSS (No frameworks)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** Context API (Auth & Language)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Database Driver:** node-postgres (pg)

### Database
- **Database:** PostgreSQL 15
- **Hosting:** NeonDB (Serverless PostgreSQL)

### Development Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm
- **Code Editor:** VS Code (recommended)

## 📁 Project Structure
```
invoice-app/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   │   └── images/      # Logo, flags, backgrounds
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...
│   │   ├── context/         # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── LanguageContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── Pricelist.jsx
│   │   │   ├── Invoices.jsx
│   │   │   └── ...
│   │   ├── services/        # API service layer
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── productService.js
│   │   │   └── textService.js
│   │   ├── styles/          # CSS stylesheets
│   │   │   ├── global.css
│   │   │   ├── layout.css
│   │   │   ├── login.css
│   │   │   ├── terms.css
│   │   │   ├── pricelist.css
│   │   │   └── responsive.css
│   │   ├── utils/           # Utility functions
│   │   │   └── constants.js
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js backend API
│   ├── config/             # Configuration files
│   │   └── database.js
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── textController.js
│   │   └── pricelistController.js
│   ├── middleware/         # Custom middleware
│   │   └── authMiddleware.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── textRoutes.js
│   │   └── pricelistRoutes.js
│   ├── models/            # Database models (optional)
│   ├── .env               # Environment variables
│   ├── server.js          # Server entry point
│   └── package.json
│
├── database/              # Database schema & seeds
│   └── schema.sql
│
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or NeonDB account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/invoice-app.git
cd invoice-app
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Create `.env` file in the `backend` folder:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/database_name?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. **Setup Database**

Run the SQL schema in your PostgreSQL database:
```bash
# Connect to your database
psql -U postgres -d your_database

# Run schema
\i database/schema.sql
```

Or if using NeonDB, copy the contents of `database/schema.sql` and run in the NeonDB SQL Editor.

5. **Setup Frontend**
```bash
cd ../frontend
npm install
```

6. **Start Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

7. **Access the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

## 🔐 Default Login Credentials
```
Email: test@example.com
Password: password123
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user (Protected)

### Products (All Protected)
- `GET /api/pricelist/products` - Get all products
- `GET /api/pricelist/products/:id` - Get single product
- `POST /api/pricelist/products` - Create new product
- `PUT /api/pricelist/products/:id` - Update product (full)
- `PATCH /api/pricelist/products/:id` - Update product (partial)
- `PUT /api/pricelist/products` - Bulk update products
- `DELETE /api/pricelist/products/:id` - Delete product

### Texts (Multilingual Content)
- `GET /api/texts` - Get all texts
- `GET /api/texts/:page/:language` - Get texts by page and language

## 🎨 Screenshots

### Desktop View
![Desktop View](Screenshots/DesktopView.png)
![Desktop View](Screenshots/ToggleView.png)

### Tablet View
![Tablet View](Screenshots/TabView.png)

### Mobile View (Portrait)
![Mobile Portrait](Screenshots/MobileView.png)

### Mobile View (Landscape)
![Mobile Landscape](Screenshots/MobileLandscapeView.png)

### LogIn View
![LogIn View](Screenshots/login-page.png)

### Database 
![Database](Screenshots/Database.png)

## 📱 Responsive Design

The application is fully responsive and tested on:
- ✅ Desktop (1920x1080 and above)
- ✅ Laptop (1366x768 to 1920x1080)
- ✅ Tablet Landscape (1024x768)
- ✅ Tablet Portrait (768x1024)
- ✅ Mobile Landscape (667x375 to 896x414)
- ✅ Mobile Portrait (375x667 to 414x896)

## 🌍 Internationalization

Currently supports:
- 🇬🇧 English
- 🇸🇪 Swedish (Svenska)

All text content is stored in the database and can be easily extended to support more languages.

## 🔧 Configuration

### Frontend Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### Backend Configuration
- Port: 5000 (configurable in `.env`)
- CORS: Enabled for frontend origin
- JWT Expiration: 24 hours

## 🧪 Testing

### Manual Testing
1. Login functionality
2. Product CRUD operations
3. Search functionality
4. Language switching
5. Responsive design on different devices
6. JWT token expiration handling

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Upload 'dist' folder to your hosting provider
```

### Backend Deployment (Heroku/Render)
```bash
cd backend
# Make sure .env is configured
# Deploy using your hosting provider's CLI or dashboard
```

### Database
- Already hosted on NeonDB (serverless PostgreSQL)
- Connection string configured in `.env`

## 🛡️ Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes
- SQL injection prevention with parameterized queries
- XSS protection
- CORS configuration
- Environment variables for sensitive data

## 📝 Database Schema

### Users Table
```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- password (VARCHAR)
- created_at (TIMESTAMP)
```

### Products Table
```sql
- id (SERIAL PRIMARY KEY)
- article_no (VARCHAR)
- product_service (VARCHAR)
- in_price (DECIMAL)
- price (DECIMAL)
- unit (VARCHAR)
- in_stock (INTEGER)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Texts Table (Multilingual)
```sql
- id (SERIAL PRIMARY KEY)
- key (VARCHAR)
- language (VARCHAR)
- value (TEXT)
- page (VARCHAR)
- UNIQUE(key, language)
```

### Code Style Guidelines
- Use vanilla CSS (no preprocessors)
- Follow existing component structure
- Add comments for complex logic
- Test on multiple devices before submitting PR


## 🙏 Acknowledgments

- Design inspiration from 123 Fakturera
- Icons from emoji library
- NeonDB for PostgreSQL hosting

## 📞 Support

For support, email your.email@example.com or create an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Add invoice creation functionality
- [ ] Implement customer management
- [ ] Add PDF export for invoices
- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 📊 Project Status

🟢 **Active Development** - This project is actively maintained and updated regularly.

---

**Made with ❤️ for the SOW assessment**

*Note: This is a demonstration project created for a Statement of Work (SOW) assessment.*
## Dependencies
node_modules/
venv/
__pycache__/

## Environment variables
.env
.env.local
.env.production

## Build outputs
dist/
build/
*.pyc

## IDE
.vscode/
.idea/
*.swp
*.swo

## OS
.DS_Store
Thumbs.db
*.log

## Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

## Testing
coverage/
.nyc_output/

## Misc
.cache/
temp/
```

### `LICENSE`

