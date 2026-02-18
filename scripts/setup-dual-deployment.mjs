#!/usr/bin/env node

/**
 * Helper script to set up dual Vercel deployments for UI concepts
 * This opens the necessary Vercel pages and provides clear instructions
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('\n🎨 Dual UI Concept Deployment Setup\n');
console.log('═'.repeat(50));

async function openURL(url) {
  const platform = process.platform;
  const command = platform === 'darwin' ? 'open' : platform === 'win32' ? 'start' : 'xdg-open';
  
  try {
    await execAsync(`${command} "${url}"`);
    return true;
  } catch (error) {
    console.log(`\n⚠️  Could not auto-open browser. Please visit: ${url}`);
    return false;
  }
}

async function main() {
  console.log('\n📋 SETUP INSTRUCTIONS:\n');
  
  console.log('You currently have ONE Vercel project deployed.');
  console.log('To get TWO preview URLs per PR, you need TWO projects.\n');
  
  console.log('STEP 1: Update Existing Project (Concept A)');
  console.log('─'.repeat(50));
  console.log('1. Go to your existing project settings');
  console.log('2. Navigate to: Settings → Environment Variables');
  console.log('3. Add: VITE_UI_VARIANT = concept-a');
  console.log('4. Apply to: Production, Preview, Development');
  console.log('5. Redeploy your project\n');
  
  console.log('Opening your project settings...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await openURL('https://vercel.com/jannes-projects-2850ef8d/test-app-simple/settings/environment-variables');
  
  console.log('\n✅ Once you\'ve added the environment variable, press ENTER to continue...');
  
  // Wait for user input
  await new Promise(resolve => {
    process.stdin.once('data', () => resolve());
  });
  
  console.log('\n\nSTEP 2: Create Second Project (Concept B)');
  console.log('─'.repeat(50));
  console.log('1. Import the SAME repository again');
  console.log('2. Repository: JannesPeters/test-app-simple');
  console.log('3. Project Name: test-app-concept-b');
  console.log('4. Framework: Vite (auto-detected)');
  console.log('5. Build Command: npm run build (auto-detected)');
  console.log('6. Output Directory: dist (auto-detected)');
  console.log('7. Environment Variable: VITE_UI_VARIANT = concept-b');
  console.log('8. Apply to: Production, Preview, Development');
  console.log('9. Deploy!\n');
  
  console.log('Opening Vercel new project page...\n');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await openURL('https://vercel.com/new/clone?repository-url=https://github.com/JannesPeters/test-app-simple&env=VITE_UI_VARIANT&envDescription=UI%20variant%20to%20deploy&envLink=https://github.com/JannesPeters/test-app-simple/blob/main/MULTI_CONCEPT_SETUP.md&project-name=test-app-concept-b');
  
  console.log('\n\n🎉 RESULT:');
  console.log('─'.repeat(50));
  console.log('After setup, every PR will show TWO preview URLs:');
  console.log('  🎨 Concept A (90s Nostalgia)');
  console.log('  🚀 Concept B (Cyberpunk 2077)');
  console.log('\nBoth will deploy automatically from the same codebase!');
  console.log('\n✨ Setup complete! Check PR #2 for the preview URLs.\n');
  
  process.exit(0);
}

main().catch(console.error);
