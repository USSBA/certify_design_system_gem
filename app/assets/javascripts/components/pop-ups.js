$(document).ready(function(){
  var popupScrollPosition = 0;

  $('.new-popup').on('click', function(){
    $('.sba-c-popup').addClass('visible');
    document.getElementById("popup").scrollTop = 0;
    return false;
  });

  $('.sba-c-popup__toggle').on('click', function(){
    var popup = document.getElementById("popup");
    if ($('.sba-c-popup__contents').hasClass('hidden')){
      $('.sba-c-popup__contents').toggleClass('hidden');
      popup.scrollTop = popupScrollPosition;
    }
    else {
      popupScrollPosition =  popup.scrollTop;
      $('.sba-c-popup__contents').toggleClass('hidden');
    }
    return false;
  });

  $('#sba-c-popup-close').on('click', function(){
    $('.sba-c-popup').removeClass('visible');
    $('.sba-c-popup__contents').removeClass('hidden');
    return false;
  });

});
