// ==UserScript==
// @name        arastir++
// @description eksi sozluk arastir linkleri geri geldi!
// @namespace   https://github.com/fellay/arastirpp.git
// @author      fellay  (https://github.com/fellay)
// @contributor Eren Hatirnaz <erenhatirnaz@hotmail.com.tr> (https://github.com/ErenHatirnaz)
// @match       https://eksisozluk.com/*
// @match       https://*.eksisozluk.com/*
// @version 0.0.2
// ==/UserScript==
(function() {
  var localstoragename;

  localstoragename = "arastirppdata";

  unsafeWindow.arastirConfig = function() {
    $('li.active').removeClass('active');
    $('#settings-tabs>li:last').addClass('active');
    $('#settings-tabs').after("<div id='arastirppdiv'>\n  <fieldset>\n    <legend>araştır++ sitelerim</legend>\n  </fieldset>\n</div>");
    $('#arastirppdiv').nextAll().remove();
    $.each(getStoredSites(), function(key, value) {
      return $('#arastirppdiv>fieldset').append("<div data-arastirpp=\"" + key + "\">\n  <label class=\"siteFormNo\"> " + (key + 1) + " </label>\n  <input style=\"width:80px;\" type=\"text\" value=\"" + value.siteName + "\"/>\n  <input style=\"width:220px;\" type=\"text\" value=\"" + value.url + "\"/>\n  <input style=\"width:220px;\" type=\"text\" value=\"" + value.icon + "\" placeholder=\"icon url\" />\n  <span class=\"delSite\"><a href=\"#arastir\" onclick=\"delSite('" + key + "');\">temizle</a></span>\n</div>");
    });
    addNewSiteForm();
    return $('#arastirppdiv>fieldset').after("<button class='primary' onclick='gogogo();'>kaydet!</button>");
  };

  unsafeWindow.delSite = function(key) {
    return $('#arastirppdiv>fieldset>div:eq(' + key + ')>input').val('');
  };

  unsafeWindow.gogogo = function() {
    var thisIsWhatToSave;
    thisIsWhatToSave = [];
    $.each($('#arastirppdiv>fieldset>div'), function(key, value) {
      var icon, siteName, url;
      siteName = $(this).find('input').eq(0).val().trim();
      url = $(this).find('input').eq(1).val().trim();
      icon = $(this).find('input').eq(2).val().trim();
      if (siteName.length && url.length) {
        return thisIsWhatToSave.push({
          siteName: siteName,
          url: url,
          icon: icon
        });
      }
    });
    localStorage.setItem(localstoragename, JSON.stringify(thisIsWhatToSave));
    $('#settings-tabs').after("<span id=\"itsdone\" style=\"background-color: #dff2bf; color: #4f8a10;\" class=\"showall more-data\" title=\"senin is tamam!\">\n  arastir linkleri basariyla guncellendi!\n</span>");
    return setTimeout((function() {
      if ($('#itsdone').length) {
        return $('#itsdone').fadeOut(500, function() {
          return $(this).remove();
        });
      }
    }), 3500);
  };

  unsafeWindow.addNewSiteForm = function() {
    var s;
    s = parseInt($('.siteFormNo:last').text()) + 1;
    $('#arastirppdiv>fieldset').append("<div data-arastirpp=\"" + (s - 1) + "\">\n  <label class=\"siteFormNo\">" + s + "</label>\n  <input style=\"width:80px;\" type=\"text\" placeholder=\"site adı\" />\n  <input style=\"width:220px;\" type=\"text\" placeholder=\"site url\'i\" />\n  <input style=\"width:220px;\" type=\"text\" placeholder=\"icon url\'i\" />\n</div>");
    $('button#dataSiteEkleButton').remove();
    return $('#arastirppdiv>fieldset>div:last').append('<button id="dahaSiteEkleButton" onclick="addNewSiteForm();">daha</button>');
  };

  unsafeWindow.getDefaultArastirSites = function() {
    return [
      {
        siteName: 'google',
        url: 'https://www.google.com.tr/search?q=',
        icon: 'https://www.google.com.tr/favicon.ico'
      }, {
        siteName: 'tureng',
        url: 'http://tureng.com/search/',
        icon: 'http://tureng.com/favicon.ico'
      }, {
        siteName: 'vikipedi',
        url: 'http://tr.wikipedia.org/w/index.php?title=%C3%96zel:Ara&fulltext=Ara&search=',
        icon: 'http://tr.wikipedia.org/favicon.ico'
      }, {
        siteName: 'wikipedia',
        url: 'http://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search=',
        icon: 'http://en.wikipedia.org/favicon.ico'
      }, {
        siteName: 'imdb',
        url: 'http://us.imdb.com/find?q=',
        icon: 'http://www.imdb.com/favicon.ico'
      }, {
        siteName: 'youtube',
        url: 'http://www.youtube.com/results?search_query=',
        icon: 'http://www.youtube.com/favicon.ico'
      }
    ];
  };

  unsafeWindow.getStoredSites = function() {
    return JSON.parse(localStorage.getItem(localstoragename));
  };

  unsafeWindow.firstTime = function() {
    if (localStorage.getItem(localstoragename) === null) {
      return localStorage.setItem(localstoragename, JSON.stringify(getDefaultArastirSites()));
    }
  };

  unsafeWindow.togglearastirpplist = function() {
    return $('#arastirpplist').toggle();
  };

  $(document).ready(function() {
    if ($('#settings-tabs').length) {
      $('#settings-tabs').append('<li><a href="#arastir" onclick="arastirConfig();">araştır++</a>');
    }
    if ($('.sub-title-menu').length) {
      firstTime();
      $('#topic-share-menu').after("<div id=\"arastirpptogglediv\" class=\"dropdown\">\n  <a id=\"arastirpptogglelink\" onclick=\"togglearastirpplist();\" class=\"dropdown-toggle\">araştır</a>\n  <ul id=\"arastirpplist\" class=\"dropdown-menu toggles-menu \"></ul>\n</div>");
      return $.each(getStoredSites(), function(key, value) {
        var baslik, itemStyle;
        baslik = $('h1#title span[itemprop="name"]').text();
        itemStyle = "";
        if (value.icon.length) {
          itemStyle = "background: url('" + value.icon + "') no-repeat scroll left top rgba(0, 0, 0, 0); background-size: 16px 16px; display: inline-block; min-height: 16px; min-width: 16px; vertical-align: middle; margin-right: 8px;";
        }
        return $('#arastirpplist').append("<li>\n  <a href=\"" + (value.url + encodeURIComponent(baslik)) + "\" target=\"_blank\">\n    <span style=\"" + itemStyle + "\"></span>" + value.siteName + "\n  </a>\n</li>");
      });
    }
  });

  $(document).click(function(event) {
    if (!$(event.target).closest('#arastirpptogglediv').length) {
      if ($('#arastirpplist').is(':visible')) {
        return $('#arastirpplist').hide();
      }
    }
  });

}).call(this);
