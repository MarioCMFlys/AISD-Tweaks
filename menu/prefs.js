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
  // Canvas
  defCheckbox("canvasListModules", true);
  defCheckbox("canvasPeople", true);
  // Skyward
  defCheckbox("skywardGrades", true);
  defCheckbox("skywardTab", true);

  document.getElementById("opt").addEventListener("submit", function(event){
    event.preventDefault();

    checkSet("canvasListModules");
    checkSet("canvasPeople");

    checkSet("skywardGrades");
    checkSet("skywardTab");

    btn = document.getElementById("btnSave");
    btn.innerHTML = "Saved";
    btn.disabled = true;
  });

  dev = document.querySelector("a#enableDevButton");
  dev.style.cursor = "text";
  dev.style.color = "#000000";
  dev.style.textDecoration = "none";
  dev.href = "#";
  dev.addEventListener("click", function(){
    f = {};
    f["dev"] = true;
    chrome.storage.sync.set(f, function(){});
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
