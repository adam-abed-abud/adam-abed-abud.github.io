class MosaicTransition {
  constructor() {
    this.overlay = null;
    this.tiles = [];
    this.isTransitioning = false;
    this.init();
  }

  init() {
    // Check if mosaic transition is enabled
    const enabled = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mosaic-enabled'));
    if (!enabled) return;

    // Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Get CSS variables
    this.ROWS = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mosaic-rows'));
    this.COLS = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--mosaic-cols'));
    this.DURATION = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mosaic-duration'));
    this.COVER_PERCENTAGE = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mosaic-cover-percentage'));

    // Create overlay
    this.createOverlay();
    
    // Build grid
    this.buildGrid();
    
    // Intercept navigation
    this.interceptNavigation();
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'mosaic-transition';
    this.overlay.className = 'mosaic-transition';
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.overlay);
  }

  buildGrid() {
    // Clear existing tiles
    this.overlay.innerHTML = '';
    this.tiles = [];

    // Build grid
    for (let r = 0; r < this.ROWS; r++) {
      for (let c = 0; c < this.COLS; c++) {
        const tile = document.createElement('div');
        tile.className = 'mosaic-tile';
        this.tiles.push(tile);
        this.overlay.appendChild(tile);
      }
    }
  }

  chooseActiveTiles() {
    // Clear previous state and assign fresh random delays
    const maxDelayRange = this.DURATION * 0.8;
    this.tiles.forEach(t => {
      t.classList.remove('active');
      t.style.transitionDelay = Math.round(Math.random() * maxDelayRange) + 'ms';
    });

    // Number of tiles to cover this run (at least 1 to avoid empty set)
    const k = Math.max(1, Math.round(this.COVER_PERCENTAGE * this.tiles.length));

    // Fisher–Yates shuffle indices, then take first k
    const idx = [...this.tiles.keys()];
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    
    for (let i = 0; i < k; i++) {
      this.tiles[idx[i]].classList.add('active');
    }

    return k;
  }

  async performTransition(targetUrl) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Fresh random selection + delays for this navigation
    this.chooseActiveTiles();

    this.overlay.classList.remove('revealing');
    this.overlay.classList.add('covering');

    const activeTiles = this.tiles.filter(t => t.classList.contains('active'));
    const maxDelay = activeTiles.length
      ? Math.max(...activeTiles.map(t => parseFloat(t.style.transitionDelay)))
      : 0;

    // Wait for covering animation to complete
    await new Promise(r => setTimeout(r, this.DURATION + maxDelay + 30));

    // Navigate to new page
    window.location.href = targetUrl;

    // Note: The revealing animation will happen on the new page
  }

  async performReveal() {
    // This is called when a page loads to reveal the content
    this.chooseActiveTiles();

    this.overlay.classList.remove('covering');
    this.overlay.classList.add('revealing');

    const activeTiles = this.tiles.filter(t => t.classList.contains('active'));
    const maxDelay = activeTiles.length
      ? Math.max(...activeTiles.map(t => parseFloat(t.style.transitionDelay)))
      : 0;

    await new Promise(r => setTimeout(r, this.DURATION + maxDelay + 30));
    this.overlay.classList.remove('revealing');
    this.isTransitioning = false;
  }

  updateTheme() {
    // Update the cover color based on current theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                   document.documentElement.classList.contains('dark');
    
    if (isDark) {
      document.documentElement.style.setProperty('--mosaic-cover-color', '#0b0d13');
    } else {
      document.documentElement.style.setProperty('--mosaic-cover-color', '#ffffff');
    }
  }

  interceptNavigation() {
    // Intercept all internal navigation links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip if it's an external link, anchor, or special link
      if (href.startsWith('http') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          href.startsWith('#') ||
          link.target === '_blank' ||
          link.hasAttribute('download')) {
        return;
      }

      // Skip if it's a dropdown toggle, search toggle, or other interactive elements
      if (link.getAttribute('data-toggle') || 
          link.id === 'search-toggle' ||
          link.id === 'light-toggle' ||
          link.classList.contains('dropdown-toggle') ||
          link.hasAttribute('data-bs-toggle')) {
        return;
      }

      // Skip if it's a form submission or other special navigation
      if (link.closest('form') || link.getAttribute('onclick')) {
        return;
      }

      e.preventDefault();
      this.performTransition(href);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      if (!this.isTransitioning) {
        this.performReveal();
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.mosaicTransition = new MosaicTransition();
  
  // Update theme initially
  window.mosaicTransition.updateTheme();
  
  // Listen for theme changes
  const observer = new MutationObserver(() => {
    window.mosaicTransition.updateTheme();
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
  });
  
  // Perform reveal animation on page load (unless it's a direct page load)
  if (document.referrer && document.referrer.includes(window.location.hostname)) {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
      window.mosaicTransition.performReveal();
    }, 100);
  }
});
