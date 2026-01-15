# GUID Generator

A minimal, clean website for generating unique GUIDs (Globally Unique Identifiers) with duplicate prevention.

## Features

- Generate new GUIDs with one click
- Never repeats a GUID (persisted in Vercel KV storage)
- Copy to clipboard functionality
- Clean, minimal design with dark/light mode toggle
- Cylindrical bar UI with centered layout

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Vercel Deployment

### Prerequisites
- Vercel account
- Vercel CLI installed (`npm i -g vercel`)

### Setup Steps

1. **Create Vercel KV Database:**
   - Go to your Vercel dashboard
   - Navigate to your project → Storage → Create Database
   - Select "KV" (Redis)
   - Create the database

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   Or connect your GitHub repo to Vercel for automatic deployments

3. **Environment Variables:**
   - Vercel will automatically set `KV_REST_API_URL` and `KV_REST_API_TOKEN` when you connect KV
   - These are automatically available to your serverless functions

4. **That's it!** Your app will be live with persistent storage.

## Usage

1. Click the "Generate" button to create a new GUID
2. The GUID will appear in the cylindrical bar
3. Click the copy button (📋) on the right end of the bar to copy to clipboard
4. Toggle between dark and light mode using the button in the top right

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Backend**: Vercel Serverless Functions
- **Storage**: Vercel KV (Redis) for persistent GUID tracking
- **GUID Generation**: Uses Node.js `crypto.randomUUID()` method
- **Duplicate Prevention**: Tracks all generated GUIDs in Vercel KV (persists across deployments)
- **Format**: Standard GUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

## Project Structure

```
/
├── api/
│   ├── generate.js    # Serverless function to generate GUIDs
│   └── stats.js       # Serverless function to get stats
├── public/
│   ├── index.html     # Frontend HTML
│   ├── style.css      # Styles
│   └── script.js      # Frontend JavaScript
├── server.js          # Local development server (optional)
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies
```
