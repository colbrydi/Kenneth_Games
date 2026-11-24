/**
 * 🎮 Scratch Game Gallery - Configuration File
 * 
 * ⭐ THIS IS THE ONLY FILE YOU NEED TO EDIT ⭐
 * 
 * Everything else in this gallery is FULLY MODULAR:
 * - Change settings here
 * - script.js reads these values
 * - HTML/CSS remain unchanged
 * - Works for any Scratch username
 */

// ============================================================================
// 👇 CUSTOMIZE THESE VALUES ONLY 👇
// ============================================================================

const CONFIG = {
    /**
     * Your Scratch username (required)
     * - Must be a public Scratch account
     * - Games must be published (public)
     * - Visit: https://scratch.mit.edu/users/[username]/
     * 
     * Example: 'griffpatch', 'my_scratch_name', etc.
     */
    scratchUsername: 'KenRemoLC',

    /**
     * App name shown in browser tab
     * Example: 'My Game Gallery', 'Kenneth Games', etc.
     */
    appName: 'Game Gallery',

    /**
     * Short name shown on Home Screen (keep it brief!)
     * Example: 'My Games', 'Ken Games', etc.
     */
    appShortName: 'Games'
};

// ============================================================================
// THAT'S IT! 👆 Everything else is automatic
// ============================================================================
// 
// How it works:
// 1. index.html loads this file first
// 2. script.js loads second and reads CONFIG
// 3. All values update automatically
// 4. No code changes needed!
//
// What happens:
// - Page title becomes: CONFIG.appName
// - User link shows: CONFIG.scratchUsername
// - Gallery loads projects from: https://scratch.mit.edu/users/[username]/
// - Updates automatically when you publish new games
//
// ============================================================================
