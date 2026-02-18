# simple-test-app

A simple Hello World React app with Vercel preview deployments.

## Stack
- Vite + React + TypeScript
- Tailwind CSS

## Getting started
1. Install deps: `npm install`
2. Start dev server: `npm run dev`

## Scripts
- `npm run dev` - local dev mode
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run test` - run tests
- `npm run lint` - lint code
- `npm run format` - format code

## Vercel Deployment

This app is configured for automatic preview deployments with Vercel.

### Setting up Vercel deployments:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Connect to Vercel**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the Vite configuration

3. **Preview Deployments**:
   - Every push to a branch creates a preview deployment
   - Every PR gets its own unique preview URL
   - The main branch deploys to production

### Manual deployment:
```bash
vercel
```

### Deploy to production:
```bash
vercel --prod
```
