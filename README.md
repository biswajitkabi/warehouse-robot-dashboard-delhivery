# Warehouse Robot Dashboard

A real-time, responsive warehouse automation dashboard built for the Delhivery Frontend Intern Assignment.  
It simulates 10 warehouse robots, task allocation, task queue management, analytics, and live map visualization.

Live Demo:  
https://warehouse-robot-dashboard-delhivery-biswajit.vercel.app

---

# 1. How to Run the Project

## Prerequisites
- Node.js (v16 or higher)
- npm (or yarn)

## Installation
```
npm install
```

## Development Mode
```
npm run dev
```

## Production Build
```
npm run build
```

## Preview Production Build
```
npm run preview
```

---

# 2. Tech Stack

## Frontend
- React.js (Vite)
- Tailwind CSS
- Zustand
- Recharts
- React Router
- react-icons

## Build Tools
- Vite
- PostCSS + Autoprefixer

## Deployment
- Vercel

---

# 3. Component Architecture

```
src/
 ├── components/
 │    ├── Card.jsx
 │    ├── BotCard.jsx
 ├── layout/
 │    ├── MainLayout.jsx
 ├── pages/
 │    ├── DashboardPage.jsx
 │    ├── BotStatusPage.jsx
 │    ├── TaskAllocationPage.jsx
 │    ├── TaskQueuePage.jsx
 │    ├── AnalyticsPage.jsx
 │    ├── MapPage.jsx
 │    ├── AuthPage.jsx
 ├── stores/
 │    ├── useStore.js
 ├── utils/
 │    ├── mockBots.js
 ├── App.jsx
 ├── main.jsx
 ├── index.css
```

---

# 4. Data Flow Explanation

## 1. Application Load
- `seedBots(10)` initializes bots at startup.

## 2. Bot Auto-Update (Every 10 Seconds)
Triggered by:
```
tickBots() → randomUpdateBots()
```

Updates:
- Battery
- Status
- Speed
- Current Task
- Coordinates
- Last updated timestamp

## 3. Task Allocation
- User submits form → `addTask()`
- Immediately visible in queue

## 4. Task Queue Processing
```
popOldestTask() every 3 seconds
```

## 5. Analytics and Dashboard
- Realtime aggregation from Zustand global store

## 6. Map Overlay
- SVG uploaded by user
- Bots render as moving markers on top

---

# 5. State Management Reasoning

Zustand was chosen because:

- Minimal boilerplate
- High performance
- Does not trigger full re-renders like Context API
- Cleaner and simpler than Redux for this scale
- Easy to create actions (`tickBots`, `addTask`, `popOldestTask`)

State slices:

### auth
```
{ user, loggedIn }
```

### bots
```
[{ id, battery, status, speed, task, coordinates, lastUpdated }]
```

### tasks
```
[{ id, pickup, drop, priority, comments, createdAt }]
```

---

# 6. Deployment Details
Hosted on Vercel using:

```
Build Command: npm run build
Output Directory: dist
Framework Preset: Vite
```

Live Deployment:  
https://warehouse-robot-dashboard-delhivery-biswajit.vercel.app
