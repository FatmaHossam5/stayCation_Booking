#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Migration script to help restructure the project
console.log('🚀 Starting StayCation Booking Project Migration...\n');

// Create new directory structure
const newDirectories = [
  'src/components/auth',
  'src/components/booking',
  'src/components/room',
  'src/components/admin',
  'src/components/user',
  'src/hooks',
  'src/lib',
  'src/utils',
  'src/types',
  'src/constants',
];

console.log('📁 Creating new directory structure...');
newDirectories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created: ${dir}`);
  } else {
    console.log(`⚠️  Already exists: ${dir}`);
  }
});

// Move files to new locations
const fileMoves = [
  {
    from: 'src/Components/Authentication/ResetPassword/RestPassword.tsx',
    to: 'src/components/auth/ResetPassword.tsx',
    note: 'Fixed typo in filename and moved to auth directory'
  },
  {
    from: 'src/Components/Authentication/SignIn/SignIn.tsx',
    to: 'src/components/auth/SignIn.tsx',
    note: 'Moved to auth directory'
  },
  {
    from: 'src/Components/Authentication/SignUp/SignUp.tsx',
    to: 'src/components/auth/SignUp.tsx',
    note: 'Moved to auth directory'
  },
  {
    from: 'src/Components/Authentication/ForgetPassword/ForgetPassword.tsx',
    to: 'src/components/auth/ForgetPassword.tsx',
    note: 'Moved to auth directory'
  },
  {
    from: 'src/Components/Authentication/ChangePassword/ChangePassword.tsx',
    to: 'src/components/auth/ChangePassword.tsx',
    note: 'Moved to auth directory'
  },
  {
    from: 'src/services/api.ts',
    to: 'src/lib/api.ts',
    note: 'Moved to lib directory'
  },
  {
    from: 'src/config/routes.ts',
    to: 'src/constants/routes.ts',
    note: 'Moved to constants directory'
  }
];

console.log('\n📦 Moving files to new locations...');
fileMoves.forEach(move => {
  if (fs.existsSync(move.from)) {
    // Create directory if it doesn't exist
    const targetDir = path.dirname(move.to);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy file to new location
    fs.copyFileSync(move.from, move.to);
    console.log(`✅ Moved: ${move.from} → ${move.to}`);
    console.log(`   Note: ${move.note}`);
  } else {
    console.log(`⚠️  Source file not found: ${move.from}`);
  }
});

// Update package.json scripts
console.log('\n📝 Updating package.json...');
const packageJsonPath = 'package.json';
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add new scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'migrate': 'node scripts/migrate.js',
    'lint:fix': 'eslint . --ext ts,tsx --fix',
    'type-check': 'tsc --noEmit',
    'format': 'prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,scss}"'
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json with new scripts');
}

// Create .env.example
console.log('\n🔧 Creating environment configuration...');
const envExample = `# API Configuration
VITE_API_BASE_URL=https://upskilling-egypt.com:3000/api/v0
VITE_API_TIMEOUT=10000

# Environment
NODE_ENV=development

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id_here
`;

if (!fs.existsSync('.env.example')) {
  fs.writeFileSync('.env.example', envExample);
  console.log('✅ Created .env.example');
} else {
  console.log('⚠️  .env.example already exists');
}

// Create .gitignore entries
console.log('\n🚫 Updating .gitignore...');
const gitignorePath = '.gitignore';
const gitignoreEntries = [
  '',
  '# Environment variables',
  '.env',
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local',
  '',
  '# IDE',
  '.vscode/',
  '.idea/',
  '',
  '# Logs',
  '*.log',
  'npm-debug.log*',
  'yarn-debug.log*',
  'yarn-error.log*',
  '',
  '# Build outputs',
  'dist/',
  'build/',
  '',
  '# Dependencies',
  'node_modules/',
  '',
  '# OS',
  '.DS_Store',
  'Thumbs.db'
];

if (fs.existsSync(gitignorePath)) {
  const currentGitignore = fs.readFileSync(gitignorePath, 'utf8');
  const newEntries = gitignoreEntries.filter(entry => !currentGitignore.includes(entry.trim()));
  
  if (newEntries.length > 0) {
    fs.appendFileSync(gitignorePath, newEntries.join('\n'));
    console.log('✅ Added new entries to .gitignore');
  } else {
    console.log('⚠️  .gitignore already contains all entries');
  }
} else {
  fs.writeFileSync(gitignorePath, gitignoreEntries.join('\n'));
  console.log('✅ Created .gitignore');
}

console.log('\n🎉 Migration completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Review the new file structure');
console.log('2. Update import statements in your components');
console.log('3. Test the application to ensure everything works');
console.log('4. Remove old files after confirming everything works');
console.log('5. Update your documentation');
console.log('\n📖 See RESTRUCTURE_GUIDE.md for detailed migration instructions');
