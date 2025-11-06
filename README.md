# Motivational Planner

**Lightweight Student Study Planner and Motivation Web App**

Motivational Planner is a simple web application designed to help students organize their studies, maintain consistent study habits, and stay motivated with daily quotes. It works in low-bandwidth environments and can run entirely in a browser using local storage.

---

## Features

* **Study Planner**: Add subjects and track daily study hours.
* **Sessions & Reminders**: Create study sessions and receive browser alerts as reminders.
* **Notes**: Write and save notes locally.
* **Daily Motivation**: Display motivational quotes fetched from an online API (Quotable) with a fallback to local quotes.
* **Lightweight & Responsive**: Works on PCs and smartphones, optimized for low internet usage.

---

## Installation & Running

1. **Download or clone** the repository:

```bash
git clone <your-repo-url>
```

2. **Folder structure** should look like this:

```
motivational_planner/
│
├── index.html
├── style.css
├── app.js
│
├── data/
│   └── quotes.json
│
└── assets/
    ├── logo.png
    ├── banner.jpg
    └── illustration.png
```

3. **Open the app** in your browser:

* Simply double-click `index.html` or open it in any modern browser (Chrome, Firefox, Edge).
* No server or backend required for the prototype version.

4. **Browser notifications**:

* If you want session reminders, allow notifications when prompted by the browser.

---

## How It Meets the SRS Requirements

The app is built based on the SRS for EduConnect Lite, adapted to **Motivational Planner**:

| SRS Feature                        | Implementation in App                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| **FR 1: Study Plan Creation**      | Users can add subjects and daily study hours, stored in localStorage.         |
| **FR 2: User Login & Access**      | Simplified local usage; user data is stored locally (no login for prototype). |
| **FR 3: Reminders/Notifications**  | Browser alerts notify upcoming study sessions.                                |
| **FR 4: Motivational Quotes**      | Daily quotes fetched from API with local fallback, refreshable manually.      |
| **FR 5: Study Plan Management**    | Users can view and delete subjects, sessions, and notes.                      |
| **NFR 1: Security**                | Local storage only; no sensitive data transmitted.                            |
| **NFR 2: Performance**             | Works for multiple subjects/notes on single device; lightweight.              |
| **NFR 3: Usability**               | Simple, responsive interface with clear sections.                             |
| **NFR 4: Reliability**             | Offline support with local storage fallback.                                  |
| **NFR 5: Cross-browser support**   | Tested on Chrome, Edge, Firefox.                                              |
| **NFR 6: Technology**              | Works on PC and Android; lightweight requirements.                            |
| **NFR 7: Accessibility**           | Readable fonts, responsive design.                                            |
| **NFR 8: Motivation & Engagement** | Displays daily motivational quotes.                                           |

---

## Next Steps / Future Improvements

* Implement **user accounts** and cloud storage to persist data across devices.
* Enhance **UI/UX**: animations, color themes, and more interactive dashboard.
* Allow **custom reminder times** and notifications even when the browser is closed.
* Expand **multilingual support** for local languages.

---

## Credits

Built by **Kayumba David Pontient**

Motivational quotes API: [Quotable.io](https://api.quotable.io/)

---

This README provides **setup instructions, SRS mapping, and usage guidance** for anyone testing or deploying the prototype.

