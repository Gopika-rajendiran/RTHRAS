# Project Workflow

1. **User Authentication**: Login via `authRoutes.js`.
2. **Dashboard Overview**: `dashboard.js` fetches initial data and listens for real-time updates via `socketClient.js`.
3. **Data Updates**: Reception or admins update resources via `reception.html`.
4. **Real-time Notifications**: Backend emits events via `realtimeEmitter.js` which are received by all connected clients.
