/**
 * Initiate priorityNav
 *
 * Uses priority-nav.js
 */

$(function() {
  var wrapper = document.querySelector(".sba-js-priority-nav-tabs");
  var nav = priorityNav.init({
      mainNavWrapper: ".sba-js-priority-nav-tabs",
      breakPoint: 0,
      throttleDelay: '50'
  });
});
