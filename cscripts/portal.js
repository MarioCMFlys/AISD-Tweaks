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

// Add the forgot password link
if(window.location.pathname.startsWith("/_auth/login.aspx")
 || window.location.pathname.startsWith("/_auth/login_idp.aspx")){
  chrome.storage.sync.get(null, function(result){

    if(result["portalHelp"] == true || result["portalHelp"] != false){
      var aisdPasswordModal = `
      <h3>I keep entering my password wrong</h3>
      <p>If you enter your password incorrectly more than 6 times, you will be temporarily locked out of your account. If this happens, wait 5 minutes and your account will automatically unlock.</p>
      <h3>I forgot my password</h3>
      <p>If you believe you have forgotten your password, your only option is to go to your campus IT representative (Librarian, Technician, etc.) and ask them to reset it for you.</p>
      <br>
      <small>from AISD-TWEAKS</small>
      `;
      var aisdPasswordLink = '<label><a href="#" onclick="window.open(\'about:blank\').document.write(\`'+aisdPasswordModal+'\`);">Password Help</a></label>';

      var aisdPanel = document.getElementById("pnlLogon");
      aisdPanel.children[3].innerHTML = aisdPasswordLink;
      aisdPanel.children[2].remove();
    }

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
