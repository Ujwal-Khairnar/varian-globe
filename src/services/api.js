const BASE = 'http://localhost:5000/api/v1';

const handleResponse = async (res) => {
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'API error');
  return data.data;
};

export const api = {
  // Challenges
  getChallenges: () =>
    fetch(`${BASE}/challenges`).then(handleResponse),

  getChallenge: (id) =>
    fetch(`${BASE}/challenges/${id}`).then(handleResponse),

  // Solutions
  getSolutions: (ids) => {
    const query = ids && ids.length ? `?ids=${ids.join(',')}` : '';
    return fetch(`${BASE}/solutions${query}`).then(handleResponse);
  },

  getSolution: (id) =>
    fetch(`${BASE}/solutions/${id}`).then(handleResponse),

  // Locations
  getLocations: () =>
    fetch(`${BASE}/locations`).then(handleResponse),

  // Sessions
  createSession: (data) =>
    fetch(`${BASE}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  updateSession: (id, data) =>
    fetch(`${BASE}/sessions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Log solution view
  logSolutionView: (solutionId, sessionId) =>
    fetch(`${BASE}/solutions/${solutionId}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    }).then(handleResponse),

  // Feedback
  submitFeedback: (data) =>
    fetch(`${BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),

  // Auth
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handleResponse),
};