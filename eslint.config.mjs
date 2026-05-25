import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier"; 
import prettierPlugin from "eslint-plugin-prettier"; 

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", 
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], 
    },
  },

  prettierConfig, 
  
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;