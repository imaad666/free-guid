const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');

const app = express();
const PORT = 3000;

// Store used GUIDs in memory
const usedGuids = new Set();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Generate a new unique GUID
app.post('/api/generate', (req, res) => {
  let attempts = 0;
  const maxAttempts = 100; // Safety limit to prevent infinite loops
  
  while (attempts < maxAttempts) {
    const guid = randomUUID();
    
    if (!usedGuids.has(guid)) {
      usedGuids.add(guid);
      return res.json({ guid, success: true });
    }
    
    attempts++;
  }
  
  // Extremely unlikely, but handle the edge case
  res.status(500).json({ 
    error: 'Failed to generate unique GUID after multiple attempts',
    success: false 
  });
});

// Get count of used GUIDs (optional, for debugging)
app.get('/api/stats', (req, res) => {
  res.json({ count: usedGuids.size });
});

app.listen(PORT, () => {
  console.log(`GUID generator server running on http://localhost:${PORT}`);
});
