let addbutton = document.querySelector(".addbutton");
let input = document.querySelector(".input");
input.focus();
let ul = document.querySelector("ul");

if(localStorage.length != 0 && localStorage.getItem("active").length > 0){
  for(let i = 0; i < JSON.parse(localStorage.getItem("active")).length; i++){
    let value = JSON.parse(localStorage.getItem("active"))[i].title;
    let id = JSON.parse(localStorage.getItem("active"))[i].id;
    let completed = JSON.parse(localStorage.getItem("active"))[i].completed;
    addList(value,id,completed);
  }
}

for(let i = 0; i < ul.children.length; i++){
  ul.children[i].addEventListener("click",function(event){
    // debugger;
    let divsClass = event.target.closest("div").className;
    if(divsClass === "completed" ){
      event.target.closest("div").className = "active";

      let x = JSON.parse(localStorage.getItem("active"));
      let c = x.filter(e=> e.id === event.target.closest("div").id && e.completed === true)[0];
      c.completed = false;
      localStorage.setItem("active",JSON.stringify(x));

    } else if(divsClass === "active"){

      event.target.closest("div").className = "completed";

      let x = JSON.parse(localStorage.getItem("active"));
      let c = x.filter(e=> e.id === event.target.closest("div").id && e.completed === false)[0];
      c.completed = true;
      localStorage.setItem("active",JSON.stringify(x));

    }
  });
  
    ul.children[i].addEventListener("dblclick",function(event){
      // debugger;
      let element = event.target.closest("div");
      if(element.className != "editing"){
        let value = element.innerText;
        let changingInput = document.createElement("input");
        changingInput.className = "editing";
        element.closest(".taskBox").className = "editing";
        changingInput.value = value;
        element.closest(".editing").appendChild(changingInput);
        element.remove();
        changingInput.focus();
        changingInput.addEventListener("keyup",function(event){
          if (event.keyCode === 13) {
            debugger;
            let x = JSON.parse(localStorage.getItem("active"));
            let c = x.filter(e=> e.title === value)[0];
            c.title = changingInput.value;
            localStorage.setItem("active",JSON.stringify(x));
            let div = document.createElement("div");
            c.className === true ? div.className = "completed" : div.className = "active" ;;
            div.id = c.id;
            div.innerText = changingInput.value;
            changingInput.after(div);
            // changingInput.closest(".editing").className = "taskBox";
            changingInput.parentNode.className = "taskBox";
            changingInput.remove();
            // location = location;
          }
        });

      }
    
    
      

  });

}

// for(let i = 0; i < ul.children.length; i++){
  
// }


addbutton.addEventListener("click", function() {
  const taskTitle = input.value;
  createNewTask(taskTitle);
  input.value = null;
});

input.addEventListener("keyup",function(event){
  if (event.keyCode === 13) {
    const taskTitle = input.value;
    createNewTask(taskTitle);
    input.value = null;
  }
});

function uniqueId() {
  return (
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function addList(value,id, completed = false){
  let li = document.createElement("li");
  let div = document.createElement("div");
  let div2 = document.createElement("div");
  let div3 = document.createElement("div");
  completed === true ? div.className = "completed" : div.className = "active" ;
  div.id = id;
  li.id = id;
  div2.className = "taskBox";
  div.innerText = value;
  div2.appendChild(div);
  li.appendChild(div2);
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
    localStorage.setItem("active",JSON.stringify(actives));
  }
  location = location
  // // window.location.reload();
}
