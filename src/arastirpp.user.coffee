localstoragename = "arastirppdata"
$("<style>")
  .prop 'type', 'text/css'
  .html "
    .light-theme #arastirppdiv a.like, .light-theme #arastirppdiv a.dislike {
      color: #666666;
    }
    .light-theme #arastirppdiv a.like.disabled, .light-theme #arastirppdiv a.dislike.disabled {
      color: #bababa;
      pointer-events: none;
      cursor: not-allowed;
    }
    .dark-theme #arastirppdiv a.like, .dark-theme #arastirppdiv a.dislike {
      color: #bababa;
    }
    .dark-theme #arastirppdiv a.like.disabled, .dark-theme #arastirppdiv a.dislike.disabled {
      color: #666666;
      pointer-events: none;
      cursor: not-allowed;
    }
  "
  .appendTo "head"

unsafeWindow.arastirConfig = ->
  if getStoredSites() == null
    firstTime()

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
    <div data-arastirpp="#{key}" style="margin-bottom:1px">
      <a class="icon icon-up-open like" title="yukarı"><span></span></a>
      <label style="width" class="siteFormNo"> #{key+1} </label>
      <a class="icon icon-down-open dislike" title="aşağı"><span></span></a>
      <input style="width:80px;" type="text" value="#{value.siteName}"/>
      <input style="width:220px;" type="text" value="#{value.url}"/>
      <input style="width:220px;" type="text" value="#{value.icon}" placeholder="icon url" />
      <span class="delSite"><a href="#arastir" onclick="delSite('#{key}');">kaldır</a></span>
    </div>
    """

  addNewSiteForm()
  $('#arastirppdiv>fieldset').after """
  <button class='primary' onclick='gogogo();'>kaydet!</button>
  <hr style="-ms-transform: rotate(90deg);-webkit-transform: rotate(90deg);transform: rotate(90deg);width:25px; display:inline; margin-right:3px" />
  <input type="file" id="arastirppfile" style="display:none" />
  <button class='info' onclick='exportSites();'>dışa aktar</button>
  <button class='info' onclick="document.getElementById('arastirppfile').click()">içeri aktar</button>
  """

  $('.like').click ->
    if $(this).attr('disabled') == "disabled" then return
    if parseInt($(this).parent().attr('data-arastirpp')) == 0
      alert 'zaten en üstte ki!'
    else
      $current = $(this).parent()
      $prev = $current.prev()
      $prev.before $current
      $current.attr 'data-arastirpp', parseInt($current.attr('data-arastirpp'))-1
      $prev.attr 'data-arastirpp', parseInt($prev.attr('data-arastirpp'))+1

  $('.dislike').click ->
    if $(this).attr('disabled') == "disabled" then return
    if parseInt($(this).parent().attr('data-arastirpp')) == getStoredSites().length-1
      alert 'zaten en altta ki!'
    else
      $current = $(this).parent()
      $next = $current.next()
      $next.after $current
      $current.attr 'data-arastirpp', parseInt($current.attr('data-arastirpp'))+1
      $next.attr 'data-arastirpp', parseInt($next.attr('data-arastirpp'))-1

  $("#arastirppfile").on 'change', (e) ->
    file = e.target.files[0]
    if !file then return
    reader = new FileReader()
    reader.onload = (e) ->
      try
        sites = JSON.parse e.target.result
        if checkSitesValidity(sites)
          if confirm("emin misin bak bu işin geri dönüşü yok?")
            localStorage.setItem localstoragename, e.target.result
            alert "senin iş tamam"
            arastirConfig()
        else
          throw Exception()
      catch
        alert "verdiğin dosya formatlara uymuyor!"
    reader.readAsText file

unsafeWindow.delSite = (key) ->
  $('#arastirppdiv>fieldset>div[data-arastirpp=' + key + ']').remove()

unsafeWindow.checkSitesValidity = (sites) ->
  result = true
  for site in sites
    if Object.keys(site).toString() != 'siteName,url,icon'
      result = false
      break
  result

unsafeWindow.gogogo = ->
  thisIsWhatToSave = []
  $.each $('#arastirppdiv>fieldset>div'), (key, value) ->
    siteName = $(this).find('input').eq(0).val().trim()
    url = $(this).find('input').eq(1).val().trim()
    icon = $(this).find('input').eq(2).val().trim()
    if siteName.length and url.length
      thisIsWhatToSave.push {siteName: siteName, url: url, icon: icon}

  localStorage.setItem localstoragename, JSON.stringify(thisIsWhatToSave)
  arastirConfig()
  $('#settings-tabs').after """
  <span id="itsdone" style="background-color: #dff2bf; color: #4f8a10;" class="showall more-data" title="senin is tamam!">
    araştır linkleri başarıyla güncellendi!
  </span>
  """
  setTimeout (->
    if $('#itsdone').length
      $('#itsdone').fadeOut(500, -> $(this).remove() )
  ), 3500

unsafeWindow.exportSites = ->
  element = document.createElement 'a'
  element.setAttribute 'href', "data:application/json;charset=utf-8,#{localStorage.getItem(localstoragename)}"
  element.setAttribute 'download', 'arastir++ sitelerim.json'
  element.style.display = "none"

  document.body.appendChild element
  element.click()
  document.body.removeChild element

unsafeWindow.addNewSiteForm = ->
  s = parseInt($('.siteFormNo:last').text())+1
  if isNaN(s) then s = 1
  $('#arastirppdiv>fieldset').append """
  <div data-arastirpp="#{s-1}" style="margin-bottom:1px">
    <a class="icon icon-up-open like disabled" title="yukarı" ><span></span></a>
    <label class="siteFormNo">#{s}</label>
    <a class="icon icon-down-open dislike disabled" title="aşağı"><span></span></a>
    <input style="width:80px;" type="text" placeholder="site adı" />
    <input style="width:220px;" type="text" placeholder="site url\'i" />
    <input style="width:220px;" type="text" placeholder="icon url\'i" />
  </div>
  """
  $('button#dahaSiteEkleButton').remove()
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
      url: 'https://tr.wikipedia.org/w/index.php?title=%C3%96zel:Ara&fulltext=Ara&search='
      icon: 'https://tr.wikipedia.org/favicon.ico'
    }
    {
      siteName: 'wikipedia'
      url: 'https://en.wikipedia.org/wiki/Special:Search?fulltext=Search&search='
      icon: 'https://en.wikipedia.org/favicon.ico'
    }
    {
      siteName: 'imdb'
      url: 'https://us.imdb.com/find?q='
      icon: 'https://www.imdb.com/favicon.ico'
    }
    {
      siteName: 'youtube'
      url: 'https://www.youtube.com/results?search_query='
      icon: 'https://www.youtube.com/favicon.ico'
    }
  ]

unsafeWindow.getStoredSites = ->
  JSON.parse localStorage.getItem(localstoragename)

unsafeWindow.firstTime = ->
  if localStorage.getItem(localstoragename) == null
    localStorage.setItem localstoragename, JSON.stringify(getDefaultArastirSites())

unsafeWindow.togglearastirpplist = ->
  $('#arastirpplist').toggle()

$(document).ready ->
  if $('#settings-tabs').length
    $('section[id="content-body"]').css 'width', '630px'
    $('#settings-tabs').append '<li><a href="#arastir" onclick="arastirConfig();">araştır++</a>'

  if $('.sub-title-menu').length
    firstTime()

    $('#topic-share-menu').after """
    <div id="arastirpptogglediv" class="dropdown">
      <a id="arastirpptogglelink" onclick="togglearastirpplist();" class="expandable toggles">araştır</a>
      <ul id="arastirpplist" class="dropdown-menu toggles-menu "></ul>
    </div>
    """

    $.each getStoredSites(), (key, value) ->
      baslik = $('h1#title span[itemprop="name"]').text()
      itemStyle = ""
      if value.icon.length
        itemStyle = """
        background: url('#{value.icon}') no-repeat scroll left top rgba(0, 0, 0, 0);
        background-size: 16px 16px;
        display: inline-block;
        min-height: 16px; min-width: 16px;
        vertical-align: middle;
        margin-right: 8px;
        """
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
