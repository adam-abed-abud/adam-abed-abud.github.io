// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles background
    initParticles();
    
    // Add event listeners for card hover effects
    initCardEffects();
    
    // Add subtle parallax effect
    initParallax();
    
    // Initialize refresh button functionality
    initRefreshButton();
    
    // Initialize news ticker and expanded news
    initNewsFeatures();
});

// Initialize particles.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#3a86ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#3a86ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.6
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Add hover effects to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.asset-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Add subtle parallax effect
function initParallax() {
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const header = document.querySelector('header');
        const dashboard = document.querySelector('.dashboard');
        
        if (header && dashboard) {
            header.style.backgroundPositionX = `${x * 10}px`;
            header.style.backgroundPositionY = `${y * 10}px`;
            
            dashboard.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
        }
    });
}

// Initialize refresh button functionality
function initRefreshButton() {
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshCharts);
    }
}

// Refresh all charts with loading animations
function refreshCharts() {
    // Show loading state on button
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
        refreshButton.classList.add('refreshing');
        refreshButton.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
        
        setTimeout(() => {
            refreshButton.classList.remove('refreshing');
            refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Charts';
        }, 2000);
    }
    
    // Show loading overlays on widgets
    const overlays = document.querySelectorAll('.widget-overlay');
    overlays.forEach(overlay => {
        overlay.style.opacity = '1';
    });
    
    // Add refreshing animation to cards
    const cards = document.querySelectorAll('.asset-card');
    cards.forEach(card => {
        card.classList.add('refreshing');
    });
    
    // Add updating animation to comparison section
    const comparison = document.querySelector('.comparison-section');
    if (comparison) {
        comparison.classList.add('updating-widget');
    }
    
    // After a delay, hide overlays and remove animation classes
    setTimeout(() => {
        overlays.forEach(overlay => {
            overlay.style.opacity = '0';
        });
        
        cards.forEach(card => {
            card.classList.remove('refreshing');
        });
        
        if (comparison) {
            comparison.classList.remove('updating-widget');
        }
    }, 2000);
}

// Add a simple loading effect on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a subtle fade-in effect to the main elements
    const elements = [
        document.querySelector('header'),
        ...document.querySelectorAll('.asset-card'),
        document.querySelector('.comparison-section')
    ];
    
    elements.forEach((el, index) => {
        if (el) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        }
    });
});

// Initialize both news ticker and expanded news section
function initNewsFeatures() {
    fetchFinancialNews();
}

// Fetch financial news from a free RSS feed using RSS to JSON API
function fetchFinancialNews() {
    const newsList = document.getElementById('news-list');
    const expandedNews = document.getElementById('expanded-news');
    
    // Show loading state
    if (newsList) {
        newsList.innerHTML = '<li class="loading">Loading financial news...</li>';
    }
    if (expandedNews) {
        expandedNews.innerHTML = '<div class="news-loading"><div class="loading-indicator"></div><p>Loading detailed financial news...</p></div>';
    }
    
    // We're using rss2json.com API to convert RSS feeds to JSON
    // Using Yahoo Finance RSS feed as primary source
    const rssFeedUrl = 'https://finance.yahoo.com/news/rssindex';
    const rssToJsonApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;
    
    fetch(rssToJsonApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // Display news in both ticker and expanded section
                displayNewsItems(data.items);
                displayExpandedNews(data.items);
                console.log('Successfully loaded news from Yahoo Finance');
            } else {
                throw new Error('No items found in feed or feed status not ok');
            }
        })
        .catch(error => {
            console.error('Error fetching Yahoo Finance news:', error);
            // Try an alternative feed if the first one fails
            tryAlternativeFeed();
        });
}

// Try an alternative financial news feed if the first one fails
function tryAlternativeFeed() {
    const newsList = document.getElementById('news-list');
    const expandedNews = document.getElementById('expanded-news');
    
    // CNBC RSS feed as first backup
    const rssFeedUrl = 'https://www.cnbc.com/id/10000664/device/rss/rss.html';
    const rssToJsonApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;
    
    fetch(rssToJsonApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // Display news in both ticker and expanded section
                displayNewsItems(data.items);
                displayExpandedNews(data.items);
                console.log('Successfully loaded news from CNBC');
            } else {
                throw new Error('No items found in CNBC feed');
            }
        })
        .catch(error => {
            console.error('Error fetching CNBC news:', error);
            // Try one more alternative
            trySecondAlternativeFeed();
        });
}

// Try a second alternative feed as last resort
function trySecondAlternativeFeed() {
    const newsList = document.getElementById('news-list');
    const expandedNews = document.getElementById('expanded-news');
    
    // MarketWatch RSS feed as second backup
    const rssFeedUrl = 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml';
    const rssToJsonApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;
    
    fetch(rssToJsonApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                // Display news in both ticker and expanded section
                displayNewsItems(data.items);
                displayExpandedNews(data.items);
                console.log('Successfully loaded news from MarketWatch');
            } else {
                throw new Error('No items found in MarketWatch feed');
            }
        })
        .catch(error => {
            console.error('Error fetching all news sources:', error);
            // All feeds failed, show error message
            if (newsList) {
                newsList.innerHTML = '<li>Unable to load financial news. Please check your connection and try again later.</li>';
            }
            if (expandedNews) {
                expandedNews.innerHTML = `
                    <div class="news-error">
                        <i class="fas fa-exclamation-circle" style="font-size: 2rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
                        <h3>Unable to load financial news</h3>
                        <p>We couldn't retrieve the latest financial news at this time. Please check your internet connection and try again later.</p>
                        <button onclick="initNewsFeatures()" class="refresh-btn" style="margin-top: 1rem;">
                            <i class="fas fa-sync-alt"></i> Retry
                        </button>
                    </div>
                `;
            }
        });
}

// Display the retrieved news items in the ticker
function displayNewsItems(items) {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;
    
    // Clear the loading message
    newsList.innerHTML = '';
    
    // Limit to 8 news items for the ticker
    const newsItems = items.slice(0, 8);
    
    // Create a document fragment to minimize DOM updates
    const fragment = document.createDocumentFragment();
    
    // Add each news item to the ticker
    newsItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        // Clean up the title if needed (some RSS feeds have HTML entities or extra spaces)
        const title = document.createElement('div');
        title.innerHTML = item.title;
        const cleanTitle = title.textContent.trim();
        
        a.href = item.link;
        a.target = '_blank';
        a.textContent = cleanTitle;
        a.title = cleanTitle; // Add tooltip on hover
        
        li.appendChild(a);
        fragment.appendChild(li);
    });
    
    // Create duplicates for continuous scrolling
    // We need to clone the entire set to ensure smooth looping
    const originalItems = Array.from(fragment.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        fragment.appendChild(clone);
    });
    
    newsList.appendChild(fragment);
    
    // Set the animation duration based on the number of items
    const totalItems = newsItems.length * 2; // Original + duplicates
    const animationDuration = totalItems * 5; // 5 seconds per item
    newsList.style.animationDuration = `${animationDuration}s`;
    
    // Add pause on hover
    newsList.addEventListener('mouseenter', () => {
        newsList.style.animationPlayState = 'paused';
    });
    
    newsList.addEventListener('mouseleave', () => {
        newsList.style.animationPlayState = 'running';
    });
}

// Display detailed news in the expanded news section
function displayExpandedNews(items) {
    const expandedNews = document.getElementById('expanded-news');
    if (!expandedNews) return;
    
    // Clear the loading message
    expandedNews.innerHTML = '';
    
    // Limit to 6 news items for better performance and layout
    const newsItems = items.slice(0, 6);
    
    // Create a document fragment to minimize DOM updates
    const fragment = document.createDocumentFragment();
    
    // Format date function
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };
    
    // Extract excerpt function - gets first paragraph or first 150 chars
    const getExcerpt = (content) => {
        // Create a temporary div to parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // Try to get the first paragraph
        const firstParagraph = tempDiv.querySelector('p');
        if (firstParagraph) {
            return firstParagraph.textContent.trim().substring(0, 150) + '...';
        }
        
        // Fallback to first 150 chars of text content
        return tempDiv.textContent.trim().substring(0, 150) + '...';
    };
    
    // Add each news item to the expanded news section
    newsItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        // Check multiple sources for image
        // 1. Check if there's an enclosure object with a link (Yahoo Finance format)
        // 2. Check for thumbnail property
        // 3. Try to extract an image from content
        // 4. Use a placeholder as last resort
        let thumbnailUrl = '';
        
        // First check for enclosure with link
        if (item.enclosure && item.enclosure.link) {
            thumbnailUrl = item.enclosure.link;
        } 
        // Then check for thumbnail
        else if (item.thumbnail) {
            thumbnailUrl = item.thumbnail;
        }
        
        // If still no image, try to extract from content
        if (!thumbnailUrl && item.content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.content;
            const firstImg = tempDiv.querySelector('img');
            if (firstImg && firstImg.src) {
                thumbnailUrl = firstImg.src;
            }
        }
        
        // If still no image, try to extract from description
        if (!thumbnailUrl && item.description) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description;
            const firstImg = tempDiv.querySelector('img');
            if (firstImg && firstImg.src) {
                thumbnailUrl = firstImg.src;
            }
        }
        
        // If still no image, use a placeholder
        if (!thumbnailUrl) {
            thumbnailUrl = 'https://via.placeholder.com/350x180?text=Financial+News';
        }
        
        // Get excerpt from content or description
        let excerpt = '';
        if (item.content && item.content.trim()) {
            excerpt = getExcerpt(item.content);
        } else if (item.description && item.description.trim()) {
            excerpt = item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description;
        } else {
            excerpt = 'No description available for this article.';
        }
        
        const formattedDate = formatDate(item.pubDate);
        
        card.innerHTML = `
            <div class="news-img-container">
                <img src="${thumbnailUrl}" alt="${item.title}" class="news-img" onerror="this.src='https://via.placeholder.com/350x180?text=Financial+News'">
            </div>
            <div class="news-content">
                <div class="news-date">${formattedDate}</div>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${excerpt}</p>
                <a href="${item.link}" target="_blank" class="news-read-more">Read Full Article <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        fragment.appendChild(card);
    });
    
    expandedNews.appendChild(fragment);
} 