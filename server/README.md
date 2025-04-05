# ⚙️ Backend – MyFlashscore

This is the **backend** of the Flashscore clone, built with **Node.js** and **Express**. It serves as a proxy between the frontend and the external football data API, managing API key security and providing match data to the frontend.

## 🚀 Getting Started

### Pre-requisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** and navigate to the `server/` folder:
   ```bash
   git clone <repository-url>
   cd server

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the .env.example file to .env (create it) and add your API key. 
   ```bash
   cp .env.example .env
   ```
   Open the .env file and replace API_KEY with your own API key. You can get a free API key at [API-Football](https://www.api-football.com/).

4. **Start the server:**: 
   ```bash
   npm run dev
   ```
   Open the .env file and replace API_KEY with your own API key. You can get a free API key at [API-Football](https://www.api-football.com/).

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Start the production server
- `npm run lint` - Lint the code using ESLint

## 🧩 Tech Stack

- **Framework**: Node.js
- **Web Framework**: Express
- **HTTP Client**: Axios (to communicate with external API)
- **Caching**: Redis (for caching API responses, optional)

## 🔗 API Key
To test the backend and fetch football data, you will need a valid API key. You can create a free API key by registering at [API-Football](https://www.api-football.com/).

Once you have your key, follow these steps:

1. Copy the `.env.example` file to `.env`
2. Replace `API_KEY` in the `.env` file with your own key

This step is necessary to interact with the external football data API.

## 🛠️ Caching with Redis (Optional)
The backend uses Redis for caching API responses locally, to avoid unnecessary requests to the external API. If you want to enable caching, make sure you have Redis running locally.
If you don't want to use Redis, the app will still function, but performance may be slightly affected due to repeated API requests.
