// tasks list form
const todoList=[];

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
                    id: todoList.length,
                    todoText: input,
                    isCompleted: false,
        }
        //unshift shows recent input at the top
        todoList.unshift(todoObject); 
        this.all();
        document.querySelector("#input").value = "";
        }
    }

    complete(x) {
        const selectIndex = todoList.findIndex((item) => item.id == x);
        console.log(todoList[selectIndex].isCompleted);
        todoList[selectIndex].isCompleted ==false ? todoList[selectIndex].isCompleted = true : todoList[selectIndex].isCompleted = false;
        this.all();
    }

    delete(z){
        const delIndex = todoList.findIndex((item) => intem.id == z);
        todoList.splice(delIndex,1);
        this.all();
    }

    all(){
        this.ulElement.innerHTML = "";

        todoList.forEach((object) => {
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

// ul connected to the task list
const listSection = document.querySelector("#tasks");
todoList = new todo_class(listSection);


// task added in input box shows in task list
document.querySelector(".addBtn").addEventListener("click", function(){
    todoList.add()
})
