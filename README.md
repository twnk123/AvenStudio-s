# Aven Studio

A modern React application built with Vite, TypeScript, and Framer Motion.

## Features

- React 19 with TypeScript
- Vite for fast development and optimized builds
- Framer Motion for smooth animations
- React Router for navigation
- EmailJS integration for contact forms
- Responsive design

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd new_product_idea
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
GEMINI_API_KEY=your_api_key_here
VITE_BASE=/
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

## Project Structure

```
├── src/               # Source files
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── data/          # Data files
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── about/             # About page assets
├── blogs/             # Blog content
├── contact/           # Contact page assets
├── pricing/           # Pricing page assets
├── projects/          # Projects showcase
└── services/          # Services content

```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## Technologies Used

- React 19
- TypeScript
- Vite
- Framer Motion
- React Router DOM
- EmailJS
- Lenis (smooth scrolling)
- Vercel Speed Insights

## License

MIT
