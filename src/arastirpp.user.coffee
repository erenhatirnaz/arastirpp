localstoragename = "arastirppdata";

unsafeWindow.arastirConfig = ->
  $('li.active').removeClass 'active'
  $('#settings-tabs>li:last').addClass 'active'
  $('#settings-tabs').after """
  <div id='arastirppdiv'>
    <fieldset>
      <legend>araştır++ sitelerim</legend>
    </fieldset>
  </div>
  """
  $('#arastirppdiv').nextAll().remove()

  $.each getStoredSites(), (key, value) ->
    $('#arastirppdiv>fieldset').append """
    <div data-arastirpp="#{key}">
      <label class="siteFormNo"> #{key+1} </label>
      <input style="width:80px;" type="text" value="#{value.siteName}"/>
      <input style="width:220px;" type="text" value="#{value.url}"/>
      <input style="width:220px;" type="text" value="#{value.icon}" placeholder="icon url" />
      <span class="delSite"><a href="#arastir" onclick="delSite('#{key}');">temizle</a></span>
    </div>
    """

  addNewSiteForm();
  $('#arastirppdiv>fieldset').after "<button class='primary' onclick='gogogo();'>kaydet!</button>"

unsafeWindow.delSite = (key) ->
  $('#arastirppdiv>fieldset>div:eq(' + key + ')>input').val('');

unsafeWindow.gogogo = ->
  thisIsWhatToSave = []
  $.each $('#arastirppdiv>fieldset>div'), (key, value) ->
    siteName = $(this).find('input').eq(0).val().trim()
    url = $(this).find('input').eq(1).val().trim()
    icon = $(this).find('input').eq(2).val().trim()
    if siteName.length and url.length
      thisIsWhatToSave.push {siteName: siteName, url: url, icon: icon}

  localStorage.setItem localstoragename, JSON.stringify(thisIsWhatToSave)
  $('#settings-tabs').after """
  <span id="itsdone" style="background-color: #dff2bf; color: #4f8a10;" class="showall more-data" title="senin is tamam!">
    arastir linkleri basariyla guncellendi!
  </span>
  """
  setTimeout (->
    if $('#itsdone').length
      $('#itsdone').fadeOut(500, -> $(this).remove() );
  ), 3500

unsafeWindow.addNewSiteForm = ->
  s = parseInt($('.siteFormNo:last').text())+1
  $('#arastirppdiv>fieldset').append """
  <div data-arastirpp="#{s-1}">
    <label class="siteFormNo">#{s}</label>
    <input style="width:80px;" type="text" placeholder="site adı" />
    <input style="width:220px;" type="text" placeholder="site url\'i" />
    <input style="width:220px;" type="text" placeholder="icon url\'i" />
  </div>
  """
  $('button#dataSiteEkleButton').remove()
  $('#arastirppdiv>fieldset>div:last').append('<button id="dahaSiteEkleButton" onclick="addNewSiteForm();">daha</button>')

unsafeWindow.getDefaultArastirSites = ->
  [
    {
      siteName: 'google'
      url: 'https://www.google.com.tr/search?q='
      icon: 'https://www.google.com.tr/favicon.ico'
    }
    {
      siteName: 'tureng'
      url: 'http://tureng.com/search/'
      icon: 'http://tureng.com/favicon.ico'
    }
    {
      siteName: 'vikipedi'
      url: 'http://tr.wikipedia.org/w/index.php?title=%C3%96zel:Ara&fulltext=Ara&search='
      icon: 'http://tr.wikipedia.org/favicon.ico'
    }
    {
      siteName: 'wikipedia'
      url: 'http://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search='
      icon: 'http://en.wikipedia.org/favicon.ico'
    }
    {
      siteName: 'imdb'
      url: 'http://us.imdb.com/find?q='
      icon: 'http://www.imdb.com/favicon.ico'
    }
    {
      siteName: 'youtube'
      url: 'http://www.youtube.com/results?search_query='
      icon: 'http://www.youtube.com/favicon.ico'
    }
  ]

unsafeWindow.getStoredSites = ->
  JSON.parse localStorage.getItem(localstoragename)

unsafeWindow.firstTime = ->
  if localStorage.getItem(localstoragename) == null
    localStorage.setItem localstoragename, JSON.stringify(getDefaultArastirSites())

unsafeWindow.togglearastirpplist = ->
  $('#arastirpplist').toggle();

$(document).ready ->
  if $('#settings-tabs').length
    $('#settings-tabs').append '<li><a href="#arastir" onclick="arastirConfig();">araştır++</a>'

  if $('.sub-title-menu').length
    firstTime()

    $('#topic-share-menu').after """
    <div id="arastirpptogglediv" class="dropdown">
      <a id="arastirpptogglelink" onclick="togglearastirpplist();" class="dropdown-toggle">araştır</a>
      <ul id="arastirpplist" class="dropdown-menu toggles-menu "></ul>
    </div>
    """

    $.each getStoredSites(), (key, value) ->
      baslik = $('h1#title span[itemprop="name"]').text()
      itemStyle = "";
      if value.icon.length
        itemStyle = "background: url('#{value.icon}') no-repeat scroll left top rgba(0, 0, 0, 0); background-size: 16px 16px; display: inline-block; min-height: 16px; min-width: 16px; vertical-align: middle; margin-right: 8px;"
      $('#arastirpplist').append """
      <li>
        <a href="#{value.url + encodeURIComponent(baslik)}" target="_blank">
          <span style="#{itemStyle}"></span>#{value.siteName}
        </a>
      </li>
      """

$(document).click (event) ->
  if !$(event.target).closest('#arastirpptogglediv').length
    if $('#arastirpplist').is(':visible')
      $('#arastirpplist').hide()
