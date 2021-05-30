// tasks list form
const theTodoList=[];

// create a class with ul element
class todo_class{
    constructor(item){
        this.ulElement=item;
    }

    // add task, stores data from input
    add(){
        const input = document.querySelector("#input").value;
        if (input == ""){
            alert("Type a task.")}
            else {
                const todoObject = {
                    id: theTodoList.length,
                    todoText: input,
                    isCompleted: false,
        }
        //unshift shows recent input at the top
        theTodoList.unshift(todoObject); 
        this.all();
        document.querySelector("#input").value = "";
        }
    }

    complete(x) {
        const selectIndex = theTodoList.findIndex((item) => item.id == x);
        console.log(theTodoList[selectIndex].isCompleted);
        theTodoList[selectIndex].isCompleted ==false ? theTodoList[selectIndex].isCompleted = true : theTodoList[selectIndex].isCompleted = false;
        this.all();
    }

    delete(z){
        const delIndex = theTodoList.findIndex((item) => intem.id == z);
        theTodoList.splice(delIndex,1);
        this.all();
    }

    all(){
        this.ulElement.innerHTML = "";

        theTodoList.forEach((object) => {
            const liElement = document.createElement("li");
            const delBtn = document.createElement("i");
            
            liElement.innerText = object.todoText;
            liElement.setAttribute("data-id", object.id);

            delBtn.setAttribute("data-id", object.id);
            delBtn.classList.add("far", "fa-trash-alt");

            liElement.appendChild(delBtn);

            delBtn.addEventListener("click", function(e) {
                const deleteId = e.target.getAttribute("data-id");
                todoList.delete(deleteId);
            })

            liElement.addEventListener("click", function(e) {
                const selectId = e.target.getAttribute("data-id");
                todoList.complete(selectId);
            })

            if (object.isCompleted) {
                liElement.classList.add("checked");
            }

            this.ulElement.appendChild(liElement);
        })
    }
}

function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
      theTodoList = [];
    }else{
      theTodoList = JSON.parse(getLocalStorageData); 
    }

    const pendingTasksNumb = document.querySelector(".pending");
    pendingTasksNumb.textContent = theTodoList.length;


// ul connected to the task list
const listSection = document.querySelector("#tasks");

todoList = new todo_class(listSection);


// task added in input box shows in task list
document.querySelector(".addBtn").addEventListener("click", function(){
    todoList.add()
})
