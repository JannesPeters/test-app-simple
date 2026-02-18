# Multi-Concept Deployment Setup

This project is configured to deploy **two different UI concepts** from the same codebase to separate Vercel preview URLs.

## Architecture

- **Concept A**: 🎨 **90s NOSTALGIA** - A blast from the past with GeoCities vibes, marquee text, visitor counters, and all the glory of 1999 web design!
- **Concept B**: 🚀 **CYBERPUNK 2077** - A futuristic neon-soaked experience with Matrix rain, glitch effects, and terminal aesthetics.

The UI variant is controlled by the `VITE_UI_VARIANT` environment variable.

## Local Development

### Run Concept A locally:
```bash
npm run dev:concept-a
```
Visit: http://localhost:5173

### Run Concept B locally:
```bash
npm run dev:concept-b
```
Visit: http://localhost:5173

### Build and preview locally:
```bash
# Build Concept A
npm run build:concept-a
npm run preview:concept-a

# Build Concept B
npm run build:concept-b
npm run preview:concept-b
```

## Vercel Deployment Setup

### Step 1: Create First Vercel Project (Concept A)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository: `JannesPeters/test-app-simple`
3. Configure the project:
   - **Project Name**: `test-app-concept-a`
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `VITE_UI_VARIANT=concept-a npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - Name: `VITE_UI_VARIANT`
   - Value: `concept-a`
5. Click **Deploy**

### Step 2: Create Second Vercel Project (Concept B)

1. Go to [vercel.com/new](https://vercel.com/new) again
2. Import the **same** repository: `JannesPeters/test-app-simple`
3. Configure the project:
   - **Project Name**: `test-app-concept-b`
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `VITE_UI_VARIANT=concept-b npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - Name: `VITE_UI_VARIANT`
   - Value: `concept-b`
5. Click **Deploy**

### Alternative: Use Project Configuration Files

If you prefer to manage settings in code:

**For Concept A Project:**
1. Rename `vercel-concept-a.json` to `vercel.json` in the project settings
2. Or configure via Vercel dashboard to use custom config

**For Concept B Project:**
1. Rename `vercel-concept-b.json` to `vercel.json` in the project settings
2. Or configure via Vercel dashboard to use custom config

## How It Works

Once both projects are set up:

1. **Push a commit** to any branch
2. **Create a PR** 
3. Vercel will automatically deploy **both concepts** as preview deployments
4. You'll get **2 preview URLs** in the PR:
   - ✅ Concept A: `https://test-app-concept-a-<hash>.vercel.app`
   - ✅ Concept B: `https://test-app-concept-b-<hash>.vercel.app`

## Example PR Comment

When you open a PR, Vercel will comment with both preview URLs:

```
✅ Preview deployment ready!

🔵 Concept A: https://test-app-concept-a-abc123.vercel.app
🟣 Concept B: https://test-app-concept-b-xyz789.vercel.app
```

## Adding More Concepts

To add Concept C:

1. Create `src/components/ConceptC.tsx`
2. Update `src/App.tsx` to include the new concept:
   ```typescript
   if (UI_VARIANT === 'concept-c') {
     return <ConceptC />;
   }
   ```
3. Add npm scripts:
   ```json
   "dev:concept-c": "VITE_UI_VARIANT=concept-c vite",
   "build:concept-c": "VITE_UI_VARIANT=concept-c vite build"
   ```
4. Create third Vercel project with `VITE_UI_VARIANT=concept-c`

## Modifying Concepts

Edit the component files directly:
- `src/components/ConceptA.tsx` - Clean & Minimal design
- `src/components/ConceptB.tsx` - Bold & Vibrant design

Changes will automatically deploy to their respective preview URLs on the next push.

## Troubleshooting

### Both projects show the same UI
- Check environment variables in Vercel dashboard
- Verify `VITE_UI_VARIANT` is set correctly for each project
- Redeploy after updating environment variables

### Preview deployments not appearing
- Ensure GitHub integration is enabled for both projects
- Check Vercel dashboard for build logs
- Verify repository access permissions

### Build fails
- Check build logs in Vercel dashboard
- Test locally: `npm run build:concept-a` and `npm run build:concept-b`
- Ensure all dependencies are installed

## Benefits

✅ **Single PR, multiple concepts** - Review all designs in one place  
✅ **No code duplication** - Share components and logic  
✅ **Easy comparison** - Switch between URLs to compare designs  
✅ **Team collaboration** - Designers can review both concepts simultaneously  
✅ **Fast iteration** - Deploy changes to all concepts with one commit
