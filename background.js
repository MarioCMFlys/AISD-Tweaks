/**
Copyright 2018 MarioCMFlys

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

chrome.runtime.onInstalled.addListener(function() {
  chrome.browserAction.enable();
  chrome.alarms.create("notifier", {periodInMinutes:1});
  appendCourses();
});

var coursesAppended = false;

function appendCourses(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      coursesAppended = true;
      text = this.responseText.replace("while(1);","");
      data = JSON.parse(text);
      courses = [];
      for(j=0;j<data.length;j++){
        i = data[j];
        c = {};
        c.s = {};
        c.s.content = "~#"+i.id;
        c.s.description = "<url>" + i.name + "</url>";
        c.url = "https://canvas.allenisd.org/courses/"+i.id;
        courses.push(c);
      }
      suggestions.push.apply(suggestions, courses);
    }
  };
  xhr.open("GET", "https://canvas.allenisd.org/api/v1/users/self/favorites/courses?include[]=term&exclude[]=en", true);
  xhr.send();
}

chrome.alarms.onAlarm.addListener(function(alarm){
  if(alarm.name == "notifier"){
    //  https://canvas.allenisd.org/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false
    chrome.storage.sync.get(null, function(storage){
      if(storage["supressBGComms"] != true){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            text = this.responseText.replace("while(1);","");
            data = JSON.parse(text);

            if(storage["canvasNotify"] == true || storage["canvasNotify"] != false){

              known = storage["latestMessage"];
              newest = data[0].id;
              if(known != newest){
                unread = data.filter(function(e){
                  return e.workflow_state == "unread";
                });
                if(unread.length == 1){
                  opt = {
                    type: 'basic',
                    title: unread[0].subject,
                    message: 'New message on Canvas',
                    iconUrl: chrome.extension.getURL('./images/app-canvas.png'),
                    eventTime: Date.now()
                  }
                  chrome.notifications.create("msg"+Date.now(), opt);
                }
                if(unread.length >= 2){
                  opt = {
                    type: 'list',
                    title: unread.length+" new messages",
                    iconUrl: chrome.extension.getURL('./images/app-canvas.png'),
                    message: '',
                    eventTime: Date.now(),
                    items: []
                  };
                  for(j=0;j<unread.length;j++){
                    i = unread[j];
                    title = i.subject;
                    l = {};
                    l.title = title;
                    l.message = "";
                    opt.items.push(l);
                  }
                  chrome.notifications.create("msg"+Date.now(), opt);
                }
              }
              f = {};
              f["latestMessage"] = newest;
              chrome.storage.sync.set(f, function(){});
            }

            if(!coursesAppended){
              appendCourses();
            }
          }
        };
        xhr.open("GET", "https://canvas.allenisd.org/api/v1/conversations?scope=inbox&filter_mode=and&include_private_conversation_enrollments=false", true);
        xhr.send();
      }
    });
  }
});

chrome.notifications.onClicked.addListener(function(id){
  if(id.startsWith("msg")){
    chrome.notifications.clear(id);
    chrome.tabs.create({url:"https://canvas.allenisd.org/conversations"});
  }
});

var suggestions = [
  {s: {content: "canvas", description: "Canvas"}, url: "https://canvas.allenisd.org/"},
  {s: {content: "skyward", description: "Skyward Gradebook"}, url: "https://skyward.allenisd.org/"},
  {s: {content: "portal", description: "Portal"}, url: "https://portal.allenisd.org/"},
  {s: {content: "google", description: "Google Drive"}, url: "https://google.allenisd.org/"},
  {s: {content: "montage", description: "Safari Montage <dim>(montage)</dim>"}, url: "https://montage.allenisd.org/"},
  {s: {content: "citrix", description: "Citrix Storefront"}, url: "https://citrix.allenisd.org/vpn/index.html"},
  {s: {content: "home", description: "AISD Front Page <dim>(home)</dim>"}, url: "https://www.allenisd.org/"},
  {s: {content: "hs", description: "Allen HS <dim>(hs)</dim>"}, url: "https://www.allenisd.org/allenhs"},
  {s: {content: "steam", description: "STEAM Center"}, url: "https://www.allenisd.org/Page/54990"},
  {s: {content: "lowery", description: "Lowery FC"}, url: "https://www.allenisd.org/loweryhs"},
  {s: {content: "curtis", description: "Curtis MS"}, url: "https://www.allenisd.org/curtisms"},
  {s: {content: "ereckson", description: "Ereckson MS"}, url: "https://www.allenisd.org/erecksonms"},
  {s: {content: "ford", description: "Ford MS"}, url: "https://www.allenisd.org/fordms"},
  {s: {content: "erma", description: "ERMA"}, url: "https://erma.allenisd.org/"},
  {s: {content: "test", description: "Test Skyward <dim>(test)</dim>"}, url: "https://testskyward.allenisd.org/"},
  {s: {content: "ticket", description: "Helpdesk <dim>(ticket)</dim>"}, url: "https://helpdesk.allenisd.org/"},
  {s: {content: "apg", description: "Academic Planning Guide <dim>(apg)</dim>"}, url: "https://canvas.allenisd.org/courses/858742"}
];

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  text = text.toLowerCase();

  s = [];
  for(i=0;i<suggestions.length;i++){
    s.push(suggestions[i].s);
  }
  if(!coursesAppended){
    s.push({content: "~E", description: "<dim>Login to Canvas to see personalized options</dim>"});
  }

  current = s.filter(function(e){
    return (e.content.startsWith(text) || e.description.toLowerCase().includes(text));
  });

  if(current.length >= 1){
     chrome.omnibox.setDefaultSuggestion({description: current[0].description});
     current.shift();
  }
  suggest(current);
});

function open(loc){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.update(tab.id, {url: loc});
  });
}
function openQuery(q){
  open("https://www.google.com/search?q="+encodeURIComponent("aisd "+q));
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  text = text.toLowerCase();

  current = suggestions.filter(function(e){
    return (e.s.content.startsWith(text) || e.s.description.toLowerCase().includes(text));
  });

  if(current.length >= 1){
    req = current[0];
    open(req.url);
  }
  else{
    openQuery(text);
  }
});
