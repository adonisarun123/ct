# Fullscreen Presentation Mode Guide

## Overview
The Cleartrip Holiday Business Strategy presentation now includes comprehensive fullscreen functionality across all slides.

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

## Implementation Details

### JavaScript (navigation.js)
```javascript
// Toggle fullscreen function
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    document.documentElement.requestFullscreen();
  } else {
    // Exit fullscreen
    document.exitFullscreen();
  }
}
```

### Features
1. **Dynamic Button Creation**: The fullscreen button is automatically added to slide pages that don't have it
2. **Cross-browser Support**: Works with webkit and MS prefixed versions
3. **Visual Feedback**: Button text changes between "Fullscreen" and "Exit Fullscreen"
4. **Keyboard Support**: F key toggles fullscreen, Escape exits
5. **Seamless Navigation**: All navigation features work in fullscreen mode

### Navigation in Fullscreen
- **Arrow Keys**: Navigate between slides
- **Home Key**: Return to index page
- **Escape Key**: Exit fullscreen (or return home if not in fullscreen)
- **Touch Gestures**: Swipe left/right on mobile devices

## Best Practices for Presenting
1. Start from the index page and click "Present Fullscreen"
2. Use arrow keys for smooth navigation
3. Press F to quickly toggle fullscreen during presentation
4. The presentation maintains all animations and interactive elements in fullscreen

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (webkit prefix handled)
- Mobile browsers: Touch gestures supported 