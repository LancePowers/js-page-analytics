
var popup = new AnalyticsWindow();
$(document).on('ready', function() {

  popup.createSections();
  $(window).scroll(function (event) {
      popup.scroll = $(window).scrollTop();
      if(scroll > popup.maxView){popup.maxView = scroll;}
      popup.totalScroll = popup.scrollUpdate();
      popup.sectionUpdate();
      popup.lastScroll = popup.scroll;
  });

  $('#break').on('click',function(){ popup.pageTime('false'); this.lastScroll = $.now(); })

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
  this.startTime = $.now();
  this.timeOnPage = 0;
  this.signTime = 0;
  this.sectionTime = $.now();
  this.sections = [];
}

AnalyticsWindow.prototype.createSections = function() {
  var sectionQuantity = $(document).height() / 100;
  var range = 100;
  for (var i = 0; i < sectionQuantity; i++) {
    this.sections.push({'range':range,'viewTime':0});
    range += 100;
  }
}

AnalyticsWindow.prototype.sectionUpdate = function(){
  var change = ($.now()-this.sectionTime)/1000;
  for (var i = 0; i < this.sections.length; i++) {
    if(this.scroll < this.sections[i].range){
      this.sections[i].viewTime += change;
      break;
    }
  }
    this.sectionTime = $.now();
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

AnalyticsWindow.prototype.sectionTable =function(){
  this.sectionUpdate();
  var sectionDisplay=[];
  for (var i = 0; i < this.sections.length; i++) {
    var row = $("<tr><td>section " + (i+1) + "</td><td>Time " + this.timeDisplay(this.sections[i].viewTime) +"</td></tr>");
    sectionDisplay.push(row);
  }
  return sectionDisplay;
}

AnalyticsWindow.prototype.displayAnalytics = function(){

  $('#analytics').modal('show');
  $('#page-percent').html(this.percentViewed());
  $('#total-scroll').html('The total scroll was '+ this.totalScroll +' pixels.');
  $('#page-time').html('Total view time: '+ this.timeDisplay(this.timeOnPage));
  $('#sign-time').html('The sign up button was clicked in '+ this.timeDisplay(this.signTime) );
  $('#section-time').html(this.sectionTable());
}



// Time spent on each section of the page
