# MegaShop - Premium E-commerce Storefront

MegaShop is a premium, fully responsive React-based e-commerce storefront. Designed with modern web aesthetics (sleek layouts, glassmorphism, responsive navigation), it features a complete shopping flow including catalog browsing, dynamic variation selector with pricing offsets, cart management, checkout with local shipping zone selectors, and customer account dashboard.

---

## Key Features

- **Clean Pathname Routing**: Clean URLs without hash (`#/`) signs (e.g., `/cart`, `/checkout`, `/product/denim-jeans`).
- **Dynamic Variable Pricing**: Product prices dynamically adjust in real time based on the chosen size and color variants (e.g., washed-blue denim, larger sizes).
- **Silent Add to Cart with Micro-Feedback**: Items are added to the cart instantly without disrupting the user's shopping experience, with visual "Added ✓" button animations.
- **Dhaka Shipping Rates**: Checkout delivery calculations dynamically compute shipping charges based on location:
  - **Inside Dhaka**: $1.00
  - **Outside Dhaka**: $1.62
- **Ratings & Customer Reviews**: Customers can view delivered orders, rate products, write comments, and view active review logs from their Profile Dashboard.
- **Product Q&A Tab**: Allows prospective buyers to ask questions on single product pages, saved directly inside local browser storage.
- **Order Simulator & Tracker**: Real-time order progress timeline simulator featuring a developer "Deliver Now" override for instant delivery testing.

---

## Tech Stack

- **Frontend Core**: React (Functional & Class components)
- **Styling**: SCSS (Sass) compiled natively
- **Storage**: Browser `localStorage` for cart, user orders, reviews, and questions
- **Routing**: Clean pathname router using HTML5 History API (`pushState`/`popstate`)

---

## Local Setup

### 1. Installation
Clone the repository, navigate into the directory, and install dependencies:
```bash
git clone <repository-url>
cd shopping-cart
npm install
```

### 2. Running Locally (Development Mode)
Run the React development server:
```bash
npm run start
```
The site will run on `http://localhost:3000` (or your configured local domain `http://shopping-cart.test`).

### 3. Production Build
Compile the optimized production bundles:
```bash
npm run build
```
This builds the files to `/build` and copies them to `/public/build` for Apache virtual host setups.

---

## Vercel Deployment Guide

Vercel has **native GitHub integration**, which means **you do not need to set up any GitHub Action files or custom workflows**. Every time you push changes to your default branch on GitHub, Vercel will automatically trigger a build and deploy.

### Step-by-Step Deployment:

1. **Push your code to GitHub**:
   Ensure all your latest commits (including the new `vercel.json`) are pushed to your GitHub repository.

2. **Sign in to Vercel**:
   Go to [Vercel](https://vercel.com/) and sign in using your GitHub account.

3. **Import Project**:
   - Click **Add New** -> **Project**.
   - Select your cloned `shopping-cart` repository from the list.

4. **Configure Project Settings** (CRITICAL):
   Under the **Build and Development Settings** section, make sure to configure:
   - **Framework Preset**: Select `Create React App` (or let Vercel auto-detect it).
   - **Build Command**: `npm run build`
   - **Output Directory**: Change this from `build` to `public` (this is critical because the final deployment files are hosted under `/public`, identical to your local Apache environment).

5. **Deploy**:
   Click **Deploy**. Vercel will build your assets, configure routing rules, and provide you with a live `.vercel.app` domain in seconds!

---

## Configuration Files

- [vercel.json](vercel.json): Configures route rewriting on Vercel to prevent 404 errors when refreshing clean pathnames.
- [.htaccess](public/.htaccess): Configures URL rewrites on Apache local servers to redirect clean routing paths back to `index.html`.