import { randomUUID } from 'crypto';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let attempts = 0;
    const maxAttempts = 100; // Safety limit to prevent infinite loops
    
    while (attempts < maxAttempts) {
      const guid = randomUUID();
      
      // Check if GUID exists in KV store
      const exists = await kv.exists(`guid:${guid}`);
      
      if (!exists) {
        // Store the GUID in KV (set to 1, we just need to track existence)
        await kv.set(`guid:${guid}`, '1');
        
        // Increment total count
        await kv.incr('guid:count');
        
        return res.status(200).json({ guid, success: true });
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
      success: false 
    });
  }
}
