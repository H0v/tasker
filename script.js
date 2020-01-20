// localStorage.clear();
// let allTasks = [];
// let activeTasks = [];
// let completedTasks = [];
let addbutton = document.querySelector(".addbutton");
let input = document.querySelector(".input");
let ul = document.querySelector("ul");
// debugger;
if(localStorage.length != 0 && localStorage.getItem("active").length > 0){
  for(let i = 0; i < JSON.parse(localStorage.getItem("active")).length; i++){
    let value = JSON.parse(localStorage.getItem("active"))[i].title;
    let id = JSON.parse(localStorage.getItem("active"))[i].id;
    addList(value,id);
  }
}

for(let i = 0; i < ul.children.length; i++){
  ul.children[i].addEventListener("click",function(event){

    
    let divsClass = event.target.closest("div").className;
    if(divsClass === "completed" ){
      event.target.closest("div").className = "active";
    } else if(divsClass === "active"){
      event.target.closest("div").className = "completed";
    }
    event.preventDefault();
  });
}


addbutton.addEventListener("click", function() {
  const taskTitle = input.value;
  createNewTask(taskTitle);
});

function uniqueId() {
  return (
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function addList(value,id){
  let li = document.createElement("li");
  let div = document.createElement("div");
  // let div2 = document.createElement("div");
  let label = document.createElement("label");
  let newInput = document.createElement("input");
  div.className = "active";
  newInput.type = "checkbox";
  newInput.onchange =  function(){return false;};
  newInput.id = id;
  label.htmlFor = id;
  // div2.innerText = value;
  // div2.className = "unchecked";
  // label.appendChild(div2);
  label.innerText = value;
  div.appendChild(newInput);
  div.appendChild(label);
  li.appendChild(div);
  ul.appendChild(li);
}

function createNewTask(value, id = uniqueId()) {
  addList(value,id)

  let actives =[];
  if(localStorage.length === 0){
    localStorage.setItem("active",JSON.stringify([{id:id,title:value,completed:false}]));
  }
  else {
    actives = JSON.parse(localStorage.getItem("active"))
    actives.push({id:id,title:value,completed:false});

    // let data = [JSON.parse(localStorage.getItem("active"))];
    // console.log(data);
    // data.push(actives);
    localStorage.setItem("active",JSON.stringify(actives));
  }



}
