<?php
header('Access-Control-Allow-Origin: http://random.tommicarleman.net');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Access-Control-Allow-Origin" content="*">
  <title>Notify</title>
  <link rel="stylesheet" type="text/css" href="css/style.css?u=<?php echo rand(); ?>" />
  <link rel="stylesheet" type="text/css" href="css/jquery.gritter.css?u=<?php echo rand(); ?>" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js?u=<?php echo rand(); ?>" ></script>
  <script src="js/jquery.gritter.js?u=<?php echo rand(); ?>" ></script>
  <script src="js/jquery.titlealert.js?u=<?php echo rand(); ?>" ></script>
  <script src="js/js.js?u=<?php echo rand(); ?>" ></script>
</head>

<body id="home">
<audio>
  <source src="duck.mp3" type="audio/mpeg" />
</audio>


<div id="subscriptions"><button id="showSubs">Subscriptions</button><button id="changeSound">C<input type="file" id="sounder" accept="audio" />hange sound</button><button id="soundTest">Soundtest</button><button id="help">Help</button></div>



<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-30669210-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

  window.onerror = function(message, file, line) { 
    var sFormattedMessage = '[' + file + ' (' + line + ')] ' + message; 
    _gaq.push(['_trackEvent', 'Exceptions', 'Application', sFormattedMessage, null, true]);
  }
</script>

<div id="helpContainer"><div id="helpContent">HELP</div></div>
</body>
</html>
