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

window.addEventListener("load", function(){
  chrome.storage.sync.get("null", function(result){
    if(result["mal"] != true){
      if(window.location.pathname == "/scripts/wsisa.dll/WService=wsEAplus/sfgradebook001.w"){
        if(result["skywardGrades"] == true || result["skywardGrades"] != false){
          var aisdGrd = document.querySelectorAll('a[name="showGradeInfo"]');
          for(j = 0; j < aisdGrd.length; j++){
            i = aisdGrd[j];
            if(parseInt(i.innerHTML) < 70){
              i.style.color = '#FF0000';
            }
          }

          legend = document.querySelector('div#printGradesContainer > div.fXs.fIl.fWn');
          legend.innerHTML = legend.innerHTML + '<br><span style="float:right;">Failing grades are <b>red</b>.</span>';
        }
      }

      if(result["skywardTab"] == true || result["skywardTab"] != false){
        var aisdDoc = document.createElement("script");
        aisdDoc.innerHTML = `var aisdOldOpen = window.open;
        window.open = function(url, name, specs, replace){
          return aisdOldOpen(url, name, "", true);
        };`;
        document.head.appendChild(aisdDoc);
      }
    }
  });
});
