import './bootstrap';
// import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';


import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

document.addEventListener('DOMContentLoaded', function () {
    const xcontainers = document.querySelectorAll('.x-scrollable');
    xcontainers.forEach(xcontainers => {
        if (xcontainers) {
            new PerfectScrollbar(xcontainers, {
                suppressScrollX: false, // Enable horizontal scroll
                suppressScrollY: true    // Disable vertical scroll
            });

            let startX;
            xcontainers.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX; // Get initial touch position
            });
            xcontainers.addEventListener('touchmove', (event) => {
                const moveX = event.touches[0].clientX - startX;

                // If user is trying to scroll vertically (more than horizontally)
                if (Math.abs(moveX) < Math.abs(event.touches[0].clientY - xcontainers.getBoundingClientRect().top)) {
                    event.stopPropagation(); // Stop horizontal scrolling
                }
            });

        }
    });


    const ycontainers = document.querySelectorAll('.y-scrollable');
    ycontainers.forEach(ycontainers => {
        if (ycontainers) {
            new PerfectScrollbar(ycontainers, {
                suppressScrollX: true, // Enable horizontal scroll
                suppressScrollY: false    // Disable vertical scroll
            });

            let startY;
            ycontainers.addEventListener('touchstart', (event) => {
                startY = event.touches[0].clientY; // Get initial touch position
            });
            ycontainers.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY;
                // If user is trying to scroll horizontally (more than vertically)
                if (Math.abs(moveY) < Math.abs(event.touches[0].clientX - ycontainers.getBoundingClientRect().left)) {
                    event.stopPropagation(); // Stop vertical scrolling
                    ycontainers.scrollLeft += moveY; // Scroll horizontally
                }
            });



        }
    });


    xcontainers.forEach(container => {

    });

    ycontainers.forEach(container => {

    });
});



