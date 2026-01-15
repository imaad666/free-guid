const { randomUUID } = require('crypto');
const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let attempts = 0;
    const maxAttempts = 100; // Safety limit to prevent infinite loops
    
    while (attempts < maxAttempts) {
      const guid = randomUUID();
      
      try {
        // Check if GUID exists in KV store
        const exists = await kv.exists(`guid:${guid}`);
        
        if (!exists) {
          // Store the GUID in KV (set to 1, we just need to track existence)
          await kv.set(`guid:${guid}`, '1');
          
          // Increment total count
          await kv.incr('guid:count');
          
          return res.status(200).json({ guid, success: true });
        }
      } catch (kvError) {
        // If KV is not configured, fall back to generating without persistence
        // This is a temporary fallback - KV should be configured for production
        console.error('KV error (falling back to non-persistent mode):', kvError);
        return res.status(200).json({ guid, success: true, warning: 'KV not configured - GUID not persisted' });
      }
      
      attempts++;
    }
    
    // Extremely unlikely, but handle the edge case
    return res.status(500).json({ 
      error: 'Failed to generate unique GUID after multiple attempts',
      success: false 
    });
  } catch (error) {
    console.error('Error generating GUID:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
