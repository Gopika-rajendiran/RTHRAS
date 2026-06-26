<h1 align="center">
  🏥 RTHRAS
  <br/>
  <sub>Real-Time Hospital Resource Administration System</sub>
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.IO-4.7-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

<p align="center">
  A modular, real-time hospital resource management system that provides live visibility into doctor availability, blood bank inventory, and emergency facility status — powered by a Node.js + Socket.IO backend and a clean HTML5 frontend.
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [REST API Reference](#-rest-api-reference)
- [Real-Time Events](#-real-time-events-socketio)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**RTHRAS** (Real-Time Hospital Resource Administration System) is a full-stack web application built to give hospital administrators and front-desk staff instant, live visibility into critical resource states. It eliminates manual polling and paper-based tracking by replacing them with a live WebSocket-driven dashboard.

The system is designed with a clean, **beginner-friendly and modular architecture** that is fully functional out of the box while being ready for production-grade enhancements such as JWT authentication, mobile push notifications, and analytics pipelines.

> **Live Demo Scenario**: Open the Admin Dashboard and the Public Reception Display side-by-side. Submit any status change and watch the reception screen synchronize **instantly** — zero page refresh required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🩺 **Doctor Availability** | View, add, and update physician status and patient queue counts in real time |
| 🩸 **Blood Bank Management** | Track inventory levels (Available / Low / Critical) across all blood groups |
| 🚨 **Emergency Status Board** | Monitor and update ICU and Trauma center availability instantly |
| ⚡ **Zero-Refresh Sync** | Socket.IO broadcasts push updates to every connected client automatically |
| 📺 **Dual View System** | Separate Admin Dashboard and a high-visibility Public Reception Display |
| 🔐 **Session Protection** | Login-gated admin panel with client-side session management |
| 🗄️ **Auto-Seeding Database** | SQLite database is created and seeded with sample data on first run |
| 📦 **Zero-Config Startup** | Static frontend is served directly by the Express backend — no separate web server needed |

---

## 🗺️ System Architecture

The application follows an **event-driven, client-server paradigm**. HTTP REST APIs handle data writes, while Socket.IO WebSockets handle real-time broadcast events to all connected clients.

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND (HTML5 / JS)               │
│  ┌──────────────┐ ┌────────────────┐ ┌────────────┐ │
│  │  login.html  │ │  index.html    │ │reception   │ │
│  │  (Auth Gate) │ │(Admin Panel)   │ │.html       │ │
│  └──────────────┘ └───────┬────────┘ └─────┬──────┘ │
│                           │ HTTP REST       │        │
│  ┌────────────────────────▼────────────────▼──────┐ │
│  │         socketClient.js  (WebSocket Handler)    │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────┘
                           │  HTTP + WebSocket (ws://)
┌──────────────────────────▼──────────────────────────┐
│              NODE.JS + EXPRESS BACKEND               │
│  ┌──────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │ server.js│  │  Routes     │  │  Controllers   │  │
│  │ (Entry)  │→ │ /api/*      │→ │  (CRUD Logic)  │  │
│  └──────────┘  └─────────────┘  └───────┬────────┘  │
│  ┌───────────────────────────┐          │            │
│  │ socket.js + realtimeEmitter│◄─────────┘            │
│  │  (Socket.IO Broadcasts)   │                       │
│  └───────────────────────────┘                       │
└──────────────────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│                    SQLite DATABASE                    │
│         backend/database/hospital.db                 │
│  [doctors] | [blood_stock] | [emergency_status]      │
└──────────────────────────────────────────────────────┘
```

### Real-Time Synchronization Flow

1. **Admin Action** → Client sends HTTP `PUT` request to the REST API.
2. **Persistence** → Controller commits the change to the SQLite database.
3. **Broadcast** → `realtimeEmitter.js` fires a named Socket.IO event to all connected clients.
4. **Reactive Refresh** → Each client's `socketClient.js` listens for events and re-fetches the relevant data to update the UI.

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | v18+ | JavaScript runtime environment |
| **Express.js** | ^4.18.2 | HTTP server and RESTful routing |
| **Socket.IO** | ^4.7.2 | Real-time WebSocket communication |
| **SQLite3** | ^5.1.6 | Embedded relational database |
| **CORS** | ^2.8.5 | Cross-origin request handling |
| **Nodemon** | ^3.0.1 | Development auto-restart utility |

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Styling and responsive layout |
| **Tailwind CSS** | Utility-first styling framework |
| **Vanilla JavaScript** | Client-side logic and API calls |
| **Socket.IO Client** | Real-time WebSocket event listener |

---

## 📁 Project Structure

```
hospital-resource-dashboard/
│
├── backend/                        # Node.js + Express server
│   ├── server.js                   # Application entry point
│   ├── socket.js                   # Socket.IO initialization
│   ├── package.json                # Project dependencies
│   │
│   ├── config/
│   │   └── db.js                   # Database connection, schema creation & seeding
│   │
│   ├── database/
│   │   └── hospital.db             # SQLite database file (auto-generated)
│   │
│   ├── models/                     # Data model definitions
│   ├── routes/                     # Express route handlers
│   │   ├── authRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── bloodRoutes.js
│   │   └── emergencyRoutes.js
│   │
│   ├── controllers/                # Business logic & DB queries
│   │   ├── authController.js
│   │   ├── doctorController.js
│   │   ├── bloodController.js
│   │   └── emergencyController.js
│   │
│   ├── middleware/                 # Request middleware (auth guards, validators)
│   └── utils/
│       └── realtimeEmitter.js      # Socket.IO broadcast utility
│
├── frontend/                       # Static HTML/CSS/JS client
│   ├── index.html                  # Admin Command Center (requires login)
│   ├── login.html                  # Administrator login gate
│   ├── reception.html              # Public lobby display screen
│   │
│   ├── css/                        # Stylesheets
│   ├── js/                         # Client-side JavaScript modules
│   │   ├── auth.js                 # Session management
│   │   ├── dashboard.js            # Admin dashboard initializer
│   │   ├── doctor.js               # Doctor CRUD & UI engine
│   │   ├── blood.js                # Blood bank CRUD & UI engine
│   │   ├── emergency.js            # Emergency status CRUD & UI engine
│   │   ├── reception.js            # Public display initializer
│   │   └── socketClient.js         # Socket.IO event listener
│   │
│   ├── assets/                     # Icons, images, media
│   └── components/                 # Reusable HTML components
│
└── docs/
    └── TECHNICAL_GUIDE.md          # Comprehensive developer documentation
```

---

## 🗃️ Database Schema

The database is powered by **SQLite** and is automatically created and seeded on the first server startup via `backend/config/db.js`.

### `doctors`
Tracks physician availability, specialty, and patient queue counts.

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique doctor identifier |
| `name` | `TEXT` | `NOT NULL` | Full name (e.g., `Dr. Kumar`) |
| `department` | `TEXT` | — | Medical specialty (e.g., `Cardiology`) |
| `status` | `TEXT` | — | `Available` · `Busy` · `Emergency` · `Offline` |
| `queue_count` | `INTEGER` | `DEFAULT 0` | Number of waiting patients |

### `blood_stock`
Maintains real-time blood bank inventory across all groups.

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique stock entry identifier |
| `blood_group` | `TEXT` | `NOT NULL UNIQUE` | Blood type (e.g., `A+`, `O-`) |
| `status` | `TEXT` | — | `Available` · `Low` · `Critical` |
| `units` | `INTEGER` | `DEFAULT 0` | Physical units in storage |

### `emergency_status`
Tracks the real-time capacity of critical hospital facilities.

| Column | Type | Constraint | Description |
|---|---|---|---|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Entry ID (query `id = 1` for globals) |
| `icu_status` | `TEXT` | — | `ICU Available` · `ICU Full` |
| `trauma_status` | `TEXT` | — | `Trauma Ready` · `Trauma Busy` |
| `updated_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Last state change timestamp |

---

## 📡 REST API Reference

All API endpoints are prefixed with `/api` and return `application/json` responses.

### 🩺 Doctor Endpoints — `/api/doctors`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Fetch all doctors and their current status |
| `POST` | `/add` | Add a new doctor to the system |
| `PUT` | `/update/:id` | Update an existing doctor's details |

<details>
<summary><b>GET /api/doctors — Sample Response</b></summary>

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Dr. Kumar", "department": "Cardiology", "status": "Available", "queue_count": 0 },
    { "id": 2, "name": "Dr. Priya", "department": "Neurology", "status": "Busy", "queue_count": 3 }
  ]
}
```
</details>

<details>
<summary><b>POST /api/doctors/add — Request Body</b></summary>

```json
{
  "name": "Dr. Smith",
  "department": "Orthopedics",
  "status": "Available",
  "queue_count": 0
}
```
</details>

---

### 🩸 Blood Bank Endpoints — `/api/blood`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Fetch all blood group inventory records |
| `POST` | `/add` | Add a new blood group entry |
| `PUT` | `/update/:id` | Update units and status for a blood group |

<details>
<summary><b>GET /api/blood — Sample Response</b></summary>

```json
{
  "success": true,
  "data": [
    { "id": 1, "blood_group": "A+", "status": "Available", "units": 10 },
    { "id": 2, "blood_group": "O-", "status": "Low", "units": 2 }
  ]
}
```
</details>

---

### 🚨 Emergency Endpoints — `/api/emergency`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Fetch the current ICU and Trauma status |
| `PUT` | `/update` | Update ICU and/or Trauma center availability |

<details>
<summary><b>GET /api/emergency — Sample Response</b></summary>

```json
{
  "success": true,
  "data": {
    "id": 1,
    "icu_status": "ICU Available",
    "trauma_status": "Trauma Ready",
    "updated_at": "2026-05-18 21:50:00"
  }
}
```
</details>

<details>
<summary><b>PUT /api/emergency/update — Request Body</b></summary>

```json
{
  "icu_status": "ICU Full",
  "trauma_status": "Trauma Busy"
}
```
</details>

---

## ⚡ Real-Time Events (Socket.IO)

Upon any successful data mutation, the backend broadcasts named Socket.IO events to all connected clients. The client-side `socketClient.js` listens for these events and triggers UI re-renders without any page refresh.

| Event Name | Trigger Condition |
|---|---|
| `doctorsUpdated` | A doctor is added or their details are updated |
| `bloodUpdated` | A blood group stock entry is added or modified |
| `emergencyUpdated` | ICU or Trauma center status is changed |

```javascript
// frontend/js/socketClient.js
const socket = io("http://localhost:5000");

socket.on("doctorsUpdated",  () => { if (typeof fetchDoctors === 'function') fetchDoctors(); });
socket.on("bloodUpdated",    () => { if (typeof fetchBloodStock === 'function') fetchBloodStock(); });
socket.on("emergencyUpdated",() => { if (typeof fetchEmergencyStatus === 'function') fetchEmergencyStatus(); });
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
- **npm** (bundled with Node.js)
- **Git** — [Download here](https://git-scm.com/)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Gopika-rajendiran/RTHRAS.git
cd RTHRAS
```

**2. Navigate to the backend directory**
```bash
cd backend
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the server**

For production:
```bash
npm start
```

For development (auto-restart on file changes):
```bash
npm run dev
```

**5. Verify startup**

You should see the following in your terminal:
```
Connected to the SQLite database.
Server running on port 5000
```

> On the **first run**, the server auto-creates `backend/database/hospital.db` and seeds it with sample data. No manual setup required.

---

## 🖥️ Usage

Once the server is running, open your browser and navigate to:

| Portal | URL | Purpose |
|---|---|---|
| **Admin Login** | `http://localhost:5000` | Authenticate as administrator |
| **Admin Dashboard** | `http://localhost:5000/index.html` | Manage doctors, blood bank, emergency status |
| **Reception Display** | `http://localhost:5000/reception.html` | Public high-visibility live status board |

### Demo Credentials

```
Username: admin
Password: admin123
```

### Recommended Demo

Open **Admin Dashboard** and **Reception Display** in two separate browser windows side-by-side. Submit any status update in the admin panel and observe the reception screen sync **instantly** via WebSocket — no refresh needed.

---

## 🛣️ Future Roadmap

The following features are planned for upcoming development cycles:

- [ ] **📅 Patient Queue & Appointment System** — Active doctor-patient scheduling with priority management
- [ ] **🔔 Push Notification Alerts** — Toast and audio alarms for critical emergency events
- [ ] **🔒 JWT Authentication & RBAC** — Secure token-based login with role-based access control
- [ ] **🩸 Blood Reservation Pipeline** — Reserve blood units for scheduled surgeries with automated alerts
- [ ] **📊 Analytics Dashboard** — Historical data visualization using Chart.js
- [ ] **📱 Mobile-Responsive UI** — Optimized experience on tablet and mobile devices
- [ ] **🐳 Docker Support** — Containerized deployment for production environments

> For detailed technical blueprints on each roadmap feature, see the [Technical Developer Guide](docs/TECHNICAL_GUIDE.md).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature description'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please ensure your code follows the existing modular patterns and includes relevant comments for maintainability.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📖 Documentation

For a comprehensive deep-dive into the system architecture, database schema, API usage, and development blueprints, refer to the:

**[📘 Technical Developer Guide →](docs/TECHNICAL_GUIDE.md)**

---

<p align="center">
  Built with ❤️ for better hospital resource management
  <br/>
  <a href="https://github.com/Gopika-rajendiran/RTHRAS">⭐ Star this repository if you found it useful!</a>
</p>
