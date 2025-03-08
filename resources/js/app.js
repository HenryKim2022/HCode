import './bootstrap';
// import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';


import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

document.addEventListener('DOMContentLoaded', function () {
    const xcontainers = document.querySelectorAll('.x-scrollable');
    xcontainers.forEach(container => {
        if (container) {
            new PerfectScrollbar(container, {
                suppressScrollX: false, // Enable horizontal scroll
                suppressScrollY: true    // Disable vertical scroll
            });

            let startY; // Change to track vertical start position
            container.addEventListener('touchstart', (event) => {
                startY = event.touches[0].clientY; // Get initial vertical touch position
            });

            container.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY; // Calculate vertical movement

                // If the user is trying to scroll vertically more than horizontally
                if (Math.abs(moveY) > Math.abs(event.touches[0].clientX - container.getBoundingClientRect().left)) {
                    // Allow vertical scrolling by returning and not preventing default
                    return; // Let the event propagate for page scroll
                }

                // Prevent vertical scroll and allow horizontal scroll
                event.preventDefault(); // Prevent the default vertical scrolling
                container.scrollLeft += event.touches[0].clientX - container.getBoundingClientRect().left; // Scroll horizontally
            });
        }
    });

    const ycontainers = document.querySelectorAll('.y-scrollable');
    ycontainers.forEach(container => {
        if (container) {
            new PerfectScrollbar(container, {
                suppressScrollX: true,  // Disable horizontal scroll
                suppressScrollY: false   // Enable vertical scroll
            });

            let startY;
            container.addEventListener('touchstart', (event) => {
                startY = event.touches[0].clientY; // Get initial vertical touch position
            });

            container.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY;

                // If the user is trying to scroll horizontally more than vertically
                if (Math.abs(moveY) < Math.abs(event.touches[0].clientX - container.getBoundingClientRect().left)) {
                    event.preventDefault(); // Prevent vertical scrolling
                    container.scrollLeft += event.touches[0].clientX - container.getBoundingClientRect().left; // Scroll horizontally
                }
            });
        }
    });
});
