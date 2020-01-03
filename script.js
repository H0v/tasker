let allTasks = [];
let activeTasks = [];
let completedTasks = [];
let addbutton = document.querySelector(".addbutton");
let input = document.querySelector(".input");
let x;
let a;

addbutton.addEventListener("click",function(){
    allTasks.push({title : `${input.value}`, completed: false});
    localStorage.setItem('alltasks',(JSON.stringify(allTasks)));
});

