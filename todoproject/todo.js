// tasks list form
const theTodoList = [];
const allBtn = document.querySelector(".allBtn");
const activeBtn = document.querySelector(".activeBtn");
const completedBtn = document.querySelector(".completedBtn");
const pendingSpan = document.querySelector(".pending");

let filter = "none";

allBtn.addEventListener("click", function (event) {
  // show everything
  filter = "none";
  todoList.all();
});

activeBtn.addEventListener("click", function (event) {
  // show active
  filter = "active";
  todoList.all();
});

completedBtn.addEventListener("click", function (event) {
  // show completed
  filter = "completed";
  todoList.all();
});

// create a class with ul element
class todo_class {
  constructor(item) {
    this.ulElement = item;
  }

  // add task, stores data from input
  add() {
    const input = document.querySelector("#input").value;
    if (input == "") {
      alert("Type a task.");
    } else {
      const todoObject = {
        id: theTodoList.length,
        todoText: input,
        isCompleted: false,
      };
      //unshift shows recent input at the top
      theTodoList.unshift(todoObject);
      this.all(); //refreshes
      document.querySelector("#input").value = "";
    }
  }

  //clicked completed-incompleted
  complete(taskId) {
    const selectIndex = theTodoList.findIndex((item) => item.id == taskId);
    theTodoList[selectIndex].isCompleted == false
      ? (theTodoList[selectIndex].isCompleted = true)
      : (theTodoList[selectIndex].isCompleted = false);
    this.all(); //refreshes
  }

  delete(taskId) {
    const delIndex = theTodoList.findIndex((item) => item.id == taskId);
    theTodoList.splice(delIndex, 1); //splice delete one element from the list(index), then how many
    this.all(); //user sees change(refresh)
  }

  
  //   Refresh HTML UI
  all() {
    this.ulElement.innerHTML = "";

    theTodoList.forEach((object) => {
      if (filter === "active" && object.isCompleted === true) return;
      if (filter === "completed" && object.isCompleted === false) return;
      
      const liElement = document.createElement("li");
      const delBtn = document.createElement("i");

      liElement.innerText = object.todoText;
      liElement.setAttribute("data-id", object.id);

      delBtn.setAttribute("data-id", object.id);
      delBtn.classList.add("far", "fa-trash-alt");

      liElement.appendChild(delBtn);

      delBtn.addEventListener("click", function (event) {
        // events depends of users
        const deleteId = event.target.getAttribute("data-id"); //target is delBtn
        todoList.delete(deleteId);
      });

      liElement.addEventListener("click", function (event) {
        const selectId = event.target.getAttribute("data-id");
        todoList.complete(selectId);
      });

      if (object.isCompleted) {
        liElement.classList.add("checked");
      }

      this.ulElement.appendChild(liElement);
    });

    const pendingTasks = theTodoList.filter((item) => item.isCompleted === false);
    pendingSpan.innerText = pendingTasks.length + ' tasks left';
  }
}



// ul connected to the task list
const listSection = document.querySelector("#tasks");

todoList = new todo_class(listSection);

// task added in input box shows in task list
document.querySelector(".addBtn").addEventListener("click", function () {
  todoList.add();
});
