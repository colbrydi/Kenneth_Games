/**
 * Mobile Scratch Game Gallery
 * 
 * STRUCTURE:
 * 1. CONFIG.js loads first (user settings)
 * 2. script.js loads second (this file)
 * 3. Modular functions handle: config, API calls, DOM updates
 * 
 * To customize: Edit CONFIG.js only
 * To extend: Add new functions following the same pattern
 */

// ============================================================================
// API CONFIGURATION (from CONFIG.js, defined globally)
// ============================================================================

const SCRATCH_API_BASE = 'https://api.scratch.mit.edu';
const SCRATCH_CDN_BASE = 'https://cdn2.scratch.mit.edu/get_image/project/';
const SCRATCH_PROJECT_BASE = 'https://scratch.mit.edu/projects/';

// ============================================================================
// MODULE 1: Configuration & Initialization
// ============================================================================

/**
 * Initialize page with user configuration
 * Updates: page title, user link, user profile
 */
async function initializeConfig() {
    if (!CONFIG || !CONFIG.scratchUsername) {
        showError('CONFIG.js is missing or invalid. Please check the file.');
        return false;
    }

    const username = CONFIG.scratchUsername;

    // Update browser tab and app title
    document.title = CONFIG.appName || 'Game Gallery';

    // Update user link
    const userLink = document.getElementById('user-link');
    const userIcon = document.getElementById('user-icon');
    const usernameText = document.getElementById('username-text');
    
    if (userLink) {
        userLink.href = `https://scratch.mit.edu/users/${username}/`;
    }
    
    if (usernameText) {
        usernameText.textContent = username;
    }

    // Fetch user profile to get icon
    try {
        const userResponse = await fetchWithFallback(
            `${SCRATCH_API_BASE}/users/${username}/`
        );
        
        if (userResponse.ok) {
            const userProfile = await userResponse.json();
            if (userProfile.profile && userProfile.profile.images && userProfile.profile.images['90x90'] && userIcon) {
                userIcon.src = userProfile.profile.images['90x90'];
                userIcon.alt = `${username}'s profile picture`;
            }
        }
    } catch (error) {
        console.warn('Could not load user profile icon:', error);
    }

    return true;
}

// ============================================================================
// MODULE 2: Data Loading
// ============================================================================

/**
 * Fetch with CORS proxy fallback
 * Handles CORS errors and network errors gracefully
 * Used only for fetching user profile icon (server-to-server requests don't need this)
 */
async function fetchWithFallback(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return response;
        }
        // If not ok, try with proxy for CORS issues
        console.warn('Direct fetch failed or blocked by CORS, trying proxy...');
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        return await fetch(proxyUrl);
    } catch (error) {
        // Network error - try proxy
        console.warn('Direct fetch error, trying CORS proxy:', error.message);
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        return await fetch(proxyUrl);
    }
}

/**
 * Load all projects from projects.json
 * Returns: array of project objects {id, title, description, featured}
 */
async function loadProjects() {
    try {
        const response = await fetch('projects.json');

        if (!response.ok) {
            throw new Error(
                `Failed to load projects.json (HTTP ${response.status})`
            );
        }

        const projects = await response.json();

        if (!Array.isArray(projects) || projects.length === 0) {
            throw new Error(
                `No projects found in projects.json. ` +
                `The daily update may not have run yet. Try again later.`
            );
        }

        return projects;

    } catch (error) {
        showError(error.message);
        return [];
    }
}

// ============================================================================
// MODULE 3: DOM Rendering & UI
// ============================================================================

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Generate thumbnail URL for a project
 */
function getThumbnailUrl(projectId) {
    return `${SCRATCH_CDN_BASE}${projectId}_480x360.png`;
}

/**
 * Generate Scratch project URL
 */
function getProjectUrl(projectId) {
    return `${SCRATCH_PROJECT_BASE}${projectId}/`;
}

/**
 * Create a game card DOM element
 */
function createGameCard(project) {
    const card = document.createElement('a');
    card.href = getProjectUrl(project.id);
    card.className = 'game-card';
    card.target = '_self';
    card.setAttribute('rel', 'noopener noreferrer');
    card.setAttribute('tabindex', '0');

    const thumbnailUrl = getThumbnailUrl(project.id);

    card.innerHTML = `
        <img 
            src="${thumbnailUrl}" 
            alt="${escapeHtml(project.title)}" 
            class="game-thumbnail"
            loading="lazy"
            decoding="async"
        >
        <div class="game-info">
            <h2 class="game-title">${escapeHtml(project.title)}</h2>
            ${project.description ? `<p class="game-description">${escapeHtml(project.description)}</p>` : ''}
            ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
    `;

    return card;
}

/**
 * Render all projects to the gallery container
 */
function renderProjects(projects) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No projects to display.</p>';
        return;
    }

    projects.forEach(project => {
        if (project.id && project.title) {
            const card = createGameCard(project);
            container.appendChild(card);
        }
    });
}

/**
 * Display error message to user
 */
function showError(message) {
    const errorContainer = document.getElementById('error-message');
    if (!errorContainer) return;

    errorContainer.className = 'error-message';
    errorContainer.innerHTML = `
        <h2>Unable to Load Gallery</h2>
        <p>${escapeHtml(message)}</p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
            Check CONFIG.js for the correct Scratch username.
        </p>
    `;
}

// ============================================================================
// MODULE 4: Initialization & Event Handlers
// ============================================================================

/**
 * Main gallery initialization
 * Runs when DOM is ready
 */
async function initializeGallery() {
    // Step 1: Configure page with user settings
    if (!await initializeConfig()) {
        return;
    }

    // Step 2: Fetch projects from Scratch API
    const projects = await loadProjects();

    // Step 3: Render projects to gallery
    renderProjects(projects);
}

/**
 * Handle image load errors gracefully
 */
document.addEventListener('error', (e) => {
    if (e.target.classList && e.target.classList.contains('game-thumbnail')) {
        e.target.style.backgroundColor = '#333';
    }
}, true);

/**
 * Start gallery when DOM is ready
 */
document.addEventListener('DOMContentLoaded', initializeGallery);
