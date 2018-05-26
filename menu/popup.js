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

var links = document.querySelectorAll("ul.links li");

chrome.storage.sync.get(null, function(result){
  if(result["dev"] == true){
    v = document.createElement('a');
    v.href = "dev.html";
    v.innerHTML = '<img src="/images/app-mgmt.png"><br>Developer';
    document.querySelector("div.buttons").appendChild(v);
  }
  if(result["citrix"] == true){
    v = document.createElement('a');
    v.href = "https://citrix.allenisd.org";
    v.target = "_blank";
    v.innerHTML = '<img src="/images/app-citrix.png"><br>Citrix';
    document.querySelector("div.buttons").appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith("https://citrix.allenisd.org")){
        v = document.createElement('a');
        v.href = "#";
        v.id = "suggested";
        v.innerHTML = '<table><tr><td><img src="/images/app-citrix.png"></td><td><h4>Click to add Citrix</h4><p>Suggestion</p></td></tr></table>';
        v.addEventListener('click', function(){
          v = document.createElement('a');
          v.href = "https://citrix.allenisd.org/";
          v.target = "_blank";
          v.innerHTML = '<img src="/images/app-citrix.png"><br>Citrix';
          document.querySelector("div.buttons").appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f["citrix"] = true;
          chrome.storage.sync.set(f, function(){});
        });
        document.querySelector("div.buttons").insertBefore(v, document.querySelector("div.buttons").childNodes[0]);
      }
    });
  }
});
