var validation = new Validation();
var toDoList = new TaskList();
var completeList = new TaskList();

getLocalStorage();

function getEle(id){
    return document.getElementById(id);
}

getEle("addItem").addEventListener("click",function(){
    var newTask = getEle("newTask").value;
    var id = Math.random();
    var status = false;
    // console.log(id,newTask);
    var isValid = true;
    isValid &= validation.ktraRong(newTask,"notiInput","Vui long nhap task!")
    && validation.ktraTrung(newTask,"notiInput","task bi trung",toDoList.arr);
    if(!isValid) return;
    var task = new Task(id, newTask, status);
    toDoList.addTask(task);
    // console.log(toDoList.arr);
    createTableComplete();
    setLocalStorage();
});

function createTableComplete(){
    getEle("todo").innerHTML = "";
    // getEle("completed").innerHTML = "";
    var content = "";
    var content1 = "";
    toDoList.arr.forEach(function(item){
            content += `
                <li>
                    <span>${item.taskName}</span>
                    <div class = "button">
                        <button class="remove" onclick="deleteTask(${item.id})"><i class="fa fa-trash"></i></button>
                        <button class="complete" onclick="changStatus(${item.id})"><i class="fa fa-check-circle"></i></button>
                    </div>
                </li>
            `})
    getEle("todo").innerHTML = content;
    completeList.arr.forEach(function(item){
                content1 += `
                    <li>
                        <span>${item.taskName}</span>
                        <div class = "button">
                            <button class="remove" onclick="deleteTask(${item.id})"><i class="fa fa-trash"></i></button>
                            <button class="complete btn btn-success" onclick="changStatus(${item.id})"><i class="fa fa-check-circle"></i></button>
                        </div>
                    </li>
                    `  
        })
        getEle("completed").innerHTML = content1; 
}


function deleteTask(id){
    // console.log(id);
    toDoList.deleteTask(id);
    completeList.deleteTask(id);
    createTableComplete();
    setLocalStorage();
}

function setLocalStorage(){
    localStorage.setItem("Complete_list", JSON.stringify(completeList.arr));
    localStorage.setItem("toDo_list", JSON.stringify(toDoList.arr));
}
function getLocalStorage(){
    if(localStorage.getItem("Complete_list")){
        completeList.arr = JSON.parse(localStorage.getItem("Complete_list"));
        createTableComplete();
    }else if(localStorage.getItem("toDo_list")){
        toDoList.arr = JSON.parse(localStorage.getItem("toDo_list"));
        createTableComplete();
    }
}
function changStatus(id){
    var task_todo = toDoList.getTaskById(id);
    // console.log("todoTask: ",task_todo);
    var task_complete = completeList.getTaskById(id);
    if(toDoList.arr.length > 0 && !task_todo.status ){
        task_todo.status = true;
        alert("change status success!");
        completeList.addTask(task_todo);
        console.log("complete: ",completeList.arr);
        toDoList.deleteTask(task_todo.id);
        setLocalStorage();
        createTableComplete(completeList.arr);
    }else if(completeList.arr.length > 0 && task_complete.status){
        task_complete.status = false;
        toDoList.addTask(task_complete);
        completeList.deleteTask(task_complete.id);
        setLocalStorage();
        alert("change status success!");
        createTableComplete(toDoList.arr);
        
    }
    
    
}