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

function chunkify(a, n, balanced) { // https://stackoverflow.com/a/8189268
    if (n < 2) return [a];
    var len = a.length, out = [], i = 0, size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));
    }
    return out;
}

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function calculateWeightedGPA(grade, weight){
  return grade * 0.05 - offset;
}

window.addEventListener("load", function(){
  chrome.storage.sync.get("null", function(result){
    if(result["mal"] != true){
      if(window.location.pathname == "/scripts/wsisa.dll/WService=wsEAplus/sfgradebook001.w"){
        var aisdGrd = document.querySelectorAll('.scrollRows table tr.cPd td');
        if(result["skywardGrades"] == true || result["skywardGrades"] != false){
          for(j = 0; j < aisdGrd.length; j++){
            i = aisdGrd[j];
            if(i.children.length != 0){
              c = i.children[0];
            }
            if(parseInt(c.innerHTML) < 70){
              c.style.color = '#FF0000';
            }
          }

          legend = document.querySelector('div#printGradesContainer > div.fXs.fIl.fWn');
          legend.innerHTML = legend.innerHTML + '<br><span style="float:right;">Failing grades are <b>red</b>.</span>';
        }

        if(result["skywardGpa"] == true || result["skywardGpa"] != false){
          // arr.slice(Math.max(arr.length - 5, 1))
          grades = [];
          for(j=0;j<aisdGrd.length;j++){
            i = aisdGrd[j];
            if(i.children.length != 0){
              g = parseInt(i.children[0].innerHTML);
            }
            else{
              g = 100;
            }
            grades.push(g);
          }
          classes = document.querySelectorAll("div.fixedRows table tr td div.gridWrap table tr td span.bld a");
          chunks = chunkify(grades, classes.length, true);
          console.debug(grades.length+", "+classes.length+", "+(grades.length-classes.length));
          weighted = [];
          for(j=0;j<classes.length;j++){
            name = classes[j].innerHTML;
            cs = chunks[j];
            grade = cs[cs.length-1];

            if(name.includes("Pre-AP")){ // is class pre-ap?
              offset = 0.5;
              classes[j].innerHTML = classes[j].innerHTML + '<span style="float:right;color:#AAA;">4.5</span>';
            }
            else if(name.includes("AP") || name.includes("IB")){ // is class ap or ib?
              offset = 0;
              classes[j].innerHTML = classes[j].innerHTML + '<span style="float:right;color:#AAA;">5.0</span>';
            }
            else{ // if not...
              offset = 1;
              classes[j].innerHTML = classes[j].innerHTML + '<span style="float:right;color:#AAA;">4.0</span>';
            }
            w = calculateWeightedGPA(grade, offset);
            weighted.push(w);
            console.debug(name+", grade="+grade+", offset="+offset+", weighted="+w);

          }
          gpa = round(((weighted.reduce(function(a, b) { return a + b; }, 0)) / weighted.length), 2);
          gcon = document.querySelector("#printGradesContainer");
          lab = document.createElement("p");
          lab.style = "text-align:center;padding-bottom:20px;";
          lab.innerHTML = 'Estimated semester weighted GPA: <strong>'+gpa+'</strong>'
          gcon.appendChild(lab);
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

      timeoutScript = document.createElement("script");
      timeoutScript.innerHTML = `
        setInterval(function(){ // no more inactivity :D
          gUsrIdle.clearIdle();
          gUsrIdle.trackIdleTime();
        },60000);`;
      document.head.append(timeoutScript);
    }
  });
});
