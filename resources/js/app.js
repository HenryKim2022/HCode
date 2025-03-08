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

            let startY;
            container.addEventListener('touchstart', (event) => {
                startY = event.touches[0].clientY; // Get initial vertical touch position
            });

            container.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY; // Calculate vertical movement
                const moveX = event.touches[0].clientX - container.getBoundingClientRect().left; // Calculate horizontal movement

                // Determine if the user is trying to scroll vertically more than horizontally
                if (Math.abs(moveY) > Math.abs(moveX)) {
                    // If vertical movement is greater, allow the page to scroll
                    return; // Let the event propagate for page scroll
                }

                // If horizontal movement is greater, prevent the default vertical scrolling
                event.preventDefault();
                container.scrollLeft += moveX; // Scroll horizontally
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
