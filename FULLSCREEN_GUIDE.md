# Fullscreen Presentation Mode Guide

## Overview
The Cleartrip Holiday Business Strategy presentation now includes comprehensive fullscreen functionality across all slides with persistent fullscreen state during navigation.

## How to Use Fullscreen Mode

### From Index Page
- Click the **"Present Fullscreen"** button at the bottom of the index page
- This will enable fullscreen mode for the entire browser window

### From Any Slide
- A **"Fullscreen"** button is automatically added to the navigation footer of each slide
- Click this button to enter fullscreen mode
- When in fullscreen, the button changes to **"Exit Fullscreen"**

### Keyboard Shortcuts
- Press **F** key on any slide to toggle fullscreen mode
- Press **Escape** key to exit fullscreen mode
- Arrow keys continue to work for navigation in fullscreen

## Persistent Fullscreen Navigation
**NEW**: Fullscreen mode now persists when navigating between slides!
- When you click Next/Previous buttons in fullscreen, the presentation stays in fullscreen
- Arrow key navigation also maintains fullscreen state
- Touch gestures on mobile maintain fullscreen
- Fullscreen only exits when you explicitly:
  - Click "Exit Fullscreen" button
  - Press Escape key
  - Use browser's exit fullscreen gesture

## Implementation Details

### JavaScript (navigation.js)
```javascript
// Store fullscreen state before navigation
function storeFullscreenState() {
  if (document.fullscreenElement) {
    sessionStorage.setItem('wasFullscreen', 'true');
  }
}

// Restore fullscreen after page load
function restoreFullscreenIfNeeded() {
  const wasFullscreen = sessionStorage.getItem('wasFullscreen');
  if (wasFullscreen === 'true') {
    document.documentElement.requestFullscreen();
  }
}
```

### Features
1. **Dynamic Button Creation**: The fullscreen button is automatically added to slide pages that don't have it
2. **Cross-browser Support**: Works with webkit and MS prefixed versions
3. **Visual Feedback**: Button text changes between "Fullscreen" and "Exit Fullscreen"
4. **Keyboard Support**: F key toggles fullscreen, Escape exits
5. **Seamless Navigation**: All navigation features work in fullscreen mode
6. **Persistent State**: Fullscreen mode persists across slide transitions using sessionStorage

### Navigation in Fullscreen
- **Arrow Keys**: Navigate between slides (maintains fullscreen)
- **Home Key**: Return to index page (maintains fullscreen)
- **Escape Key**: Exit fullscreen
- **Touch Gestures**: Swipe left/right on mobile devices (maintains fullscreen)
- **Next/Previous Buttons**: Navigate while staying in fullscreen

## Best Practices for Presenting
1. Start from the index page and click "Present Fullscreen"
2. Use arrow keys for smooth navigation
3. The presentation will stay in fullscreen throughout your entire presentation
4. Only press Escape or click "Exit Fullscreen" when you're done presenting

## Browser Compatibility
- Chrome/Edge: Full support with automatic fullscreen restoration
- Firefox: Full support with automatic fullscreen restoration
- Safari: Full support (webkit prefix handled)
- Mobile browsers: Touch gestures supported (fullscreen behavior may vary by browser)

## Note on Browser Security
Some browsers may require user interaction to enter fullscreen mode. If automatic fullscreen restoration is blocked after navigation, you can quickly press 'F' to re-enter fullscreen mode. 