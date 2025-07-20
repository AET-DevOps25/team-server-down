## AI-Powered Whiteboard Client

This is the client for AI-Powered Whiteboard. The frontend runs locally on http://localhost:3000

## Tech Stack

We used Next.js with typescript as our primary framework for building the application, and for the UI components, we utilized the ShadCn and tailwind to create a consistent and modern user interface.

## Development with Docker

In order to start the client, server and genai run the below command 

`docker compose up`

 and in order to build do 

`docker compose up --build`

## Development without Docker

Navigate to client folder and then run the following command for local development 

`npm run dev`

or to build the client do 

`npm run build`

To check for linting errors, run:

`npm run lint`

## OpenAPI Client Generation

To generate or update the OpenAPI client for the server, run the following command inside the client directory:

`npm run openapi:generate:main`

To generate or update the OpenAPI client for the realtime service, use:

`npm run openapi:generate:realtime`

For the GenAI OpenAPI client, run:

`npm run openapi:generate:genai`







