var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
var request=event.target.result;
var result=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
console.log("Object store is not created",+error);
}
open.onsuccess=function(event){
 request=event.target.result;
var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");

var info=storeDB.get(paramValue);
info.onsuccess=function(data){
  console.log(data.target.result);
  display(data.target.result);
education(data.target.result);
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
  var img=document.createElement("img");
  img.src="image/add.svg";
  left.append(img);
  var h2=document.createElement("h2");
  h2.textContent=data.name;
  left.append(h2);
  var h4=document.createElement("h4");
  h4.textContent=data.email;
  left.append(h4);
  var h4=document.createElement("h4");
  h4.textContent=data.role;
  left.append(h4);
  var h4=document.createElement("h4");
  h4.textContent=data.mobile;
  left.append(h4);


//right div
var head=document.createElement("h2");
head.textContent="career objectives";
right.append(head);
var pc=document.createElement("p");
pc.textContent=data.career;
right.append(pc);
}
  function education(data){
var h1=document.createElement("h1");
h1.textContent="Educational Details";
right.append(h1);
var table=document.createElement('table');
table.border="1";
let row='';
row +="<tr>"+"<th>"+"name of institute"+"</th>"+
"<th>"+"degree"+"</th>"+
"<th>"+"branch"+"</th>"+
"<th>"+"percentage"+"</th>"+
"</tr>";
for(i in data.education){

    row +="<tr>"+"<td>"+data.education[i].college+"</td>"+
    "<td>"+data.education[i].degree+"</td>"+
    "<td>"+data.education[i].branch+"</td>"+
    "<td>"+data.education[i].marks+"</td>"+
    "</tr>";
    table.innerHTML=row;
    right.appendChild(table);
    }
}
