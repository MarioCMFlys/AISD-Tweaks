/**
Copyright 2018-2019 MarioCMFlys

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

var links = document.querySelector("div.buttons");

function createLink(label, image, location, blank){
  v = document.createElement('a');
  v.href = location;
  if(blank) v.target = "_blank";
  v.innerHTML = '<img src="'+image+'"><br>'+label;
  return v;
}
function createSuggestion(app, image){
  v = document.createElement('a');
  v.href = "#";
  v.id = "suggested";
  v.innerHTML = '<table><tr><td><img src="'+image+'"></td><td><h4>Click to add '+app+'</h4><p>Suggestion</p></td></tr></table>';
  return v;
}

chrome.storage.sync.get(null, function(result){
  btnDev = null;
  if(result["dev"] == true){
    btnDev = createLink("Developer", "/images/app-mgmt.png", "dev.html", false);
  }

  // Citrix
  if(result["citrix"] == true){
    v = createLink("Citrix", "/images/app-citrix.png", "https://citrix.allenisd.org", true);
    links.appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith("https://citrix.allenisd.org")){
        v = createSuggestion("Citrix", "/images/app-citrix.png");
        v.addEventListener('click', function(){
          v = createLink("Citrix", "/images/app-citrix.png", "https://citrix.allenisd.org", true);
          links.appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f["citrix"] = true;
          chrome.storage.sync.set(f, function(){});
        });
        links.insertBefore(v, links.childNodes[0]);
      }
    });
  }

  // ERMA
  if(result["erma"] == true){
    v = createLink("ERMA", "/images/app-erma.png", "https://erma.allenisd.org", true);
    links.appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith("https://erma.allenisd.org")){
        v = createSuggestion("ERMA", "/images/app-erma.png");
        v.addEventListener('click', function(){
          v = createLink("ERMA", "/images/app-erma.png", "https://erma.allenisd.org", true);
          links.appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f["erma"] = true;
          chrome.storage.sync.set(f, function(){});
        });
        links.insertBefore(v, links.childNodes[0]);
      }
    });
  }

  // Eduphoria
  if(result["eduphoria"] == true){
    v = createLink("Eduphoria", "/images/app-eduphoria.png", "https://eduphoria.allenisd.org", true);
    links.appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith("https://eduphoria.allenisd.org")){
        v = createSuggestion("Eduphoria", "/images/app-eduphoria.png");
        v.addEventListener('click', function(){
          v = createLink("Eduphoria", "/images/app-eduphoria.png", "https://eduphoria.allenisd.org", true);
          links.appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f["eduphoria"] = true;
          chrome.storage.sync.set(f, function(){});
        });
        links.insertBefore(v, links.childNodes[0]);
      }
    });
  }

  // Atriuum
  if(result["atriuum"] == true){
    v = createLink("Atriuum", "/images/app-atriuum.png", "https://portal.allenisd.org/_sso/Web/LaunchApplication.aspx?AppPath=%22Applications%2fManaged+Applications%2fAtriuumOPACSSO%22&MacroName=1", true);
    links.appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith("https://atriuum.allenisd.org")){
        v = createSuggestion("Atriuum", "/images/app-atriuum.png");
        v.addEventListener('click', function(){
          v = createLink("Atriuum", "/images/app-atriuum.png", "https://portal.allenisd.org/_sso/Web/LaunchApplication.aspx?AppPath=%22Applications%2fManaged+Applications%2fAtriuumOPACSSO%22&MacroName=1", true);
          links.appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f["atriuum"] = true;
          chrome.storage.sync.set(f, function(){});
        });
        links.insertBefore(v, links.childNodes[0]);
      }
    });
  }

  if(btnDev != null) links.appendChild(btnDev);
});
