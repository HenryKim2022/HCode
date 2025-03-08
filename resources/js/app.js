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

            let startX;
            container.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX; // Get initial touch position
            });
            container.addEventListener('touchmove', (event) => {
                const moveX = event.touches[0].clientX - startX;

                // If user is trying to scroll vertically (more than horizontally)
                if (Math.abs(moveX) < Math.abs(event.touches[0].clientY - container.getBoundingClientRect().top)) {
                    // Allow vertical scrolling outside this container
                    return; // Do not stop propagation
                }

                event.preventDefault(); // Prevent vertical scrolling
                container.scrollLeft += moveX; // Scroll horizontally
                startX = event.touches[0].clientX; // Update start position
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
                startY = event.touches[0].clientY; // Get initial touch position
            });
            container.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY;

                // If user is trying to scroll horizontally (more than vertically)
                if (Math.abs(moveY) < Math.abs(event.touches[0].clientX - container.getBoundingClientRect().left)) {
                    event.preventDefault(); // Prevent vertical scrolling
                    container.scrollLeft += moveY; // Scroll horizontally
                }
            });
        }
    });



});
