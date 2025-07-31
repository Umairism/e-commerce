# Netlify Deployment Guide

This guide will help you deploy your e-commerce application to Netlify with serverless backend functions.

## Pre-deployment Setup

### 1. Build Configuration
Your application is now configured with:
- **Frontend**: React application with production build optimizations
- **Backend**: Netlify Functions (serverless) replacing Django for deployment
- **Environment**: Auto-detection between development (Django) and production (Netlify Functions)

### 2. File Structure
```
e-commerce/
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── .env.development    # Django API for local dev
│   ├── .env.production     # Netlify Functions for production
│   └── package.json
├── netlify/
│   └── functions/
│       ├── api.js          # Main API router
│       ├── products.js     # Products API
│       ├── cart.js         # Cart management
│       └── categories.js   # Categories API
└── netlify.toml           # Build & deployment config
```

## Deployment Steps

### Option 1: Direct Netlify Deploy (Recommended)

1. **Prepare Your Repository**
   ```bash
   # Navigate to your project
   cd "d:\Github\e-commerce"
   
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial e-commerce application ready for deployment"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `cd Frontend && npm run netlify:build`
     - **Publish directory**: `Frontend/build`
     - **Functions directory**: `netlify/functions`

### Option 2: Netlify CLI Deploy

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   # Navigate to Frontend directory
   cd "d:\Github\e-commerce\Frontend"
   
   # Install dependencies
   npm install
   
   # Build for production
   npm run build:prod
   
   # Navigate back to root
   cd ..
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --dir=Frontend/build --functions=netlify/functions
   
   # For production deployment
   netlify deploy --prod --dir=Frontend/build --functions=netlify/functions
   ```

## Testing Locally

Before deploying, test your serverless functions locally:

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Navigate to project root
cd "d:\Github\e-commerce"

# Start local development server with functions
netlify dev
```

This will:
- Serve your React app on http://localhost:3000
- Run serverless functions on http://localhost:3000/.netlify/functions/
- Automatically proxy API calls to the functions

## Verification Checklist

After deployment, verify these features work:

### ✅ Frontend Features
- [ ] Homepage loads with product grid
- [ ] Product filtering and search
- [ ] Category navigation
- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] Responsive design on mobile/desktop

### ✅ Backend API Features
- [ ] Products API: `https://yoursite.netlify.app/.netlify/functions/products`
- [ ] Categories API: `https://yoursite.netlify.app/.netlify/functions/categories`
- [ ] Cart API: `https://yoursite.netlify.app/.netlify/functions/cart`
- [ ] Session-based cart persistence
- [ ] Product search and filtering

## Environment Variables

Your app automatically uses the correct API endpoints:
- **Development**: `http://localhost:8000/api` (Django backend)
- **Production**: `/.netlify/functions` (Serverless functions)

## Troubleshooting

### Common Issues

1. **Functions not working**
   - Check `netlify.toml` is in the root directory
   - Verify functions are in `netlify/functions/` directory
   - Check function logs in Netlify dashboard

2. **CORS errors**
   - Functions include CORS headers
   - Check browser network tab for actual error

3. **Build failures**
   - Ensure all dependencies are in `package.json`
   - Check build logs for specific errors
   - Verify file paths are correct

### Local Development

To continue local development with Django backend:

```bash
# Terminal 1: Django backend
cd "d:\Github\e-commerce\Backend"
python manage.py runserver

# Terminal 2: React frontend
cd "d:\Github\e-commerce\Frontend"
npm start
```

The app will automatically use Django API in development mode.

## Next Steps

1. **Custom Domain**: Add your custom domain in Netlify dashboard
2. **SSL Certificate**: Automatically provided by Netlify
3. **Analytics**: Enable Netlify Analytics for visitor insights
4. **Forms**: Add contact/newsletter forms using Netlify Forms
5. **Identity**: Add user authentication with Netlify Identity

## Support

For deployment issues:
- Check Netlify deploy logs
- Review function logs in Netlify dashboard
- Test functions individually: `https://yoursite.netlify.app/.netlify/functions/products`

Your e-commerce application is now ready for production deployment! 🚀
