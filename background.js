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

  current = s.filter(function(e){
    return e.content.startsWith(text);
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
    return e.s.content.startsWith(text);
  });

  if(current.length >= 1){
    req = current[0];
    open(req.url);

  }
  else{
    openQuery(text);
  }
});
