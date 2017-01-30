var aexit = function(){ //Simple animated exit for main page
  $('h1').addClass('animated bounceOutUp');
  $('.footer').addClass('animated fadeOutDown');
  $('p').addClass('animated bounceOutUp');
  $('#b1').addClass('animated fadeOutLeft');
  $('#b2').addClass('animated fadeOutRight');
}

var areenter = function(){ //animated re-entrance for main page
  $('h1').removeClass('animated bounceOutUp');
  $('.footer').removeClass('animated fadeOutDown');
  $('p').removeClass('animated bounceOutUp');
  $('#b1').removeClass('animated fadeOutLeft');
  $('#b2').removeClass('animated fadeOutRight');

  $('h1').addClass('animated bounceInUp');
  $('.footer').addClass('animated fadeInDown');
  $('p').addClass('animated bounceInUp');
  $('#b1').addClass('animated fadeInLeft');
  $('#b2').addClass('animated fadeInRight');
}

var loadgallery = function(){ //animated loading of gallery
  $('.about').removeClass('animated bounceOut');
  $('.about').show();
  $('.about').addClass('animated bounceIn');
}

var unloadgallery = function(){ //animated unlaoding of gallery
  $('.about').removeClass('animated bounceIn');
    $('.about').addClass('animated bounceOut');
    window.setTimeout(function() {
      $('.about').hide();}, 600)}


$(document).ready(function(){

  $('h1').addClass('animated tada'); //when document loads, animate

  $('h1').hover(function(){ //animate on hover
    $(this).addClass('animated tada');
  },
  function(){
    $(this).removeClass('animated tada');
  });

  $('li, #cb, #cb1, .imgup').hover(function(){ //animate on hover for buttons
    $(this).addClass('animated pulse');
  },
  function(){
    $(this).removeClass('animated pulse');
  });

  $('#b1').click(function(){ //animated exit when starting library
    aexit()
    window.setTimeout(function(){
      $('#b1').hide();
      $('#b2').hide();
    },600)

  });

  $('#cb').click(function() { //animated re entrance when canceling modal
  $('#b1').show();
  $('#b2').show();
  areenter();
  });

  $('#b2').click(function() //animated & timed loading of gallery using "About" button
{
  aexit();
  window.setTimeout(function(){
    $('h1').hide();
    $('.header').hide();
    $('.navigation').hide();
    $('.footer').hide();
    $('p').hide();
    $('#b1').hide();
    $('#b2').hide();
  },600)
  window.setTimeout(loadgallery, 600);
});

  $('#aboutback').click(function() //animated & timed unloading of about back to main page w/ about name click
  {

    unloadgallery();
    window.setTimeout(function(){
    $('h1').show();
    $('.header').show();
    $('.navigation').show();
    $('.footer').show();
    $('p').show();
    $('#b1').show();
    $('#b2').show();
  },600)
  areenter();
});

  /*$('#starthere').on('hide.bs.modal', function () {
    $('h1').removeClass('animated bounceOutUp');
    $('.footer').removeClass('animated fadeOutDown');
    $('p').removeClass('animated bounceOutUp');
    $('.b1').removeClass('animated fadeOutLeft');
    $('.b2').removeClass('animated fadeOutRight');

    $('h1').addClass('animated bounceInUp');
    $('.footer').addClass('animated fadeInDown');
    $('p').addClass('animated bounceInUp');
    $('.b1').addClass('animated fadeInLeft');
    $('.b2').addClass('animated fadeInRight');
});*/

    $('#cb1').click(function(e) { //very simple form checks for modal
   var galleryname = $('#galleryname').val();
   var email = $('#email').val();
   var n = email.includes("@")

   if (galleryname == "") {
     window.alert("You must enter a gallery name!");
      e.preventDefault();
   }
   else if (email == "") {
     window.alert("You must enter a valid email address!");
      e.preventDefault();
   }
   else if (!n){
     window.alert("You must enter a valid email address!");
      e.preventDefault();
   }


});

});
