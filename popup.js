var canIUse = (function () {

  var my = {};

  var features,
    featureTitles = {},
    browserList = [],
    disabledBrowsers = {
      "and_chr": true,
      "and_ff": true,
      "opera": true,
      "op_mob": true,
      "ie_mob": true,
      "and_uc": true
    },
    mostUsedPercentage = 0.4;

  $.getJSON('features.json', function(data) {
    features = data;
    autocomplete(features.data);
  });

  function autocomplete(data) {

    $('#autocomplete').autocomplete({
      source: $.map(data, function(value, key) {
        return {
          label: value.title,
          value: key
        }
      }),
      delay: 0,
      minLength: 0,
      autoFocus: true,
      select: function(e, ui) {
        e.preventDefault();
        $('#autocomplete').val(ui.item.label);
        listBrowsers(ui.item.value);
      }
    });
  };

  function listBrowsers(feature) {

    var featureInfo = features.data[feature];

    $('#browserSupport').empty();
    $('.js-toggle').hide();

    $.each(featureInfo.stats, function(browser, versions) {

      if (disabledBrowsers[browser]) {
        return;
      }

      browserList.push('<li class="browser-icon ' + browser + '" title="' + browser + '">' + browser + '</li>');

      listVersions(browser, versions);

      var list = $('<ul/>', {
        class: 'browser-list',
        html: browserList.join('')
      });

      list.appendTo('#browserSupport', document);

      browserList = [];

      $('#moreInfo').attr('href', 'http://caniuse.com/#feat=' + feature).text('"' + featureInfo.title + '" on caniuse.com');
      $('.js-toggle').fadeIn();

    });

  };

  function listVersions(browser, versions) {

    var isMostUsed, support;

    for (var version in versions) {
      isMostUsed = features.agents[browser].usage_global[version] > mostUsedPercentage;
      support = versions[version];

      if (isMostUsed) {
        browserList.push('<li class="' + support + '">' + version + '</li>');
      }
    }

  };

  my.features = function() {
    return features;
  };

  return my;

})();

$('#aboutIcon').on('click', function() {
  $('#about').slideToggle();
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35317319-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
