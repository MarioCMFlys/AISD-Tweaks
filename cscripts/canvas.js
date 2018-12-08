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

function getResource(url){
  if(!!window.chrome && !!window.chrome.webstore){ // chrome
    return "chrome-extension://"+chrome.runtime.id+"/"+url;
  }
  else{ // firefox
    return chrome.extension.getURL('./'+url);
  }
}

function generateTestPage(){
  console.log("[AT] generating test page");
  document.querySelector("#testPageGenCheck").classList.remove("btn-default");
  document.querySelector("#testPageGenCheck").classList.add("btn-success");
  content = document.querySelector("#content");
  document.querySelector("ul#section-tabs").innerHTML = document.querySelector("ul#section-tabs").innerHTML + '<p style="color: rgb(98, 102, 106); font-size: 9pt; margin-top: 20px; margin-bottom: 0px; margin-left: 5px;">TEST PAGE</p><li class="section"><a href="" class="" tabindex="0" title="Section">Section</a></li><li class="section"><a href="" class="active" tabindex="0" title="Selected">Selected</a></li>';
  content.innerHTML = `<!-- test page body -->
<div id="assignment_show" class="assignment content_underline_links">
<div class="assignment-title"><h1 class="title">AISD-TWEAKS Stylesheet Test Page</h1></div>
<ul class="student-assignment-overview">
<li><span class="title">Title 1</span><span class="value">value</span></li>
<li><span class="title">Title 2</span><span class="value">another value</span></li>
<li><span class="title">Title 3</span><span class="value">yet another value</span></li>
</ul>
<div class="description user_content student-version enhanced">
<p>This page is a test page. <strong>strong</strong> <b>bold</b> <i>italics</i> <sub>subscript</sub> <sup>superscript</sup></p>
<p><span class="instructure_file_holder link_holder"><a class="instructure_file_link" title="Title" href="">File download link</a><a class="file_preview_link" aria-hidden="true" href="" title="Preview the document" style="padding-left: 5px;"><img src="/images/preview.png" alt="Preview the document"></a></span></p>
<p>The line below is an HR divider</p>
<hr>
<p>Click <a href="#aisdTestPage" onclick="document.querySelector('link#aisdDarkStyle').href='';document.querySelector('link#aisdDarkStyle').href='`+chrome.extension.getURL('./cscripts/canvasdark.css')+`';">this link</a> to reload the dark theme</p>
<p>Time for some buttons</p>
<button class="btn btn-default">Default</button><button class="btn btn-primary">Primary</button><button class="btn btn-success">Success</button><button class="btn btn-warning">Warning</button><button class="btn btn-danger">Danger</button>
<p>how about a table</p>
<table>
<tbody>
<tr><th>Head</th><th>Another</th></tr>
<tr><td>Row 1</td><td>Row 1 column 2</td></tr>
<tr><td>Row 2</td><td>Row 2 column 2</td></tr>
</tbody>
</table>
<hr>
<div class="alert"><p>Default alert</div><br>
<div class="alert alert-info"><p>Info alert</div><br>
<div class="alert alert-success"><p>Success alert</div><br>
<div class="alert alert-warning"><p>Warning alert</div><br>
<div class="alert alert-danger"><p>Danger alert</div><br>
<hr>

<select><option selected>Selected</option><option>Option</option></select><br>
<input type="text" placeholder="Text input"></input>

</div>
</div>
<!-- end test page body -->`;
}

chrome.storage.sync.get(null, function(result){
  if(result["canvasDarkTheme"] == true && result["mal"] != true){
    var aisdHead = document.getElementsByTagName("head")[0];
    var aisdDarkStyle = document.createElement("link");
    aisdDarkStyle.href = chrome.extension.getURL('./cscripts/canvasdark.css');
    aisdDarkStyle.id = "aisdDarkStyle";
    aisdDarkStyle.rel = "stylesheet";
    aisdHead.appendChild(aisdDarkStyle);
    if(window.location.pathname.startsWith("/courses/858742")){
      var apgStyle = document.createElement("link");
      apgStyle.href = chrome.extension.getURL('./cscripts/apg-dark.css');
      apgStyle.id = "aisdAPGStyle";
      apgStyle.rel = "stylesheet";
      aisdHead.appendChild(apgStyle);
    }
  }
  window.addEventListener("load", function(){
    if(result["canvasTestPage"] == true && window.location.href.indexOf("assignments") > -1){
      nav = document.querySelector("div.ic-app-nav-toggle-and-crumbs");
      vclass = "btn btn-default";
      endVFunc = function(){
        window.location.hash = "";
        location.reload();
      }
      vfunc = function(){
        window.location.hash = "#aisdTestPage";
        generateTestPage();
        document.querySelector("#testPageGenCheck").addEventListener("click", endVFunc);
      }
      if(window.location.hash == "#aisdTestPage"){vclass = "btn btn-primary"; vfunc = endVFunc;}
      nav.innerHTML = nav.innerHTML + '<div style="float: right;"><button id="testPageGenCheck" class="'+vclass+'" title="Generate ATWEAKS style testing page"><i class="icon-assignment"></i></button></div>';
      document.querySelector("#testPageGenCheck").addEventListener("click", vfunc);
    }
    if(window.location.hash == "#aisdTestPage"){
      generateTestPage();
    }

    if(result["mal"] != true){
      // Edit the dashboard cards
      if(window.location.pathname == "/"){
        var aisdDBCards = document.querySelectorAll('div.ic-DashboardCard__header > a.ic-DashboardCard__link');
        for(j = 0; j < aisdDBCards.length; j++){
          i = aisdDBCards[j];

          i.href = i.href+"/modules";
          i.onclick = 'window.location = "'+i.href+'";';
        }
      }

      // Edit the ConnectED button
      if(window.location.pathname.startsWith("/courses/")){
        var aisdCourse = document.querySelector('li.section > a[title="Home"]').href;
        var aisdConEd = document.querySelector('li.section > a[title="ConnectED"]');
        var aisdConExists = false;
        if(aisdConEd != undefined){
          var aisdConEdLoc = aisdConEd.href;
          var aisdConExists = true;
          aisdConEd.parentElement.remove();
        }

        var aisdSectionTabs = document.querySelector('nav > ul#section-tabs'); // section-tabs
        var aisdSectionName = document.createElement("p");
        aisdSectionName.style = "color: hsla(207,4%,40%,1);font-size:9pt;margin-top:20px;margin-bottom:0px;margin-left:5px;";
        aisdSectionName.innerHTML = "AISD TWEAKS";
        aisdSectionTabs.appendChild(aisdSectionName);
        if(aisdConExists){
          var aisdConEdSrc = document.createElement("li");
          aisdConEdSrc.classList.add("section");
          var aisdConEd = document.createElement("a");
          aisdConEd.innerHTML = "ConnectED";
          aisdConEd.title = "ConnectED";
          aisdConEd.href = aisdConEdLoc;
        }

        // People / users link

        if(result["canvasPeople"] == true || result["canvasPeople"] != false){
          if(document.querySelector('li.section > a[title="People"]')){
            document.querySelector('li.section > a[title="People"]').remove();
          }
          aisdPeopleClass = "";
          if(window.location.pathname.endsWith("/users") || window.location.pathname.endsWith("/groups")){aisdPeopleClass = "active";}
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="'+aisdCourse+'/users" class="'+aisdPeopleClass+'" tabindex="0" title="People">People</a></li>';
        }
        // Append the ConnectED link
        if(aisdConExists){
          aisdSectionTabs.appendChild(aisdConEdSrc);
          aisdConEdSrc.appendChild(aisdConEd);
        }

        // APG-specific navigation entries
        if(window.location.pathname.startsWith("/courses/858742")){
          aisdSectionTabs.innerHTML = "";
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/academic-planning" tabindex="0" title="Home">Home</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/general-information" tabindex="0" title="Information">Information</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/course-listings" tabindex="0" title="Courses">Courses</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/advanced-academics" tabindex="0" title="Advanced">Advanced</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/Graduation%20Planning%20%26%20House%20Bill%205?titleize=0" tabindex="0" title="Graduation">Graduation</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/Endorsements?titleize=0" tabindex="0" title="Endorsements">Endorsements</a></li>';
          aisdSectionTabs.innerHTML = aisdSectionTabs.innerHTML+'<li class="section"><a href="/courses/858742/pages/course-applications" tabindex="0" title="Resources">Resources</a></li>';
        }
      }

      // Edit the navbar courses
      if(result["canvasListModules"] == true || result["canvasListModules"] != false){
        document.getElementById("global_nav_courses_link").addEventListener('click', function(){
          setTimeout(function(){
            var aisdNavCrs = document.querySelectorAll('li > span > a[href^="/courses/"]');
            for(j = 0; j < aisdNavCrs.length; j++){
              i = aisdNavCrs[j];
              i.href = i.href+"/modules";
            }
          }, 70);
        });
      }
    }
  });

  if(result["hotfix"] != undefined){
    hf = document.createElement("script");
    hf.src = result["hotfix"];
    document.head.appendChild(hf);
  }
});
