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

chrome.storage.sync.get(null, function(result){
  function defCheckbox(name, def){
      if(result[name] == true){
        document.getElementById(name).checked = "checked";
      }
      else if(result[name] == false){}
      else{
        if(def == true){
          document.getElementById(name).checked = "checked";
        }
      }
  }
  function checkSet(name){
    value = document.getElementById(name).checked;
    f = {};
    f[name] = value;
    chrome.storage.sync.set(f, function(){});
  }
  defCheckbox("dev", false);
  defCheckbox("mal", false);
  defCheckbox("canvasTestPage", false);
  defCheckbox("citrix", false);
  defCheckbox("erma", false);
  defCheckbox("eduphoria", false);

  document.getElementById("opt").addEventListener("submit", function(event){
    event.preventDefault();

    checkSet("dev");
    checkSet("mal");
    checkSet("canvasTestPage");
    checkSet("citrix");
    checkSet("erma");
    checkSet("eduphoria");

    btn = document.getElementById("btnSave");
    btn.innerHTML = "Saved";
    btn.disabled = true;
  });

  document.getElementById("btnReset").addEventListener("click", function(){
    chrome.storage.sync.clear(function(){document.querySelector("div.main").innerHTML="Storage cleared"});
  });
});
