/**
 * Initiate priorityNav
 *
 * Uses priority-nav.js
 */

$(function() {
  var wrapper = document.querySelector("#tabs_wrapper");
  var nav = priorityNav.init({
      mainNavWrapper: "#tabs_wrapper",
      breakPoint: 0,
      throttleDelay: '50'
  });
});
