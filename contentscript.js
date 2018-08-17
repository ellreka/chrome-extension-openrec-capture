$(window).on("load", function(){
  
  //ボタンを挿入
  $('.Component__MovieTitleSection-s7jbcac-4.bWTkqP').after('<section class="OpenrecCapture-ChromeExtension"></section>');
  $('.OpenrecCapture-ChromeExtension').append('<button id="captureButton">Capture</button>');
  $('.OpenrecCapture-ChromeExtension').append('<a id="downloadButton">Download</a>');
  $('.OpenrecCapture-ChromeExtension').append('<button id="clearButton">Clear</button>');

  //canvasを作成
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  //paddingを0にする
  $('.Component__MovieArticleBottom-s7jbcac-3.jvljwL').css('padding','0');

  //videoを取得する
  var video = document.getElementsByTagName('video')[0];
  $(video).on('loadedmetadata', function () {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    $('.Component__MovieMetaSection-s7jbcac-6.cQifkU').before(canvas);
  });

  //Capture
  $('#captureButton').on('click',function(){
    var video = document.getElementsByTagName('video')[0];
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  });

  //Download image
  $('#downloadButton').on('click',function(){
    var title = $('.MovieTitle__Title-s181dg2v-2.dJwRvo').text()
    var username = $('.text-ellipsis.UserName__Name-s1ut55ae-1.kflqjr').eq(0).text()
    var filename = `${username}_${title}`
    $('#downloadButton').attr('href',canvas.toDataURL());
    $('#downloadButton').attr('download',`${filename}.png`);
  });

  //Clear
  $('#clearButton').on('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  })

});