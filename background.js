//openrecのページを開いた時だけonにする
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes('https://www.openrec.tv/live/')) {
      chrome.pageAction.show(tabId);
  }
});

//アイコンをクリックした時の処理
chrome.pageAction.onClicked.addListener(() => {
  chrome.tabs.getSelected(window.id, function (tab){
    chrome.tabs.sendMessage(tab.id, "メッセージ", function(message) {
      if(message == "noImage"){
        console.log("no image")
      }else{
        OAuth.initialize('eZglTStkOinmp59qWfWEvqdKjoA');
        OAuth.popup('twitter').done(function (result) {
          result.post('https://upload.twitter.com/1.1/media/upload.json', {
            data: {
              media_data:message.media
            }
          }).done(function (res){
            console.log(res)
            result.post('/1.1/statuses/update.json', {
              data: {
                status: message.text,
                media_ids:res.media_id_string
              }
            })
          })
        })
      }
    });
  })
});


