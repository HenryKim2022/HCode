import './bootstrap';
// import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';


import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';



document.addEventListener('DOMContentLoaded', function () {
    const xcontainers = document.querySelectorAll('.x-scrollable');
    xcontainers.forEach(xcontainer => {
        if (xcontainer) {
            new PerfectScrollbar(xcontainer, {
                suppressScrollX: false, // Enable horizontal scroll
                suppressScrollY: true    // Disable vertical scroll
            });

            let startX, startY;
            let lastMoveTime = 0;
            let velocity = 0;
            xcontainer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX; // Get initial touch position
                startY = event.touches[0].clientY; // Get initial touch position
                lastMoveTime = Date.now();
                velocity = 0;
            });

            let isTouchScrollingVertically = false;
            xcontainer.addEventListener('touchmove', (event) => {
                console.log('touchmove event triggered');
                const moveX = event.touches[0].clientX - startX;
                const moveY = event.touches[0].clientY - startY;
                const currentTime = Date.now();
                const deltaTime = currentTime - lastMoveTime;
                lastMoveTime = currentTime;

                // If user is trying to move vertically (more than horizontally)
                if (Math.abs(moveY) > Math.abs(moveX)) {
                    console.log('vertical touch move detected');

                    // Disable horizontal scrollbar if not already disabled
                    if (!isTouchScrollingVertically) {
                        isTouchScrollingVertically = true;
                        xcontainer.style.overflowX = 'hidden';
                    }

                    // Calculate velocity
                    velocity = moveY / deltaTime;

                    // Animate the scrolling
                    window.scrollTo(0, window.scrollY - moveY);
                } else {
                    // Re-enable horizontal scrollbar if it was previously disabled
                    if (isTouchScrollingVertically) {
                        isTouchScrollingVertically = false;
                        xcontainer.style.overflowX = 'auto';
                    }
                }
            });

            // Re-enable horizontal scrollbar when user stops scrolling
            document.addEventListener('touchend', () => {
                if (isTouchScrollingVertically) {
                    isTouchScrollingVertically = false;
                    xcontainer.style.overflowX = 'auto';
                }

                // Animate the scrolling based on velocity
                function animateScrolling() {
                    window.scrollTo(0, window.scrollY - velocity);
                    velocity *= 0.9; // Slow down the velocity over time
                    if (Math.abs(velocity) > 0.1) {
                        requestAnimationFrame(animateScrolling);
                    }
                }
                animateScrolling();
            });
            xcontainer.addEventListener('touchmove', (event) => {
                console.log('touchmove event triggered');
                const moveX = event.touches[0].clientX - startX;
                const moveY = event.touches[0].clientY - startY;
                const currentTime = Date.now();
                const deltaTime = currentTime - lastMoveTime;
                lastMoveTime = currentTime;

                // Disable horizontal scrollbar
                xcontainer.style.overflowX = 'hidden';

                // If user is trying to move vertically (more than horizontally)
                if (Math.abs(moveY) > Math.abs(moveX)) {
                    console.log('vertical touch move detected');
                    event.preventDefault(); // Prevent default scrolling behavior
                    event.stopPropagation(); // Stop horizontal scrolling

                    // Calculate velocity
                    velocity = moveY / deltaTime;

                    // Animate the scrolling
                    window.scrollTo(0, window.scrollY - moveY);
                } else {
                    // Re-enable horizontal scrollbar if it was previously disabled
                    if (isTouchScrollingVertically) {
                        isTouchScrollingVertically = false;
                        xcontainer.style.overflowX = 'auto';
                    }
                }
            });
            // Disable vertical scrolling
            xcontainer.addEventListener('wheel', (event) => {
                if (event.deltaY !== 0) {
                    event.preventDefault();
                }
            });

            xcontainer.addEventListener('mousewheel', (event) => {
                if (event.wheelDeltaY !== 0) {
                    event.preventDefault();
                }
            });
        }
    });



    const ycontainers = document.querySelectorAll('.y-scrollable');
    ycontainers.forEach(ycontainer => {
        if (ycontainer) {
            new PerfectScrollbar(ycontainer, {
                suppressScrollX: true, // Disable horizontal scroll
                suppressScrollY: false    // Enable vertical scroll
            });

            let startY;
            ycontainer.addEventListener('touchstart', (event) => {
                startY = event.touches[0].clientY; // Get initial touch position
            });
            ycontainer.addEventListener('touchmove', (event) => {
                const moveY = event.touches[0].clientY - startY;
                // If user is trying to scroll horizontally (more than vertically)
                if (Math.abs(moveY) < Math.abs(event.touches[0].clientX - ycontainer.getBoundingClientRect().left)) {
                    event.stopPropagation(); // Stop vertical scrolling
                    ycontainer.scrollLeft += moveY; // Scroll horizontally
                }
            });
        }
    });
});

