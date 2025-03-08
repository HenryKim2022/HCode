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
        }
    });
    const ycontainers = document.querySelectorAll('.y-scrollable');
    ycontainers.forEach(ycontainers => {
        if (ycontainers) {
            new PerfectScrollbar(ycontainers, {
                suppressScrollX: true, // Enable horizontal scroll
                suppressScrollY: false    // Disable vertical scroll
            });
        }
    });
});
