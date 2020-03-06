/**
Copyright 2018-2020 MarioCMFlys

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

function handleApp(result, id, name, trigger, destination){
  if(result[id] == true){
    v = createLink(name, "/images/app-"+id+".png", destination, true);
    links.appendChild(v);
  }
  else{
    chrome.tabs.query({active:true,lastFocusedWindow:true}, function(tabs){
      tab = tabs[0];
      if(tab.url.startsWith(trigger)){
        v = createSuggestion(name, "/images/app-"+id+".png");
        v.addEventListener('click', function(){
          v = createLink(name, "/images/app-"+id+".png", destination, true);
          links.appendChild(v);
          document.querySelector("#suggested").style.display = "none";
          f = {};
          f[id] = true;
          chrome.storage.sync.set(f, function(){});
        });
        links.insertBefore(v, links.childNodes[0]);
      }
    });
  }
}

chrome.storage.sync.get(null, function(result){
  btnDev = null;
  if(result["dev"] == true){
    btnDev = createLink("Developer", "/images/app-mgmt.png", "dev.html", false);
  }

  // Citrix
  handleApp(result,
    "citrix",
    "Citrix",
    "https://citrix.allenisd.org",
    "https://portal.allenisd.org/_sso/Web/LaunchApplication.aspx?AppPath=%22Applications%2fManaged+Applications%2fCitrixSSO%22"
  );

  // ERMA
  handleApp(result,
    "erma",
    "ERMA",
    "https://erma.allenisd.org",
    "https://erma.allenisd.org"
  );

  // Eduphoria
  handleApp(result,
    "eduphoria",
    "Eduphoria",
    "https://eduphoria.allenisd.org",
    "https://eduphoria.allenisd.org"
  );

  // Destiny
  handleApp(
    result,
    "destiny",
    "Destiny",
    "https://allenisd.follettdestiny.com",
    "https://portal.allenisd.org/_sso/Web/LaunchApplication.aspx?AppPath=%22Applications%2fManaged+Applications%2fDistrict+Resource+Links%2fDestinyClassicSSO%22"
  );

  if(btnDev != null) links.appendChild(btnDev);
});
