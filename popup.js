$.getJSON('features.json', function(data) {

  featuresJSON = data;

  var items = [];

  $.each(featuresJSON.data, function(feature, supportInfo) {

    items.push(supportInfo.title);

  });

  $('#features', document).html(items.join(''));

  var moreUsedBrowsers = getMoreUsedBrowsers();

  $('#autocomplete').autocomplete({
    source: items,
    delay: 0,
    minLength: 0,
    autoFocus: true,
    select: function(e, ui) {
      searchFeature(ui.item.value, moreUsedBrowsers);
    }
  });

});

var getMoreUsedBrowsers = function() {

  var browsers = {};

  for (var browser in featuresJSON.agents) {

    browsers[browser] = [];

    for (var version in featuresJSON.agents[browser].usage_global) {

      var usage = featuresJSON.agents[browser].usage_global[version];

      if (usage > 0.5) {

        browsers[browser].push(version);

      }

    }

  }

  return browsers;

};

var searchFeature = function(searchTerm, moreUsedBrowsers) {

  $('#browserSupport').empty();
  $('#browserSupport, #references, #moreInfo, #resources').hide();

  $.each(featuresJSON.data, function(feature, supportInfo) {

    if (searchTerm === supportInfo.title) {

      $.each(supportInfo.stats, function(browser, versions) {

        var items = [];

        if (browser === "and_chr" || browser === "and_ff") {
          return false;
        }

        items.push('<li class="browser ' + browser + '">' + browser + '</li>');

        $.each(versions, function(version, support) {

          for (var i = moreUsedBrowsers[browser].length - 1; i >= 0; i--) {

            if (version === moreUsedBrowsers[browser][i]) {

              items.push('<li class="' + support + '">' + version + '</li>');

            }

          };


        });

        var list = $('<ul/>', {
          class: 'browser-list',
          html: items.join('')
        });

        list.appendTo('#browserSupport', document);

        $('#moreInfo').attr('href', 'http://caniuse.com/#feat=' + feature).text('"' + supportInfo.title + '" on caniuse.com');
        $('#moreInfo, #browserSupport, #references, #resources').fadeIn();

      });

    };

  });

}



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35317319-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
