# React-Client

Use [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) and [NextUI](https://nextui.org/)

```bash
npx degit reduxjs/redux-templates/packages/vite-template-redux .
npm i
npm install @nextui-org/react framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
In `tailwind.config.js` add this:
```javascript
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```
```javascript
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
```

Add the `NextUIProvider` at the `root` of your application:
```javascript
import * as React from "react";

// 1. import `NextUIProvider` component in main.tsx
import {NextUIProvider} from "@nextui-org/react";

function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <YourApplication />
    </NextUIProvider>
  );
}
```

Import to `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```






Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
#   s e r v e r - c l i e n t  
 