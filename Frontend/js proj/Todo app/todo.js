var todoApp=(function(){ // convert to IIFE


    console.log("To do app 6nov");
    let tasks=[];
    const taskList=document.getElementById('list')
    const addTaskInput=document.getElementById('add');
    const counter=document.getElementById('counter');
    const drawer=document.getElementById('drawer-notification');
    //var count=0;
    
    //  all .done & .text changed to .completed & .title as jsonholder have that data
    
    function fetchToDos(){
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())  // < this will return data in json to folllowing line
    .then(function(data){
        tasks=data.slice(0,10);
        renderList();
    })
    
    .catch(function (error){
        console.log('Error: ',error);
    }
    )
    
    
    }
    
    function addTaskToDOM(task){
        const li=document.createElement('li');
        li.innerHTML=`
                <label class="container">
                <input type="checkbox" id="${task.id}"
                ${task.completed ? 'checked' : ''} class="custom-checkbox" ">
                <lable for="${task.id}">${task.title}</lable>
                <span class="checkmark"></span>
                </lable>
                <div class="delete-img">
                <i class="fa-solid fa-trash-can delete" data-id="${task.id}"></i>
                    `
        taskList.append(li);
    
    
    /*
    //const li=document.createElement('li');
    const isChecked = todo.checked ? 'done': '';
    // Create an `li` element and assign it to `node`
    const node = document.createElement("li");
    // Set the class attribute
    node.setAttribute('class', `todo-done ${isChecked}`);
    // Set the data-key attribute to the id of the todo
    node.setAttribute('data-key', todo.id);
    node.setAttribute('id', todo.id);
    node.setAttribute('checked',true);
    // Set the contents of the `li` element created above
    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        
    `;
    
    // Append the element to the DOM as the last child of
    // the element referenced by the `list` variable
    list.append(node);
    */
    
    }
    
    function renderList(){
    taskList.innerHTML='';
    for(let i = 0; i < tasks.length; i++) {
    // console.log('${tasks[i].id}');
    addTaskToDOM(tasks[i]);
    }
    counter.innerHTML=tasks.length;
    
    }
    
    function addTask(task){
    if(task){
    tasks.push(task);
    renderList();
    showNotification("task added successfully");
    return;
    }
    
    showNotification("task not added ");
    }
    
    function deleteTask(taskId){
    let taskRem=tasks.filter(function(task){
    return task.id!== Number(taskId);
    })
    tasks=taskRem;
    //  count--;
    //  counter.innerHTML=count;
    renderList();
    showNotification("Text deleted");
    
    }
    
    function togggleTask(taskId){
    // console.log(taskId);    
    
    const task=tasks.filter(function(task){
        return task.id === Number(taskId)
        });
    
        if(task.length >0){
        const curTask=task[0];
        curTask.completed = !curTask.completed;
        renderList();
        setTimeout(()=>{
            drawer.style.height="0rem";
            drawer.style.width="10rem";
        },1000);
        return;
    }
    setTimeout(()=>{
        drawer.style.height="0rem";
        drawer.style.width="5rem";
    },1000);
        showNotification('Something went wrong');
    }
    
    function showNotification(text){
    alert(text);
    }
    
    function handleInput(e){
    if(e.key==='Enter'){
        const text=e.target.value;
        console.log('text',text);
        if(!text){
            showNotification("Task should not be Empty");
                return;
        }
    
        const task = {
        title:text,
            id: Date.now(), // can use Date.now().toString() if you dont want int want string
            completed: false
        }
            e.target.value = '';
        addTask(task);
    
    }
    }
    
    function handleClick(e){
    const target=e.target;
    //    console.log(target);
    if(target.className==='fa-solid fa-trash-can delete'){
        // console.log(target)
        const taskId=target.dataset.id;
        deleteTask(taskId);
        e.stopPropagation();       
        return;
    }
    else if (target.className === 'custom-checkbox') {
        const taskId=target.id;
        
        drawer.style.height="1.5rem";
        drawer.style.width="10rem";
        togggleTask(taskId);
    }
    
    }
    
    function intializeApp(){
    addTaskInput.addEventListener('keyup',handleInput);
    document.addEventListener('click',handleClick)
    fetchToDos();
    }
    
    // intializeApp();
    var a=10;
    return {
        intialize: intializeApp,
        a:a
    }
})()

