# GUID Generator

A minimal, clean website for generating unique GUIDs (Globally Unique Identifiers) with duplicate prevention.

## Features

- Generate new GUIDs with one click
- Never repeats a GUID (tracked in backend memory)
- Copy to clipboard functionality
- Clean, minimal design with dark/light mode toggle
- Cylindrical bar UI with centered layout

## Setup

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

## Usage

1. Click the "Generate" button to create a new GUID
2. The GUID will appear in the cylindrical bar
3. Click the copy button (📋) on the right end of the bar to copy to clipboard
4. Toggle between dark and light mode using the button in the top right

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Backend**: Node.js with Express
- **GUID Generation**: Uses Node.js `crypto.randomUUID()` method
- **Duplicate Prevention**: Tracks all generated GUIDs in memory using a Set
- **Format**: Standard GUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
