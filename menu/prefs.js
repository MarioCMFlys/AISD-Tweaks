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

var clicks = 0;

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
  // Canvas
  defCheckbox("canvasListModules", true);
  defCheckbox("canvasPeople", true);
  defCheckbox("canvasDarkTheme", false);
  defCheckbox("canvasNotify", true);
  defCheckbox("canvasNoThumb", false);
  // Skyward
  defCheckbox("skywardGrades", true);
  defCheckbox("skywardTab", true);
  defCheckbox("skywardGpa", true);
  defCheckbox("skywardBanner", true);

  document.getElementById("opt").addEventListener("submit", function(event){
    event.preventDefault();

    checkSet("canvasListModules");
    checkSet("canvasPeople");
    checkSet("canvasDarkTheme");
    checkSet("canvasNoThumb");

    checkSet("skywardGrades");
    checkSet("skywardTab");
    checkSet("skywardGpa");
    checkSet("canvasNotify");
    checkSet("skywardBanner");

    btn = document.getElementById("btnSave");
    btn.innerHTML = "Saved";
    btn.disabled = true;
  });

  dev = document.querySelector("a#enableDevButton");
  dev.style.cursor = "default";
  dev.style.color = "#000000";
  dev.style.textDecoration = "none";
  dev.href = "#";
  dev.addEventListener("click", function(){
    clicks = clicks + 1;
    if(clicks == 7){
      if(result["dev"] != true){
        f = {};
        f["dev"] = true;
        chrome.storage.sync.set(f, function(){});
        alert("You are now a developer!");
      }
      else{
        alert("You are already a developer!");
      }
    }
  });

  if(result["mal"] == true){
    var mI = document.querySelectorAll('input');
    for(var j=0;j<mI.length;j++){
      i = mI[j];
      i.disabled = true;
    }
    mB = document.getElementById("btnSave");
    mB.innerHTML = "Saved";
    mB.disabled = true;
  }
});
