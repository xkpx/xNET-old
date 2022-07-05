import preprocess from 'svelte-preprocess'; // seo opt
import { obfuscator } from 'rollup-obfuscator'; // obfs
//import adapter from '@sveltejs/adapter-node';
import adapter from 'svelte-adapter-deno';


/** @type {import('@sveltejs/kit').Config} */
const config = {
  // options passed to svelte.compile (https://svelte.dev/docs#compile-time-svelte-compile)
    compilerOptions: {
        // =====
        "sourcemap": false, 
        "enableSourcemap": { js: 0, css: 0, },
        "dev": false, //"dev": process.env.NODE_ENV !== 'production',
        "css": false,
    },
 
  // an array of file extensions that should be treated as Svelte components
  extensions: ['.svelte'],
 
  kit: {
    adapter: adapter({ 
       /*
        out: 'xbuild_node',
        precompress: true, // using gzip and brotli for assets and prerendered pages
            envPrefix: 'XKP_' // XKP_HOST , XKP_PORT ... etc
        */
        out: 'xbuild_deno', // https://github.com/pluvial/svelte-adapter-deno
        precompress: true, // using gzip and brotli for assets and prerendered pages
        env: {
          path: 'xbuild-deno',
          host: '127.0.0.1',
          port: '8080',
        },
        deps: './xDENO.ts' // (relative to adapter-deno package) -- fix https://github.com/pluvial/svelte-adapter-deno/issues/3
        
    }),
    alias: {},
    appDir: '_app',
    browser: {
      hydrate: true,
      router: true
    },
    csp: {
      mode: 'auto',
      directives: {
        'default-src': undefined
        // ...
      }
    },
    moduleExtensions: ['.js', '.ts'],
    files: {
      assets: 'static',
      hooks: 'src/hooks',
      lib: 'src/lib',
      params: 'src/params',
      routes: 'src/routes',
      serviceWorker: 'src/service-worker',
      template: 'src/app.html'
    },
    floc: false,
    inlineStyleThreshold: 0,
    methodOverride: {
      parameter: '_method',
      allowed: []
    },
    outDir: '.svelte-kit',
    package: {
      dir: 'package',
      emitTypes: true,
      // excludes all .d.ts and files starting with _ as the name
      exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
      files: () => true
    },
    paths: {
      assets: '',
      base: ''
    },
    prerender: {
      concurrency: 1,
      crawl: true,
      default: false,
      enabled: true,
      entries: ['*'],
      onError: 'fail'
    },
    routes: (filepath) => !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath),
    serviceWorker: {
      register: true,
      files: (filepath) => !/\.DS_Store/.test(filepath)
    },
    trailingSlash: 'never',
    version: {
      name: Date.now().toString(),
      pollInterval: 0
    },
    vite: () => ({
      // =====
      prebundleSvelteLibraries: true,
      optimizeDeps: {
          entries: []
      },  
      plugins: [
        obfuscator({  // https://github.com/javascript-obfuscator/javascript-obfuscator
                // Check a11y first then crypt !
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                // debugProtection: true,
                // debugProtectionInterval: 4000,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                    selfDefending: false,                 // Fatal JavaScript invalid size error 184071938
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 5,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayEncoding: ['rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 5,              //  High performance = 1  High obfuscation = 5 
                stringArrayWrappersChainedCalls: true,    
                stringArrayWrappersParametersMaxCount: 5,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 1,
                transformObjectKeys: true,
                unicodeEscapeSequence: false,
                
                  include: [
                      'src/routes/*.svelte' //''
                  ],
          sourceMap: false,
          global: false
                }),
          ]
      })
    },
 
    // SvelteKit uses vite-plugin-svelte. Its options can be provided directly here.
    // See the available options at https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md
    experimental: {
        useVitePreprocess: true
    },
    // options passed to svelte.preprocess (https://svelte.dev/docs#compile-time-svelte-preprocess)
    preprocess: preprocess({
        preserve: ['ld+json'],
        sourceMap: process.env.NODE_ENV !== 'production',
    }),
};

/*
config.kit.vite.preview = {
  https: {
     key: readFileSync(resolve(__dirname, "my-dev.key"), "utf8"),
     cert: readFileSync(resolve(__dirname, "my-dev.crt"), "utf8")
  }
};
*/
 
export default config;