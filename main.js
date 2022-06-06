let input=document.querySelector(".input-filed");
let addTask=document.querySelector(".add");
let tasksDiv=document.querySelector(".tasks");
let array=[];
if (localStorage.getItem("tasks")){
    array=JSON.parse(localStorage.getItem("tasks"));
}
getDatafromLocalStorage();
addTask.onclick=function(){
    if (input.value!=""){
        fnToAddArray(input.value);
    }
    input.value="";
}
    function fnToAddArray(taskText){
        let task={
            id:Date.now(),
            title:taskText,
            completed:false,
        }
        array.push(task);
         addEletoPage(array);
         addDataToLocalStorage(array);
    }
   
    function addEletoPage(array){
        tasksDiv.innerHTML="";
        array.forEach((task)=>{
            let div=document.createElement("div");
            div.className="task";
            if (task.completed){
                div.className="task done"
            }
            div.setAttribute("data-id",task.id);
            div.innerHTML=task.title;
            let span=document.createElement("span");
            span.innerHTML="Delete";
            span.className="del";
            div.appendChild(span);
            tasksDiv.appendChild(div);
        })
    }
    tasksDiv.addEventListener("click",(e)=>{
        if (e.target.classList.contains("del")){
            deleteEleWith(e.target.parentElement.getAttribute("data-id"));
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains("task")){
            completedStatus(e.target.getAttribute("data-id"));
            e.target.classList.toggle("done");
        }
    })
    function addDataToLocalStorage(array){
       localStorage.setItem("tasks",JSON.stringify(array))
    }
    function getDatafromLocalStorage(){
        let data=window.localStorage.getItem("tasks");
        if (data){
            let tasks=JSON.parse(data);
            addEletoPage(tasks);
        }
    }
function deleteEleWith(taskId){
    array=array.filter((task)=>task.id!=taskId);
    addDataToLocalStorage(array);

}
function completedStatus(taskId){
    for (let i=0;i<array.length;i++){
        if(array[i].id ==taskId){
            array[i].completed ==false?  array[i].completed =true: array[i].completed =false;
        }
    }
    addDataToLocalStorage(array);
}
let clearAll=document.querySelector("button");

clearAll.onclick=function(){
    tasksDiv.innerHTML="";
    localStorage.removeItem("tasks");
}