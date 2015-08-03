
var popup = new AnalyticsWindow();
$(document).on('ready', function() {
  $(window).scroll(function (event) {
      popup.scroll = $(window).scrollTop();
      if(scroll > popup.maxView){popup.maxView = scroll;}
      popup.totalScroll = popup.scrollUpdate();
      popup.lastScroll = popup.scroll;
  });

  $( "#analytics-btn" ).on( "click", function() {
    popup.displayAnalytics();
  });

});



function AnalyticsWindow(){
  this.scroll = 0;
  this.lastScroll = 0;
  this.maxView = 0;
  this.totalScroll = 0;
}

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
}


// Time before clicking the green "Sign Up" button
// Time spent on page
// Time spent on each section of the page
