# Bounty Board App

A React frontend for a bounty and task management platform. Browse bounties, manage applications, and collaborate with teams through a dashboard and admin interface.

## Overview

- **Landing page** — Hero, explore bounties, filters, and how-it-works
- **Dashboard** — Overview, posted bounties, pending bounties, pending applications, post bounty, completed work
- **Admin** — Pending bounties review, bounty details (overview, milestones, files), teams, users, and profiles
- **Auth** — Register, login, reset password, verify email, protected routes
- **Profiles** — Public profile and account settings

Built with Create React App, React Router, Ant Design, TailwindCSS, and React Hook Form.

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/bounty-board-app.git
   cd bounty-board-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (optional)  
   Create a `.env` file in the project root if your backend or auth requires environment variables (e.g. API base URL).

4. **Run the development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Usage

- **Development:** `npm start` — runs the app with hot reload.
- **Production build:** `npm run build` — outputs to the `build` folder.
- **Tests:** `npm test` — runs the test runner.

## Tech Stack

- React 19, React Router 7
- Ant Design, TailwindCSS
- React Hook Form, dayjs, lucide-react

## License

Private / Unlicensed. Use according to your project terms.
