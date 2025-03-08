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
            xcontainer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX; // Get initial touch position
                startY = event.touches[0].clientY; // Get initial touch position
            });
            xcontainer.addEventListener('touchmove', (event) => {
                console.log('touchmove event triggered');
                const moveX = event.touches[0].clientX - startX;
                const moveY = event.touches[0].clientY - startY;

                // If user is trying to scroll vertically (more than horizontally)
                if (Math.abs(moveY) > Math.abs(moveX)) {
                    console.log('vertical scrolling detected');
                    event.preventDefault(); // Prevent default scrolling behavior
                    event.stopPropagation(); // Stop horizontal scrolling
                    // Allow the page to scroll
                    const newEvent = new TouchEvent('touchmove', {
                        touches: event.touches,
                        targetTouches: event.targetTouches,
                        changedTouches: event.changedTouches,
                        altKey: event.altKey,
                        metaKey: event.metaKey,
                        ctrlKey: event.ctrlKey,
                        shiftKey: event.shiftKey,
                    });
                    console.log('dispatching new event to document.body');
                    document.body.dispatchEvent(newEvent);
                    // Move the scroll position of the page
                    window.scrollTo(0, window.scrollY + moveY);
                }
            });

            document.body.addEventListener('touchmove', (event) => {
                console.log('touchmove event received by document.body');
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

