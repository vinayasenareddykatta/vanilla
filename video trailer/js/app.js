
/**
 * Initializes video trailer functionality by setting up play and close controls
 * @function initializeTrailer
 * @description Sets up event listeners for playing and closing a video trailer
 * Controls video playback and container visibility through CSS classes
 * The function:
 * - Selects DOM elements (play button, close button, video container, video)
 * - Defines playVideo handler to show video and start playback
 * - Defines closeVideo handler to hide video, pause and reset playback
 * - Attaches click event listeners to play and close buttons
 */
// refactor and optimize
const initializeTrailer = () => {
    const elements = {
        playButton: document.querySelector('.play-button'),
        closeButton: document.querySelector('.close-button'),
        container: document.querySelector('.trailer-container'),
        video: document.querySelector('video')
    };

    const handlers = {
        play: () => {
            elements.container.classList.remove('active');
            elements.video.play();
        },
        close: () => {
            elements.container.classList.add('active');
            elements.video.pause();
            elements.video.currentTime = 0;
        }
    };

    elements.playButton.addEventListener('click', handlers.play);
    elements.closeButton.addEventListener('click', handlers.close);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeTrailer);
