## 🖌️ AI-Powered Whiteboard Client

This is the frontend for the AI-Powered Whiteboard. By default, the app runs locally at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tech Stack

- **Framework:** Next.js (React, TypeScript)
- **Styling/UI:** Tailwind CSS, Shadcn UI components
- **Testing:** Jest

---

## 🔄 OpenAPI Client Generation

The client uses OpenAPI code generation for seamless integration with backend APIs. Run the following commands inside the `client` directory to (re-)generate API clients:

- **Server (Spring Boot) API:**
  ```bash
  npm run openapi:generate:main
  ```

- **Realtime Service API:**
  ```bash
  npm run openapi:generate:realtime
  ```

- **GenAI Service API:**
  ```bash
  npm run openapi:generate:genai
  ```

---

## 🚨 Linting, Formatting & Testing

- **Formatter:**  
  `npm run format` (Prettier)

- **Linter:**  
  `npm run lint` (ESLint)

- **Tests:**  
  `npm run test` (Jest)

- **Dependencies:**  
  `npm ci` (installs exact versions from lockfile)

---

## ⚡️ Running the App

**This client cannot be run in standalone mode**, because it requires authentication and communicates with the Spring Boot server, GenAI backend and Realtime Service.  
To test or run the full application, please refer to the root [`README.md`](../README.md) and follow instructions there for combined setup.

---

## 📁 Folder Structure

A brief overview of the `src/` structure:

```text
client/src
├── api         # Typed API clients generated from OpenAPI specifications
├── app         # Next.js app directory (routing, pages, layouts)
├── assets      # Static assets such as images and icons
├── components  # Reusable React components for the UI
├── hooks       # Custom React hooks
├── types       # TypeScript types and interfaces
└── util        # Utility/helper functions
```

---

For more information, be sure to check the main project documentation and other service-specific READMEs.
