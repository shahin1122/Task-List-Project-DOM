//Naming as a veriables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Loding all event listeners
loadEventListener();


// load all event listeners
function loadEventListener() {

    //Dom load event
    document.addEventListener('DOMContentLoaded' , getTasks);
    // add task event
    form.addEventListener('submit' , addtask); 

    //remove task event
    taskList.addEventListener('click' , removetask);

    // Clear task btn
    clearBtn.addEventListener('click' , clearTask);

    //Filter task event
    filter.addEventListener('keyup' , filtertask)
}


get 


// get task from LS
function getTasks() {
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
        //console.log(tasks)
    }

    
    tasks.forEach(function(task) {
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // create a text node and append to the li 
    li.appendChild(document.createTextNode(task));
    

    // create link
    const link = document.createElement('a');
    // add class and attribute
    link.className = 'delete-item secondary-content';
    


    // adding icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // appending the link to li
    li.appendChild(link);

    // appending li to ul
    // console.log(li);
    taskList.appendChild(li);
    })
}

// add task 
function addtask(e){
    
    if(taskInput.value === ''){
        //console.log('added!')
        alert('Add a task')
    }

    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    // create a text node and append to the li 
    li.appendChild(document.createTextNode(taskInput.value));
    

    // create link
    const link = document.createElement('a');
    // add class and attribute
    link.className = 'delete-item secondary-content';
    


    // adding icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // appending the link to li
    li.appendChild(link);

    // appending li to ul
    // console.log(li);
    taskList.appendChild(li);

    
    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // clearinput 
    taskInput.value = '';
    e.preventDefault();
}



// store task Func
function storeTaskInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// removetask function

function removetask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
         if(confirm('Are you sure ? ')){
            e.target.parentElement.parentElement.remove();


            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
         }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task , index) {
        if(taskItem.textContent === task ){
            tasks.splice(index , 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
} 




//Clear task

function clearTask(e) {
    taskList.innerHTML = '';
    clearTaskFromLocalStorage()
}


// Clear all tasks from LS
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

// filtertask

function filtertask(e) {
    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text)!= -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}
