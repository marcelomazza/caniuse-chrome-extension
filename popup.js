var searchFeature = function(searchTerm) {

  $('#title').empty();
  $('#browserSupport').empty();

  $.each(featuresJSON.data, function(feature, supportInfo) {

    if (searchTerm === supportInfo.title) {

      $('#title').html(supportInfo.title);

      $.each(supportInfo.stats, function(browser, versions) {

        var items = [];

        if (browser === "and_chr" || browser === "and_ff") {
          return false;
        }

        items.push('<li class="browser ' + browser + '">' + browser + '</li>');

        $.each(versions, function(version, support) {

          items.push('<li class="' + support + '">' + version + '</li>');

        });

        var list = $('<ul/>', {
          html: items.join('')
        });

        list.appendTo('#browserSupport', document);

        $('#moreInfo').attr('href', 'http://caniuse.com/#feat=' + feature).fadeIn();

      });

    };

  });

}


$.getJSON('features.json', function(data) {
  featuresJSON = data;
  
   var items = [];

  $.each(featuresJSON.data, function(feature, supportInfo) {

    items.push(supportInfo.title);

  });

  $('#features', document).html(items.join(''));

  $('#autocomplete').autocomplete({
    source: items,
    delay: 0,
    minLength: 0,
    autoFocus: true,
    select: function(e, ui) {
      searchFeature(ui.item.value);
    }
  });

});


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35317319-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();