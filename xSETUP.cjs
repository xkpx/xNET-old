// ===================================================
// https://pnpm.io/npmrc 
// https://docs.npmjs.com/cli/v8/using-npm/config/
// =================================================== 05.07.2022 
const {execSync} = require('child_process');    
	execSync("set NODE_ENV=production", { stdio: "inherit" }); 
	execSync("pnpm env use --global latest", { stdio: "inherit" });  // nightly=19 nightly=18.4 	
	execSync("pnpm install -D --no-optional svelte @sveltejs/kit@next javascript-obfuscator rollup-obfuscator", { cwd: process.cwd(), detached: false, stdio: "inherit" });
	execSync("pnpm install -D --no-optional svelte-preprocess svelte-check", { cwd: process.cwd(), detached: false, stdio: "inherit" }); // tslib2.4 typescript@next4.8?
	execSync("pnpm install -P express@next dotenv @sveltejs/adapter-node@next svelte-adapter-deno", { cwd: process.cwd(), detached: false, stdio: "inherit" });
	execSync("pnpm store prune", 						{ cwd: process.cwd(), detached: false, stdio: "inherit" }); // Removes store unnecessary packages.
	execSync("pnpm install --fix-lockfile", 			{ cwd: process.cwd(), detached: false, stdio: "inherit" });

/*	execSync("pnpm config set hoist true --userconfig .npmrc"); 
	execSync("pnpm uninstall node-pre-gyp -r")				
	execSync("pnpm install @mapbox/node-pre-gyp esbuild-windows-64 chokidar");	// pnp+symlink/false
	pnpm prune --no-optional --prod
	execSync("pnpm up --latest --interactive", 			{ cwd: process.cwd(), detached: false, stdio: "inherit" });
	execSync("pnpm outdated", 							{ cwd: process.cwd(), detached: false, stdio: "inherit" }); */
