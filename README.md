Motivational Planner — Project Setup and Usage Guide

This guide explains how to run the Motivational Planner project locally, including all steps for setup, file structure overview, and instructions.

📁 Project Structure

Your repository contains the following key files and folders:

Root Directory

index.html — Main entry page

landing.html — Landing page of the project

landing.css — Stylesheet for the landing page

landing.js — Script for landing page functionality

main.html — Main application interface

README.md — Project documentation

.DS_Store, .gitattributes — System and Git configuration files

Asset Folder (/Asset)

Contains all supporting files:

previewImage.png — Preview image for the project

style.css — Stylesheet for the test page or components

script.js — JavaScript logic for UI or planner functions

test.html — Test page for previewing components

⚙️ Requirements

To run this project locally, you only need:

A web browser (Chrome, Firefox, Edge, Safari, etc.)

(Optional) A simple web server for cleaner routing (VS Code Live Server, Python HTTP server, etc.)

No installation, frameworks, or backend services are required.

▶️ How to Run the Project
Method 1 — Open Directly in Browser (Simplest)

Download the project (ZIP or Git clone).

Extract the folder if downloaded as ZIP.

Open the file index.html in your browser.

The application will start immediately.

Method 2 — Using VS Code Live Server (Recommended)

Install Visual Studio Code.

Install the extension Live Server.

Open the project folder in VS Code.

Right‑click index.html > “Open with Live Server”.

Browser will open automatically with the project running.

Advantages:

Auto‑reload on save

Proper file path handling

Method 3 — Using a Local HTTP Server (Python)

If you have Python installed:

Open a terminal inside the project folder.

Run:

python3 -m http.server

Open browser and go to:

http://localhost:8000/index.html
🧪 Testing Components in /Asset Folder

If you want to preview or test the separate UI components:

Navigate to the Asset folder.

Open test.html in your browser.

This allows you to view isolated UI elements or scripts.
