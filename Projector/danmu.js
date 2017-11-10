url = 'https://danmu-183606.appspot.com'

function launchSuccess(ids, callback){
  jQuery.ajax({
      url: url + "/api/success",
      type: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8"
      },
      contentType: "application/json",
      data: JSON.stringify({
        "id": ids
    })
  })
  .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      //callback(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
  })
}

function getMessage(callback){
  jQuery.ajax({
      url: url + "/api/new",
      type: "GET"
  })
  .done(function(data, textStatus, jqXHR) {
      // console.log("HTTP Request Succeeded: " + jqXHR.status);
      // console.log(data);
      if (data.ok){
        var messages = data.bullets.reduce(function(acc, cur){
          // if (cur.color === '000000') {
          //   acc.push({'text':cur.content, 'color': '#ffffff', 'fixed':cur.display_mode==='f'});
          // }else{
            acc.push({'text':cur.content, 'color': '#'+cur.color, 'fixed':cur.display_mode==='f'});
          // }
          return acc;
        }, [])
        var ids = data.bullets.reduce(function(acc, cur){
          acc.push(cur.id)
          return acc;
        }, [])
        var len = ids.length;
        if (len > 0) {
          // console.log(messages);
          console.log(ids);
          launchSuccess(ids);
          callback(messages, len);
        }

      }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
  })
}

var scrn = window.document.getElementById('dm-screen');
scrn.style.width = window.innerWidth + 'px';
scrn.style.height = window.innerHeight + 'px';
scrn.style.opacity = 1;

var damoo = new Damoo('dm-screen', 'dm-canvas', 20, 'Helvetica');

damoo.play();

var addEvent = function(obj, nm, cb) {
    if (window.addEventListener) {
        obj.addEventListener(nm, cb, false);
    } else if (window.attachEvent) {
        obj.attachEvent('on' + nm, cb);
    }
};

damoo.emit({ text: 'Welcome to 厉害的弹幕', color: '#' + Math.random().toString(16).substring(2).substring(0, 6) });

addEvent(document.body, 'keypress', function(e) {
    var keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 13: // shift + a
            var text = prompt('Text?');
            if (!text) return;
            var color = prompt('Text color? (#fff)');
            var fixed = prompt('Fixed? (y/n)');
            fixed = (fixed == 'y' || fixed == 'Y');
            var shadow = prompt('Shadow? (y/n)');
            if (shadow == 'y' || shadow == 'Y') {
                shadow = { color: prompt('Shadow color? (#fff)') };
            }
            damoo.emit({ text: text, color: color, fixed: fixed, shadow: shadow });
            break;
        case 67: // shift + c
            damoo.clear();
            break;
        case 60: // shift + .
            if (scrn.style.opacity > 0) {
                scrn.style.opacity = Number(scrn.style.opacity) - 0.1;
            }
            break;
        case 62: // shift + ,
            if (scrn.style.opacity < 1) {
                scrn.style.opacity = Number(scrn.style.opacity) + 0.1;
            }
            break;
        case 80: // shift + p
            if (damoo.state) {
                damoo.pause();
            } else {
                damoo.resume();
            }
            break;
    }
    return false;
});

// var list0 = [{ text: 'Test Display', color: '#6f9', fixed: true }
// ,{ text: '(╯°д°)╯︵ ┻━┻', color: '#fff' }
// ,{ text: 'How many people say yes', color: '#f00', shadow: { color: '#6f9' } }
// ,'hahahahahahahah'
// ];
//
// var list30 = [];
// for (var i=0; i<20; i++){
//   // list30.push({ text: 'How many people say yes!!!!!!!!!!', color: '#f00'})
//   list30.push({ text: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈", color: '#f00'})
//
// }

const MAX_LENGTH = 20;
function sentListofMessage(list, interval){
  var i = 0;
  var demoInterval = setInterval(function() {
      if (list[i]) {
          if(list[i].text.length > MAX_LENGTH){
            list[i].text = list[i].text.substr(0, MAX_LENGTH)
          }
          damoo.emit(list[i++]);
      } else {
          clearInterval(demoInterval);
      }
  }, interval);
}

// sentListofMessage(list0);
// sentListofMessage(list30, list30.length*15)

setInterval(function() {
    if (true) {
      // sentListofMessage(list30, list30.length*10)
        getMessage(function(fetchedlist, len){
          if (len != 0){
            sentListofMessage(fetchedlist,  len * 10)
          }
        });

    } else {
        //clearInterval(demoInterval);
    }
}, 5000);
