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

verNo = chrome.runtime.getManifest().version;
document.getElementById('version').innerHTML = 'Version '+verNo;

document.getElementById('hotfix_link').addEventListener('click', function(){
  main = document.querySelector('div.main');
  main.innerHTML = `

  <div class="warning"><strong>Warning: </strong>only apply modifications made by people you trust.</div>
  <h1>Apply Modification</h1>
  <p>If you already have a modification, it will display here</p>
  <input style="width: 100%;margin-bottom:5px;" id="hotfix_input" placeholder="Paste URL here"></input>
  <button id="hotfix_confirm" type="button">Save</button><button id="hotfix_remove" type="button">Remove</button>`;

  chrome.storage.sync.get(null, function(result){
    if(result["hotfix"] != undefined) document.querySelector('#hotfix_input').value = result["hotfix"];
  });

  document.querySelector('#hotfix_confirm').addEventListener('click', function(){
    f = {};
    f["hotfix"] = document.querySelector('#hotfix_input').value;
    chrome.storage.sync.set(f, function(){document.querySelector('div.main').innerHTML="Modification applied successfully.";});
  });

  document.querySelector('#hotfix_remove').addEventListener('click', function(){
    chrome.storage.sync.remove("hotfix", function(){document.querySelector('div.main').innerHTML="Modification removed.";});
  });
});
