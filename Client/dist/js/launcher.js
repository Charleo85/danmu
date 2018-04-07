const client = new ClientJS();
const fingerprint = client.getFingerprint();
const agentinfo = client.getBrowser()+client.getOS()+client.getOSVersion();
// console.log(fingerprint);
// var fingerprintNode = window.document.getElementById('fingerprint');
// if (fingerprint != 1493947517){
// fingerprintNode.textContent = agentinfo;
// }else{
//   fingerprintNode.textContent = 'First Time Visted'+fingerprint;
// }


function sendMessage(msg, callback){
  jQuery.ajax({
      url: "https://danmu-183606.appspot.com/api/create/",
      type: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      contentType: "application/json",
      data: JSON.stringify({
          // "font_size": msg.font_size,
          "fingerprint": fingerprint.toString(),
          "user_agent": agentinfo,
          "content": msg.content,
          "display_mode": msg.fixed ? "f":"s",
          "color": msg.color,
          "num_repeat": msg.repeat ? 5 : 1,
      })
  })
  .done(function(data, textStatus, jqXHR) {
      // console.log("HTTP Request Succeeded: " + jqXHR.status);
      // console.log(data);
      callback(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      // console.log("HTTP Request Failed");
      alert('Please try send again');
  });
}



var curStep = 1;
var options = {
  content: '',
  color: 'ffffff',
  fixed: false,
  repeat: false,
}

$('.ui.checkbox').checkbox();
//  userinfo:{fingerprint: fingerprint.toString()}

colorMap = {
  red: 'FF8A80',
  purple: 'B413EC',
  violet: 'EE82EE',
  pink: 'FF1493',
  brown: 'FF7043',
  orange: 'FE9A76',
  yellow: 'FFD700',
  lime: 'CDDC39',
  olive: '32CD32',
  green: '80CBC4',
  teal: 'C8E6C9',
  blue: '9FA8DA',
  cyan: '00BCD4',
  grey: 'E0E0E0',
  white: 'EEEEEE',
}

for (const key in colorMap){
  $('#colorbar').append(`<div class='column two wide mobile one wide computer' style='background-color:#${colorMap[key]};height:30px' id='${key}'></div>`);
}

for (const key in colorMap){
  $(`#${key}`).click(function(){
    $('#sentPreview').css('color', `#${colorMap[key]}`);
    options.color = colorMap[key];
  });
}
const MAX_LENGTH = 23;

function saveStep(curStep){
  switch (curStep){
  case 1:
    options.content = $('textarea').val();
    if (options.content){
      const len = options.content.length;
      // console.log(len);
      if (options.content.length == 0){
         alert('empty text not allowed');
         return false;
       }else if (options.content.length > MAX_LENGTH){
         alert(`You can at most enter ${MAX_LENGTH} characters`);
         return false;
       }
    }else{
      alert('empty text not allowed');
      return false;
    }

    break;
  case 2:
    options.fixed = $("input[type='checkbox'][id='fixed']").is(":checked");
    options.repeat = $("input[type='checkbox'][id='repeat']").is(":checked");
    // options.color = $('textarea').val();
    // console.log('repeat', options.repeat)
    // console.log('fixed', options.fixed);
    break;
  case 3:
    break;
  default:
    break;

  }
  return true;
}

function loadStep(curStep){
  switch (curStep){
  case 1:
    $('textarea').val(options.content);
    break;
  case 2:
    $('#sentPreview').text(options.content);
    break;
  case 3:
    break;
  default:
    break;
  }
}

function showStep(curStep){
  for (var i=1; i<=3; i++){
    $(`#displayBox${i}`).addClass('hideBox');
  }
  loadStep(curStep);
  $(`#displayBox${curStep}`).removeClass('hideBox');
}

showStep(curStep);

$('#prevButton').click(function(){
  var prevStep = curStep;
  curStep--;
  if (curStep == 1){
    $(this).addClass('disabled');
  }
  if (curStep < 3){
    $('#nextButton').removeClass('disabled');
    $('#nextButton').removeClass('hideBox');
    $('#sendButton').addClass('hideBox');
    $(`#step${prevStep}`).addClass('disabled')
  }
  $(`#step${curStep}`).removeClass('completed');
  $(`#step${curStep}`).addClass('active')
  showStep(curStep);
});

$('#nextButton').click(function(){
  var prevStep = curStep;
  curStep++;
  if (curStep > 1){
    if (!saveStep(prevStep)){
      curStep--;
      return;
    }
    $('#prevButton').removeClass('disabled');
    $(`#step${prevStep}`).addClass('completed');
  }
  if (curStep == 3){
    $(this).addClass('hideBox');
    $('#sendButton').removeClass('hideBox');
    //$(this).addClass('disabled');
  }
  $(`#step${curStep}`).removeClass('disabled')
  $(`#step${curStep}`).addClass('active')
  showStep(curStep);
});

$('#sendButton').click(function(){
  $(`#step3`).addClass('completed');
  //console.log('hello world')
  sendMessage(options, function(data){
    if (!data.first_visit && !data.ok){
      alert('Huh, you are banned, Ask administer to get your account reset');
      return;
    }else{
      if (data.first_visit){
        // modal
        alert('Awesome, your first Danmu is posted!');
      }else{
        alert('Send Successful');
      }
      location.reload();
    }
  });
  // page reload
})

// $('#2step').click(function(){
//   console.log('hello');
//   $(this).removeClass('disable');
// });
