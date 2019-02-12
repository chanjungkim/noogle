$(function(){
    chrome.storage.sync.get('lang', function(savedLang){
        if(!savedLang.lang){
            savedLang.lang = 1;
        }
        $("#numLang").text(savedLang.lang);
        $("select").val(savedLang.lang).prop("selected", true);
    });

    $('body').on('click', '#youtube', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });

    $("select").on("change", function(){
        var newLang = $(this).val();
        chrome.storage.sync.set({'lang':newLang});
        $("#numLang").text(newLang);
    });
});
