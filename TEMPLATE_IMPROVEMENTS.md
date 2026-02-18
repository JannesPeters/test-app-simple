# Template Improvement Notes

This document outlines issues encountered when converting the boilerplate template to a simple Hello World app with Vercel preview deployments. Use these notes to improve the base template.

## Issues Encountered

### 1. **React Dependency Version Conflicts**

**Problem:**
- Template had `react@^18.3.1` but `react-dom` was missing or upgrading to v19.x
- This caused peer dependency conflicts during `npm install`
- Error: `ERESOLVE unable to resolve dependency tree`

**Solution Required:**
```bash
npm install --legacy-peer-deps
```

**Template Fix:**
- Ensure `react` and `react-dom` versions are explicitly aligned in package.json
- Add both as dependencies with matching version ranges:
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```
- Consider adding `.npmrc` file with: `legacy-peer-deps=true`

### 2. **Missing react-dom Dependency**

**Problem:**
- `react-dom` was missing from dependencies after initial install
- Build failed with: `Rollup failed to resolve import "react-dom/client"`

**Template Fix:**
- Explicitly list `react-dom` in package.json dependencies
- Add package-lock.json to repo to lock dependency versions

### 3. **Supabase Integration Not Easily Removable**

**Problem:**
- Template has extensive Supabase integration (which is good for most projects!)
- However, for simple projects without backend needs, removing Supabase requires hunting through multiple files
- Supabase code is scattered across: client config, API layers, env files, components, scripts

**Template Fix:**
Keep Supabase in the template (since it's used most of the time), but **make it easy to strip out** when not needed:

#### Option A: Isolation with Clear Boundaries

Organize files so Supabase code is clearly separated:

```
src/
├── App.tsx                    # Main app (uses features/ conditionally)
├── features/
│   ├── core/                  # Core app features (no Supabase)
│   │   └── HelloWorld.tsx
│   └── supabase/              # 🎯 All Supabase code here
│       ├── SupabaseProvider.tsx
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   └── useProjects.ts
│       ├── api/
│       │   └── projects.ts
│       └── components/
│           └── ProjectsList.tsx
├── lib/
│   ├── utils.ts              # Generic utilities
│   └── supabase/             # 🎯 Supabase config
│       └── client.ts
├── config/
│   ├── app.ts                # App config
│   └── supabase/             # 🎯 Supabase env
│       └── env.ts
```

Then add a **removal script**: `scripts/remove-supabase.mjs`

```javascript
#!/usr/bin/env node
import { rm } from 'fs/promises';
import { existsSync } from 'fs';

const filesToRemove = [
  'src/features/supabase',
  'src/lib/supabase',
  'src/config/supabase',
  'supabase',
  '.env.development.example',
  '.env.production.example'
];

console.log('🧹 Removing Supabase integration...\n');

for (const path of filesToRemove) {
  if (existsSync(path)) {
    await rm(path, { recursive: true, force: true });
    console.log(`✅ Removed: ${path}`);
  }
}

console.log('\n✨ Supabase removed! Remember to:');
console.log('1. Remove @supabase/supabase-js from package.json');
console.log('2. Remove Supabase scripts from package.json');
console.log('3. Update App.tsx to remove Supabase features');
console.log('\nRun: npm run clean-deps');
```

Add to package.json:
```json
{
  "scripts": {
    "remove:supabase": "node scripts/remove-supabase.mjs",
    "clean-deps": "rm -rf node_modules package-lock.json && npm install"
  }
}
```

#### Option B: Feature Flags

Use environment variables to disable Supabase without removing code:

`.env.development`:
```env
VITE_ENABLE_SUPABASE=true
```

`src/config/features.ts`:
```typescript
export const features = {
  supabase: import.meta.env.VITE_ENABLE_SUPABASE === 'true',
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};
```

`src/App.tsx`:
```typescript
import { features } from '@/config/features';
import HelloWorld from '@/features/core/HelloWorld';
import SupabaseApp from '@/features/supabase/SupabaseApp';

export default function App() {
  if (!features.supabase) {
    return <HelloWorld />;
  }
  
  return <SupabaseApp />;
}
```

This way you can just set `VITE_ENABLE_SUPABASE=false` for simple projects!

#### Option C: Clear Documentation

Add a `REMOVING_FEATURES.md` guide:

```markdown
# Removing Supabase

If you don't need Supabase for your project, follow these steps:

## Quick Method (5 minutes)

1. Run removal script:
   ```bash
   npm run remove:supabase
   ```

2. Remove from `package.json` dependencies:
   - `@supabase/supabase-js`

3. Remove from `package.json` scripts:
   - All scripts starting with `supabase:`

4. Update `src/App.tsx` to your simple app structure

5. Clean reinstall:
   ```bash
   npm run clean-deps
   ```

## Manual Method

### Files to delete:
- [ ] `src/lib/supabaseClient.ts`
- [ ] `src/lib/api/projects.ts`
- [ ] `src/config/env.ts`
- [ ] `supabase/` directory
- [ ] `.env.development.example`
- [ ] `.env.production.example`

### Files to update:
- [ ] `package.json` - remove `@supabase/supabase-js` dependency
- [ ] `package.json` - remove `supabase:*` scripts
- [ ] `src/App.tsx` - replace with your simple component

### Verify:
```bash
npm run build  # Should complete without errors
npm run test   # Should pass
```
```

**Recommended Approach:** Use **Option A** (file isolation) + **Option C** (documentation), with the removal script. This gives you:
- ✅ Clean organization when you have Supabase
- ✅ Easy removal when you don't need it
- ✅ No runtime overhead from feature flags
- ✅ Clear documentation for future reference

### 4. **Test Configuration Issues**

**Problem:**
- Tests failed with `ReferenceError: expect is not defined`
- The setup imports `@testing-library/jest-dom` but Vitest's globals weren't configured
- `setupTests.ts` exists but vitest configuration may be incomplete

**Template Fix:**
Update `vite.config.ts` to include:
```typescript
export default defineConfig({
  // ... other config
  test: {
    globals: true,  // Add this!
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts"
  }
});
```

Or add to `setupTests.ts`:
```typescript
import { expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Make sure globals are available
global.expect = expect;
global.vi = vi;
```

### 5. **Deployment Setup Not Streamlined**

**Problem:**
- Creating `vercel.json` is good, but doesn't auto-deploy
- Developer still needs to:
  1. Manually link GitHub repo to Vercel
  2. Complete CLI setup (`vercel link`)
  3. Understand the difference between `vercel.json` (build config) and GitHub integration (automation)

**Template Fix:**

**Option A: Include Vercel Setup in README**
Add a clear "Deployment" section with step-by-step:
```markdown
## Quick Deploy to Vercel

1. Push to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy (settings auto-detected)
5. Future PRs get automatic preview URLs
```

**Option B: Interactive Setup Script**
```bash
npm run setup:deploy
```
This could:
- Check if Vercel CLI is installed
- Run `vercel link`
- Provide clear instructions
- Open browser to Vercel dashboard

**Option C: Include in Template**
- Add `.vercel/` to template with placeholder project.json
- Include clear DEPLOY.md with platform-specific guides (Vercel, Netlify, etc.)

### 6. **Unnecessary Scripts in package.json**

**Problem:**
- Template includes platform-specific scripts (Supabase) that may not be needed
- Scripts like `supabase:start`, `supabase:db:reset` were unused

**Template Fix:**
Group scripts by concern:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint .",
    
    "db:start": "supabase start",
    "db:reset": "supabase db reset"
  }
}
```

Or use a `scripts/` directory with separate files:
- `scripts/dev.sh` - development commands
- `scripts/db.sh` - database commands
- `scripts/deploy.sh` - deployment commands

### 7. **No .npmrc File**

**Problem:**
- Encountered peer dependency issues
- No guidance on npm configuration

**Template Fix:**
Include `.npmrc` with sensible defaults:
```
legacy-peer-deps=true
save-exact=true
engine-strict=false
```

### 8. **Build Configuration Clarity**

**Problem:**
- Install command needs `--legacy-peer-deps` but this isn't documented
- Vercel deployment failed initially because dependencies weren't installed correctly

**Template Fix:**
Update `vercel.json`:
```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Recommended Template Structure

```
my-app/
├── .npmrc                    # npm configuration
├── vercel.json              # Deployment config (optional)
├── SETUP.md                 # Step-by-step first-time setup
├── DEPLOY.md                # Deployment guides
├── package.json             # Minimal dependencies
├── src/
│   ├── App.tsx             # Simple starter
│   └── App.test.tsx        # Working test
├── scripts/
│   └── setup-deploy.mjs    # Interactive deployment setup
└── templates/              # Optional: feature templates
    ├── with-supabase/
    ├── with-auth/
    └── with-postgres/
```

## Recommended Improvements Summary

### High Priority
1. ✅ Fix React/React-DOM version alignment
2. ✅ Add `.npmrc` with legacy-peer-deps
3. ✅ Fix Vitest globals configuration
4. ✅ Add clear deployment documentation
5. ✅ Commit package-lock.json

### Medium Priority
6. Create template variants (minimal vs full-featured)
7. Add interactive setup script for deployments
8. Separate optional scripts from core scripts
9. Add DEPLOY.md with platform guides

### Low Priority
10. Consider setup wizard for initial configuration
11. Add more example components
12. Include common deployment configs (Netlify, Railway, etc.)

## Testing Checklist for Template

Before releasing template updates, test:

- [ ] `npm install` works without flags
- [ ] `npm run dev` starts successfully
- [ ] `npm run build` completes without errors
- [ ] `npm test` passes all tests
- [ ] Vercel deployment works with default settings
- [ ] GitHub integration auto-creates previews
- [ ] Template works on fresh clone (no cached dependencies)
- [ ] Works on all major OSes (macOS, Linux, Windows)

## Additional Resources Needed

1. **Video walkthrough** of first-time setup
2. **Troubleshooting guide** for common issues
3. **Migration guide** from old template to new
4. **Examples repository** showing different use cases

---

**Created:** 2026-02-18  
**Purpose:** Document friction points for template improvement
