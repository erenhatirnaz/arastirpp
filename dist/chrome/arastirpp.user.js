// ==UserScript==
// @name        arastir++
// @description eksi sozluk arastir linkleri geri geldi!
// @namespace   https://github.com/fellay/arastirpp.git
// @author      fellay  (https://github.com/fellay)
// @contributor Eren Hatirnaz <erenhatirnaz@hotmail.com.tr> (https://github.com/ErenHatirnaz)
// @match       https://eksisozluk.com/*
// @match       https://*.eksisozluk.com/*
// @iconURL     http://i.hizliresim.com/E5QJYv.png
// @version     0.0.3
// @homepage    https://github.com/fellay/arastirpp
// @supportURL  https://github.com/fellay/arastirpp/issues/new
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
      return $('#arastirppdiv>fieldset').append("<div data-arastirpp=\"" + key + "\">\n  <a class=\"icon icon-up-open like\" style=\"color: #666\" title=\"yukarı\"><span></span></a>\n  <label style=\"width\" class=\"siteFormNo\"> " + (key + 1) + " </label>\n  <a class=\"icon icon-down-open dislike\" style=\"color: #666\" title=\"aşağı\"><span></span></a>\n  <input style=\"width:80px;\" type=\"text\" value=\"" + value.siteName + "\"/>\n  <input style=\"width:220px;\" type=\"text\" value=\"" + value.url + "\"/>\n  <input style=\"width:220px;\" type=\"text\" value=\"" + value.icon + "\" placeholder=\"icon url\" />\n  <span class=\"delSite\"><a href=\"#arastir\" onclick=\"delSite('" + key + "');\">temizle</a></span>\n</div>");
    });
    addNewSiteForm();
    $('#arastirppdiv>fieldset').after("<button class='primary' onclick='gogogo();'>kaydet!</button>");
    $('.like').click(function() {
      var $current, $prev;
      if ($(this).attr('disabled') === "disabled") {
        return;
      }
      if (parseInt($(this).parent().attr('data-arastirpp')) === 0) {
        return alert('zaten en üstte ki!');
      } else {
        $current = $(this).parent();
        $prev = $current.prev();
        $prev.before($current);
        $current.attr('data-arastirpp', parseInt($current.attr('data-arastirpp')) - 1);
        return $prev.attr('data-arastirpp', parseInt($prev.attr('data-arastirpp')) + 1);
      }
    });
    return $('.dislike').click(function() {
      var $current, $next;
      if ($(this).attr('disabled') === "disabled") {
        return;
      }
      if (parseInt($(this).parent().attr('data-arastirpp')) === getStoredSites().length - 1) {
        return alert('zaten en altta ki!');
      } else {
        $current = $(this).parent();
        $next = $current.next();
        $next.after($current);
        $current.attr('data-arastirpp', parseInt($current.attr('data-arastirpp')) + 1);
        return $next.attr('data-arastirpp', parseInt($next.attr('data-arastirpp')) - 1);
      }
    });
  };

  unsafeWindow.delSite = function(key) {
    return $('#arastirppdiv>fieldset>div:eq(' + key + ')').remove();
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
    arastirConfig();
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
    $('#arastirppdiv>fieldset').append("<div data-arastirpp=\"" + (s - 1) + "\">\n  <a class=\"icon icon-up-open like\" disabled=\"disabled\" style=\"cursor:not-allowed; color: #bababa\" title=\"yukarı\"><span></span></a>\n  <label class=\"siteFormNo\">" + s + "</label>\n  <a class=\"icon icon-down-open dislike\" disabled=\"disabled\" style=\"cursor:not-allowed; color: #bababa\" title=\"aşağı\"><span></span></a>\n  <input style=\"width:80px;\" type=\"text\" placeholder=\"site adı\" />\n  <input style=\"width:220px;\" type=\"text\" placeholder=\"site url\'i\" />\n  <input style=\"width:220px;\" type=\"text\" placeholder=\"icon url\'i\" />\n</div>");
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
        url: 'https://tr.wikipedia.org/w/index.php?title=%C3%96zel:Ara&fulltext=Ara&search=',
        icon: 'https://tr.wikipedia.org/favicon.ico'
      }, {
        siteName: 'wikipedia',
        url: 'https://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search=',
        icon: 'https://en.wikipedia.org/favicon.ico'
      }, {
        siteName: 'imdb',
        url: 'https://us.imdb.com/find?q=',
        icon: 'https://www.imdb.com/favicon.ico'
      }, {
        siteName: 'youtube',
        url: 'https://www.youtube.com/results?search_query=',
        icon: 'https://www.youtube.com/favicon.ico'
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
          itemStyle = "background: url('" + value.icon + "') no-repeat scroll left top rgba(0, 0, 0, 0);\nbackground-size: 16px 16px;\ndisplay: inline-block;\nmin-height: 16px; min-width: 16px;\nvertical-align: middle;\nmargin-right: 8px;";
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
