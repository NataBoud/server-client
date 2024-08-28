# React-Client

Use [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) and [NextUI](https://nextui.org/)

```bash
npx degit reduxjs/redux-templates/packages/vite-template-redux .
npm i
npm install @nextui-org/react framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i @types/node
npm i react-router-dom
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
