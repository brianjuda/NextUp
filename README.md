# NextUp

NextUp is a React + TypeScript application for managing your watchlist of movies and TV shows. It allows users to search for media, add them to their watchlist, and track their progress.

## Features

- **Search Media**: Search for movies and TV shows using the TMDB API.
- **Watchlist Management**: Add media to your watchlist and organize them by status (e.g., "On watchlist", "In progress", "Completed").
- **Progress Tracking**: Update the status of media in your watchlist.
- **Firebase Integration**: User authentication and real-time database for storing watchlist data.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- TMDB API Key (sign up at [TMDB](https://www.themoviedb.org/))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextup.git
   cd nextup

2. Install dependencies:

  ```bash
  npm install
  # or
  yarn install
  ```

3. Create a `.env` file in the root directory and add your TMDB API key:

  ```env
  VITE_TMDB_API_KEY=your_tmdb_api_key
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_firebase_app_id
  VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
  VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
  ```

4. Start the development server:

  ```bash
  npm run dev
  # or
  yarn dev
  ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

### Scripts

- `npm run dev` / `yarn dev`: Start the development server.
- `npm run build` / `yarn build`: Build the application for production.
- `npm run preview` / `yarn preview`: Preview the production build locally.
- `npm run lint` / `yarn lint`: Run ESLint to check for code issues.

### Project Structure

```plaintext
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages
│   ├── hooks/           # Custom React hooks
│   ├── context/         # Context providers
│   ├── services/        # API and Firebase services
│   ├── styles/          # Global and component-specific styles
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project metadata and scripts
```

### Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [TMDB API](https://www.themoviedb.org/) for providing movie and TV show data.
- [Firebase](https://firebase.google.com/) for authentication and database services.
- [Vite](https://vitejs.dev/) for the fast development environment.
- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) for the core application framework.
