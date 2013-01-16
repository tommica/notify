mySubs = {};

$(document).ready(function() {
    var client_id = "656022200109.apps.googleusercontent.com";
    var redirect_uri = "http://random.tommicarleman.net/notify/index.php";
    var response_type = "token";
    var scope = "https://gdata.youtube.com";
    
    if(window.location.href.indexOf("access_token") < 1) {
      document.location = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type+"&scope="+scope+"";
    } else {
      var access_token = window.location.href.match(/#access_token=(.*?)&/i)[1];
      $('body').ajaxError(function(e) {
        document.location = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type+"&scope="+scope+"";
      });
      var amount = 0;
      $.getJSON('https://gdata.youtube.com/feeds/api/users/default?v=2&alt=json&access_token='+access_token, function(data) {
        $.each(data.entry.gd$feedLink, function(key, value) {
          if(value.href.indexOf("subscriptions?v=2") !== -1) {
            amount = value.countHint;
          }
          });
        for(z = 0; (z*50) < amount; z++) {
          var g = (z*50)+1;
          $.getJSON('https://gdata.youtube.com/feeds/api/users/default/subscriptions?v=2&max-results=50&start-index='+g+'&alt=json&access_token='+access_token, function(data) {
            showMySubs(data);
          });
        }
      });

      var r = setInterval("checkMySubs(0)", 30000);
    }

    $("#subscriptions").on("click", "#showSubs", function(event){
      $("#subscriptions ul").fadeToggle('slow');
      return false;
    });
    
    $("#subscriptions").on("click", "#help", function(event){
      $('#helpContainer').fadeIn('fast');
      return false;
    });

    $('#helpContainer').click(function() {
      $(this).fadeOut('fast');
    });
    
    $("#subscriptions").on("click", "#soundTest", function(event){
      $('audio').get(0).play();
      return false;
    });

    $("#subscriptions").on("click", "a", function(event){
      $(this).toggleClass('on');
      title = $(this).attr('rel');
      if(title) {
        if(mySubs[title]) {
          delete mySubs[title];
        } else {
          mySubs[title] = 0;
        }
        checkMySubs(1);
      }
      return false;
    });

    $("#subscriptions").on("click", "a#checkAll", function(event){
      var this_item = $('#subscriptions li:first-child');
      $('#subscriptions li').each(function(o) {
        if(o>0) {
 //         clickAll(this_item);
            $(this).children('a').trigger('click');
        }
      });
      $(this).toggleClass('on');
    });

    $('#subscriptions').on("change", "#sounder", function(event) {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
          $('audio').remove();
          $('body').append('<audio src="'+evt.target.result+'"></audio>');
        }
      };
      reader.readAsDataURL(file);
    });
});

function showMySubs(data) {
  var feed = data.feed;
  var entries = feed.entry || [];
  var html = ['<ul><li><a href="#" id="checkAll">Select all</a></li>'];
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var title = entry.yt$username.$t;
    html.push('<li><a target="_blank" href="#" rel="'+title+'">', title, '</a></li>');
  }
  html.push('</ul>');
  document.getElementById('subscriptions').innerHTML = document.getElementById('subscriptions').innerHTML+html.join('');
}

function addNote(title,content) {
$.gritter.add({
    class_name: 'gritter-light',
    title: title,
    sticky: true,
    text: content

    });
return false;
}

function checkMySubs(justCheck) {
  $.each(mySubs, function(key, value) {
    $.getJSON('https://gdata.youtube.com/feeds/api/users/'+key+'/uploads?v=2&alt=json', function(data) {
      var feed = data.feed;
      var entries = feed.entry || [];
      var entry = entries[0];
      if((value != entry.id.$t) && justCheck < 1) {
        var c_title = key+' - '+entry.title.$t;
        var c_link = '';
        $.each(entry.link, function(c_key, c_value) {
          if(c_value.href.indexOf("watch?v=") !== -1) {
            c_link = c_value.href;
          }
        });
        var content = '<a target="_blank" href="'+c_link+'">New video</a>';
        addNote(c_title,content);
        $('audio').get(0).play();
        $.titleAlert("New video!", {
          requireBlur:true,
          stopOnFocus:true,
          interval:500
        });
      }
      mySubs[key] = entry.id.$t;
    });
  });
}

function clickAll(item) {
//  $();
}
