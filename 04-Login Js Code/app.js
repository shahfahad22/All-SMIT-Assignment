//  Register User 
if (window.location.pathname.includes('registration.html')) {
    const registerForm = document.getElementById('registerForm');
  
    registerForm.addEventListener('submit', function (e)  {
      e.preventDefault();
  
      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

  
      let users = JSON.parse(localStorage.getItem('users')) || [];
  
      const emailExists = users.some(user => user.email === email);
            if (emailExists) {
        alert('Email already exists! Please login.');
        window.location.href = 'index.html';
        return;
      }
      const newUser = { fullname, email, password };
      users.push(newUser);
  
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Registration successful! Please login.');
      window.location.href = 'index.html';
    });
  }
  
  //  Login User 
  if (window.location.pathname.includes('index.html')) {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'home.html';
      } else {
        alert('Invalid Email or Password!');
      }
    });
  }
  
if (window.location.pathname.includes('home.html')) {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');
  let editIndex = -1; // For tracking which todo is being edited

  // Todo tasks from localStorage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.textContent = todo;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteTodo(index);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        todoInput.value = todo;
        editIndex = index;
        addBtn.textContent = 'Save';
      };

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
  }

  function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    saveTodos(todos);
  }

  addBtn.onclick = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const text = todoInput.value.trim();
    if (text === '') return;

    if (editIndex > -1) {
      todos[editIndex] = text;
      editIndex = -1;
      addBtn.textContent = 'Add';
    } else {
      todos.push(text);
    }

    todoInput.value = '';
    saveTodos(todos);
  };

  loadTodos();
}

const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('loggedInUser');
      alert('Logged out successfully!');
      window.location.href = 'index.html';
    });