

$(window).on("load", function(){

  //ボタンを挿入
  $('.Component__MovieTitleSection-s7jbcac-4.bWTkqP').after('<section class="OpenrecCapture-ChromeExtension"></section>');
  $('.OpenrecCapture-ChromeExtension').append('<p style="color:rgb(153, 164, 173)">/**ブラウザ右上（アドレスバーの右横）にある拡張ボタンをクリックすることで画像をtweetすることができます**/</p>');  
  $('.OpenrecCapture-ChromeExtension').append('<button id="captureButton">Capture</button>');
  $('.OpenrecCapture-ChromeExtension').append('<button id="clearButton">Clear</button>');
  $('.OpenrecCapture-ChromeExtension').append('<a id="downloadButton">Download</a>');
  $('.OpenrecCapture-ChromeExtension').append('<select name="imageSize" id="imageSize" size="1"><option id="target" value="current">そのまま保存</option><option value="resize">1024×576で保存</option></select>');

  //canvasを作成
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  //resize用のcanvasを作成
  var canvas_resize = document.createElement('canvas');
  var ctx_resize = canvas_resize.getContext('2d');
  canvas_resize.style.cssText = "display:none";

  //canvasを挿入
  $('.Component__MovieMetaSection-s7jbcac-6.cQifkU').before(canvas);
  $('.Component__MovieMetaSection-s7jbcac-6.cQifkU').before(canvas_resize);

  //background.jsへデータを送る
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

    if(canvas.outerHTML == "<canvas></canvas>"){

      setTimeout(function(){
        sendResponse("noImage")
      }, 1000)
      return true

    }else{

      var tweetText = `${document.title} ${document.URL} #オープンレックキャプチャー`
      var base64 = canvas_resize.toDataURL('image/jpeg').split(",")[1]
      var sendObject = {
        text:tweetText,
        media:base64
      }
      setTimeout(function(){
        sendResponse(sendObject)
      }, 1000)
      return true

    }

  })

  //paddingを0にする
  $('.Component__MovieArticleBottom-s7jbcac-3.jvljwL').css('padding','0');

  //Capture
  $('#captureButton').on('click',function(){

    var video = document.getElementsByTagName('video')[0];

    //canvasのサイズ
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //リサイズ用canvasのサイズ
    canvas_resize.width = 1024
    canvas_resize.height = 576
    ctx_resize.drawImage(canvas, 0, 0, 1024, 576);

  });

  //Download
  $('#downloadButton').on('click',function(){

    var title = $('.MovieTitle__Title-s181dg2v-2.dJwRvo').text()
    var username = $('.text-ellipsis.UserName__Name-s1ut55ae-1.kflqjr').eq(0).text()
    var filename = `${username}_${title}`
    var select = document.getElementById("target");

    //そのままで
    if(select.selected){
      $('#downloadButton').attr('href',canvas.toDataURL());
      $('#downloadButton').attr('download',`${filename}.png`);
    //リサイズして
    }else{
      $('#downloadButton').attr('href',canvas_resize.toDataURL());
      $('#downloadButton').attr('download',`${filename}.png`);
    }

  });

  //Clear
  $('#clearButton').on('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx_resize.clearRect(0, 0, canvas_resize.width, canvas_resize.height);
  })

});