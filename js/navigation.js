// Navigation and Animation Script for Cleartrip Presentation

// Get current slide number from URL
function getCurrentSlide() {
  const path = window.location.pathname;
  const match = path.match(/slide-(\d+)\.html/);
  return match ? parseInt(match[1]) : 0;
}

// Total number of slides
const TOTAL_SLIDES = 22;

// Store fullscreen state before navigation
function storeFullscreenState() {
  if (document.fullscreenElement) {
    sessionStorage.setItem('wasFullscreen', 'true');
  } else {
    sessionStorage.removeItem('wasFullscreen');
  }
}

// Navigate to a specific slide
function navigateToSlide(slideNumber) {
  if (slideNumber >= 0 && slideNumber <= TOTAL_SLIDES) {
    // Store fullscreen state before navigation
    storeFullscreenState();
    
    if (slideNumber === 0) {
      window.location.href = '../index.html';
    } else {
      window.location.href = `slide-${slideNumber}.html`;
    }
  }
}

// Restore fullscreen if it was active
function restoreFullscreenIfNeeded() {
  const wasFullscreen = sessionStorage.getItem('wasFullscreen');
  if (wasFullscreen === 'true') {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log('Auto-fullscreen blocked:', err);
          // Clear the flag if auto-fullscreen is blocked
          sessionStorage.removeItem('wasFullscreen');
        });
      }
    }, 100);
  }
}

// Initialize navigation
function initNavigation() {
  const currentSlide = getCurrentSlide();
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const slideIndicator = document.getElementById('slide-indicator');
  
  // Update slide indicator
  if (slideIndicator && currentSlide > 0) {
    slideIndicator.textContent = `Slide ${currentSlide} of ${TOTAL_SLIDES}`;
  }
  
  // Add fullscreen button for slides
  if (currentSlide > 0) {
    const navFooter = document.querySelector('.nav-footer');
    if (navFooter && !document.getElementById('present-button')) {
      const presentButton = document.createElement('button');
      presentButton.id = 'present-button';
      presentButton.className = 'nav-button secondary';
      presentButton.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
      presentButton.style.marginRight = 'auto';
      navFooter.insertBefore(presentButton, navFooter.firstChild);
    }
  }
  
  // Handle previous button
  if (prevButton) {
    if (currentSlide <= 1) {
      prevButton.onclick = () => navigateToSlide(0);
      prevButton.textContent = '← Home';
    } else {
      prevButton.onclick = () => navigateToSlide(currentSlide - 1);
      prevButton.textContent = '← Previous';
    }
  }
  
  // Handle next button
  if (nextButton) {
    if (currentSlide === 0) {
      nextButton.onclick = () => navigateToSlide(1);
      nextButton.textContent = 'Start Presentation →';
    } else if (currentSlide < TOTAL_SLIDES) {
      nextButton.onclick = () => navigateToSlide(currentSlide + 1);
      nextButton.textContent = 'Next →';
    } else {
      nextButton.disabled = true;
      nextButton.textContent = 'End of Presentation';
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      storeFullscreenState();
      navigateToSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight' && currentSlide < TOTAL_SLIDES) {
      storeFullscreenState();
      navigateToSlide(currentSlide + 1);
    } else if (e.key === 'Home') {
      storeFullscreenState();
      navigateToSlide(0);
    } else if (e.key === 'Escape') {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        sessionStorage.removeItem('wasFullscreen');
      } else {
        storeFullscreenState();
        navigateToSlide(0);
      }
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });
}

// Toggle fullscreen function
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      sessionStorage.setItem('wasFullscreen', 'true');
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
      sessionStorage.setItem('wasFullscreen', 'true');
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      sessionStorage.setItem('wasFullscreen', 'true');
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      sessionStorage.removeItem('wasFullscreen');
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      sessionStorage.removeItem('wasFullscreen');
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      sessionStorage.removeItem('wasFullscreen');
    }
  }
}

// Animate elements on page load
function animateElements() {
  // Animate metric values with counting effect
  const metricValues = document.querySelectorAll('.metric-value[data-value]');
  metricValues.forEach(element => {
    const finalValue = element.getAttribute('data-value');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = finalValue / steps;
    let currentValue = 0;
    
    const counter = setInterval(() => {
      currentValue += stepValue;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(counter);
      }
      
      // Format the number
      if (element.hasAttribute('data-prefix')) {
        element.textContent = element.getAttribute('data-prefix') + Math.round(currentValue).toLocaleString();
      } else if (element.hasAttribute('data-suffix')) {
        element.textContent = Math.round(currentValue).toLocaleString() + element.getAttribute('data-suffix');
      } else {
        element.textContent = Math.round(currentValue).toLocaleString();
      }
    }, duration / steps);
  });
  
  // Animate progress bars
  const progressBars = document.querySelectorAll('.progress-fill');
  progressBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-progress') || '0';
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, 300);
  });
  
  // Stagger animations for list items
  const listItems = document.querySelectorAll('.feature-list li, .timeline-item');
  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });
}

// Create interactive charts using Chart.js
function createCharts() {
  // Market Growth Chart
  const growthChart = document.getElementById('market-growth-chart');
  if (growthChart) {
    new Chart(growthChart, {
      type: 'line',
      data: {
        labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        datasets: [{
          label: 'Market Size (USD Billion)',
          data: [78, 85, 93, 102, 112, 119, 127, 131],
          borderColor: '#E15A2B',
          backgroundColor: 'rgba(225, 90, 43, 0.1)',
          borderWidth: 3,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Market Segmentation Chart
  const segmentChart = document.getElementById('market-segment-chart');
  if (segmentChart) {
    new Chart(segmentChart, {
      type: 'doughnut',
      data: {
        labels: ['Prominent Agents (15%)', 'Target Market (85%)'],
        datasets: [{
          data: [15, 85],
          backgroundColor: ['#2B6CB0', '#E15A2B'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }
  
  // Performance Chart
  const performanceChart = document.getElementById('performance-chart');
  if (performanceChart) {
    new Chart(performanceChart, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Packages Sold',
          data: [14, 19, 36, 29],
          backgroundColor: '#E15A2B'
        }, {
          label: 'GMV (Lakhs)',
          data: [7.84, 13.49, 36, 25.23],
          backgroundColor: '#2B6CB0',
          yAxisID: 'y-gmv'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            position: 'left',
            title: {
              display: true,
              text: 'Packages'
            }
          },
          'y-gmv': {
            beginAtZero: true,
            position: 'right',
            title: {
              display: true,
              text: 'GMV (Lakhs)'
            },
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const currentSlide = getCurrentSlide();
  
  if (touchEndX < touchStartX - 50 && currentSlide < TOTAL_SLIDES) {
    storeFullscreenState(); // Store state before navigation
    navigateToSlide(currentSlide + 1);
  }
  
  if (touchEndX > touchStartX + 50 && currentSlide > 0) {
    storeFullscreenState(); // Store state before navigation
    navigateToSlide(currentSlide - 1);
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Restore fullscreen state if needed
  restoreFullscreenIfNeeded();
  
  initNavigation();
  animateElements();
  initSmoothScroll();
  
  // Initialize charts if Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    createCharts();
  }
  
  // Touch event listeners
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });
  
  // Add presentation mode (fullscreen)
  const presentButton = document.getElementById('present-button');
  if (presentButton) {
    presentButton.addEventListener('click', () => {
      toggleFullscreen();
    });
  }
  
  // Update button text on fullscreen change
  document.addEventListener('fullscreenchange', () => {
    const presentButton = document.getElementById('present-button');
    if (presentButton) {
      if (document.fullscreenElement) {
        presentButton.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
        sessionStorage.setItem('wasFullscreen', 'true');
      } else {
        presentButton.innerHTML = '<i class="fas fa-expand"></i> ' + (getCurrentSlide() === 0 ? 'Present Fullscreen' : 'Fullscreen');
        sessionStorage.removeItem('wasFullscreen');
      }
    }
  });
  
  // Also handle webkit fullscreen change event for Safari
  document.addEventListener('webkitfullscreenchange', () => {
    const presentButton = document.getElementById('present-button');
    if (presentButton) {
      if (document.webkitFullscreenElement) {
        presentButton.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
        sessionStorage.setItem('wasFullscreen', 'true');
      } else {
        presentButton.innerHTML = '<i class="fas fa-expand"></i> ' + (getCurrentSlide() === 0 ? 'Present Fullscreen' : 'Fullscreen');
        sessionStorage.removeItem('wasFullscreen');
      }
    }
  });
});

// Utility function to format currency
function formatCurrency(value, currency = '₹') {
  return currency + value.toLocaleString('en-IN');
}

// Export functions for use in individual slides
window.presentationUtils = {
  navigateToSlide,
  formatCurrency,
  animateElements
}; 