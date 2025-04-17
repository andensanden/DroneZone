II1305 – Team ELIZA

Welcome to the official repository for Team ELIZA's project in the KTH course II1305 – Project in Computer Engineering. This project is a web-based application built with React, Vite, and Supabase, focusing on an interactive drone management interface.

🌐 Live Demo
👉 dronezone.se


📁 Project Structure:

II1305/
│
├── dronezone/              # Main application source
│   ├── public/             # Static assets
│   ├── src/                # Frontend source code (see details below)
│   ├── index.html          # Entry HTML file
│   ├── mapstyle.css        # Custom map styling
│   ├── package.json        # Project metadata & scripts
│   └── vite.config.js      # Vite configuration
│
├── eliza_members.txt       # Team member list
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation (you are here)

🚀 Getting Started

To run the project locally:

    Clone the repository:

git clone https://github.com/andensanden/II1305.git
cd II1305/dronezone

Install dependencies:

npm install

Start the development server:

npm run dev

The app will be available at http://localhost:5173.
📦 dronezone/src/ – Source Code Overview

This is the heart of the application, containing all UI logic, state management, and external integrations.
Key Files

    App.jsx – Root component and route definitions.

    main.jsx – App entry point.

    index.css – Global styles.

Directory Breakdown

    assets/ – Images and logos used in the UI.

    components/ – Reusable UI components shared across pages.

    pages/ – Route-level views such as:

        Home.jsx – Landing page

        Admin.jsx – Admin panel

        Map.jsx – Drone map interface

        About.jsx, NotFound.jsx – Informational pages

    Redux/ – State management via Redux Toolkit:

        Contains slices, actions, and store config

    hooks/ – Custom React hooks for logic reuse (e.g., Supabase queries)

    lib/ – Utility functions and helpers

    mapScripts/ – Map-specific logic and Leaflet setup

    supabase/ – Supabase client and backend interaction logic

🧑‍💻 Team Members

Add the names and roles of your team members here:

    Malin Andreasson, Scrum Master
    Rebecca Erhnrooth From, Developer
    Henrietta Gidehag, Developer
    Jesper Sandberg Hesselgren, Developer
    Wasim Shamieh, Developer
    Rasmus Sundbom, Developer
    Alexander Timsäter, Prodict Owner

🛠️ Tech Stack

    React
    Vite
    Supabase
    Redux Toolkit
    Leaflet – Interactive maps

For questions or feedback, please contact teameliza@proton.me
