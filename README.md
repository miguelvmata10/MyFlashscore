# ⚽ MyFlashscore - Study Project

This project is a personal initiative developed to deepen my knowledge of **React**, **API integration**, and **full-stack application structure**. It replicates the core functionality of apps like **Flashscore**, focusing on football match data, team lineups, tactical layouts, player visuals, etc.

The project consists of two main parts:
- 📱 **Client** – A frontend built with **React + Vite**, responsible for displaying match information and team details.
- ⚙️ **Server** – A simple Node.js/Express backend that acts as a proxy to external football APIs, handling secure API key usage and serving data to the client.

> 🔒 API keys are not included in the repository. See the individual `README.md` files inside `client/` and `server/` for setup instructions.

---

## 🗂️ Project Structure

---

## 🚀 Getting Started

To run the full project locally:

1. (Optional) If you want to enable API response caching, make sure you have a local Redis instance running.  
   You can quickly start one using Docker:

   ```bash
   docker run -d -p 6379:6379 --name redis redis

2. Start with the backend:  
   Go to [`/server`](./server) and follow the instructions in `README.md`

3. Then, start the frontend:  
   Go to [`/client`](./client) and follow the instructions in `README.md`

---

## 🎯 Main Features

- Match data display
- Graphical lineup visualization (including player images)
- Formation layout by team
- Tactical formation layout by team
- Match statistics (shots, possession, etc.)
- Modular React components
- API response caching using Redis (optional, local instance required)

---

## 📚 Purpose

This application was built as a **learning project** to explore:
- React component architecture
- API communication in the frontend and backend
- Secure handling of environment variables
- Basic full-stack development with separation of concerns

---