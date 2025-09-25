# Backend API Usage (Frontend)

The REST client is provided via src/lib/apiClient.js.
It reads base URL from REACT_APP_API_BASE_URL.

Examples:
import api from '../lib/apiClient';

// GET list
const projects = await api.get('/api/projects');

// POST create
const created = await api.post('/api/projects', { name: 'Kitchen Remodel', notes: 'Start next week' });

// Error handling
try {
  await api.get('/api/missing');
} catch (e) {
  console.error(e.status, e.data);
}
