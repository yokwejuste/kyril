# Project Overview

This project includes a React frontend, Django backend, and uses WebSocket connections for real-time data updates. Below is the project structure and how to use the provided `make` commands for easy management.

## Project Structure
    .
    ├── build
    │   ├── asset-manifest.json
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   ├── robots.txt
    │   └── static
    │       ├── css
    │       │   ├── main.4291f673.css
    │       │   └── main.4291f673.css.map
    │       └── js
    │           ├── main.396b15f1.js
    │           ├── main.396b15f1.js.LICENSE.txt
    │           └── main.396b15f1.js.map
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── App.css
    │   ├── App.js
    │   ├── Form.js
    │   ├── index.css
    │   ├── index.js
    │   └── Submissions.js
    └── tailwind.config.js
    
    7 directories, 28 files

## Commands

Use the following commands to manage the project. You can run these commands by typing `make <command>` or simply `make` or `make help` to display the help utility for available commands.

### General Commands

- `make up`: Start all services in detached mode.
- `make down`: Take down all running services.
- `make stop`: Stop services.
- `make start`: Start services.

### Django Backend Commands

- `make migrate`: Run database migrations.
- `make migrations`: Create new database migrations based on model changes.

### Service Management

- `make start-server`: Start the Django backend.
- `make stop-server`: Stop the Django backend.
- `make start-client`: Start the React frontend.
- `make stop-client`: Stop the React frontend.

### Logs

- `make logs`: Follow log output from services.

For detailed information on each command and more utilities, run `make` or `make help`.
