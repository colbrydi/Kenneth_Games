# Scratch Game Gallery

A minimal, mobile-first web gallery that automatically displays all public games from any Scratch account.

See an example: <https://github.com/colbrydi/Kenneth_Games/>

## Quick Start (5 minutes)

### 1. Fork this repository
Click the **Fork** button on GitHub

### 2. Edit `CONFIG.js`
Change this line to your Scratch username:
```javascript
scratchUsername: 'KenRemoLC',    // ← Change this
```

### 3. Enable GitHub Pages
- Settings → Pages
- Source: `main` branch, `root` folder
- Save

### 4. Done
Your gallery is live at: `https://[your-username].github.io/[repo-name]`

---

## Features

- 🔄 Auto-loads all public projects from your Scratch account
- 📱 Mobile-first, responsive design
- 🏠 Works as a PWA (add to Home Screen on iPhone/Android)
- 🌙 Clean dark theme
- ⚡ Zero dependencies, pure HTML/CSS/JavaScript
- 🚀 New games appear instantly when published

---

## How It Works

The gallery reads the Scratch username from `CONFIG.js`, fetches all your public projects from the Scratch API, and displays them in a beautiful gallery. When you publish a new game on Scratch, it appears automatically.

---

## Customization

**Change app name:**
Edit `CONFIG.js`:
```javascript
appName: 'My Awesome Games',
appShortName: 'My Games'
```

**Change colors:**
Edit `styles.css` - update `background-color` and `color` values

**Add to iPhone Home Screen:**
1. Open the gallery in Safari
2. Tap Share → "Add to Home Screen"
3. Opens fullscreen like an app!

---

## Code Structure

- **CONFIG.js** - User settings (edit this for customization)
- **script.js** - Gallery logic (5 clean modules)
- **index.html** - Page structure
- **styles.css** - All styling (mobile-first)
- **manifest.json** - PWA configuration
- **icons/** - App icons for Home Screen

---

## Troubleshooting

**"User not found" error:**
- Check username spelling in `CONFIG.js`
- Ensure account is public on Scratch
- Verify at: `https://scratch.mit.edu/users/[username]/`

**Games not showing:**
- Publish projects as public on Scratch
- Refresh the page

**Icon not showing on Home Screen:**
- Clear Safari cache: Settings > Safari > Clear History
- Remove and re-add app to Home Screen

---

## License

MIT - Feel free to fork and share!

---

Made with 💙 for Scratch creators
