
var popup = new AnalyticsWindow();
$(document).on('ready', function() {

  popup.startTime = $.now();

  $(window).scroll(function (event) {
      popup.scroll = $(window).scrollTop();
      if(scroll > popup.maxView){popup.maxView = scroll;}
      popup.totalScroll = popup.scrollUpdate();
      popup.lastScroll = popup.scroll;
  });

  $('#break').on('click',function(){ popup.pageTime('false') })

  $('.well > button').on('click',function(){ popup.signTime = ($.now() - popup.startTime)/1000})

  $( "#analytics-btn" ).on( "click", function() {
    popup.displayAnalytics();
    popup.pageTime(true);
  });

});



function AnalyticsWindow(){
  this.scroll = 0;
  this.lastScroll = 0;
  this.maxView = 0;
  this.totalScroll = 0;
  this.startTime = 0;
  this.timeOnPage = 0;
  this.signTime = 0;
}



AnalyticsWindow.prototype.pageTime = function (active) {
  var change = 0;
  if(active === true){
    change = ($.now()-this.startTime)/1000;
  }
  this.timeOnPage += change;
  this.startTime = $.now();
};


AnalyticsWindow.prototype.timeDisplay = function (duration) {
  var minutes = parseInt(duration/60);
  var seconds = parseInt(duration%60);
  return  minutes + ' minutes & ' + seconds +' seconds.'
};


AnalyticsWindow.prototype.scrollUpdate = function () {
  var change = this.lastScroll - this.scroll;
  if( change > 0){
    return this.totalScroll += change;
  } else {
    return this.totalScroll -= change;
  }
};

AnalyticsWindow.prototype.percentViewed= function(){
  var view = this.maxView + $(window).height();
  var viewPercentage = view / $(document).height() * 100;
  if(viewPercentage === undefined){return 'The user didn\'t scroll.';}
  return 'The user viewed ' + viewPercentage.toFixed(2) + "\% of the page";
}

AnalyticsWindow.prototype.displayAnalytics = function(){

  $('#analytics').modal('show');
  $('#page-percent').html(this.percentViewed());
  $('#total-scroll').html('The total scroll was '+ this.totalScroll +' pixels.');
  $('#page-time').html('Total view time: '+ this.timeDisplay(this.timeOnPage));
  $('#sign-time').html('The sign up button was clicked in '+ this.timeDisplay(this.signTime) );
}


// Time before clicking the green "Sign Up" button
// Time spent on each section of the page
