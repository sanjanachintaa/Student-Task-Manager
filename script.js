// =====================================================
// Student Task and Deadline Manager
// Plain JavaScript only. Tasks are saved in localStorage.
// =====================================================

// ---------- 1. Get HTML elements we need to use ----------
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const subjectInput = document.getElementById("subject");
const dueDateInput = document.getElementById("dueDate");
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const formTitle = document.getElementById("formTitle");
const messageBox = document.getElementById("message");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

// ---------- 2. Variables ----------
const STORAGE_KEY = "studentTasks";   // name used to save data in localStorage
let tasks = [];                       // array that holds all tasks
let editingTaskId = null;             // null = adding, otherwise the id of the task being edited

// Each task looks like this:
// { id: 1700000000000, name: "Assignment 1", subject: "Maths",
//   dueDate: "2026-10-20", completed: false }


// ---------- 3. localStorage functions ----------

// Load tasks from localStorage when the page opens
function loadTasks() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      tasks = JSON.parse(savedData);
    } catch (error) {
      tasks = [];   // if saved data is damaged, start with an empty list
    }
  }

  if (!Array.isArray(tasks)) {
    tasks = [];
  }
}

// Save the current tasks array into localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


// ---------- 4. Date helper functions ----------

// Returns today's date as text like "2026-10-15" (same format as the date input)
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

// Converts "2026-10-15" into "15 Oct 2026" for display.
// We build the date from separate numbers to avoid timezone mistakes.
function formatDate(dateString) {
  const parts = dateString.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// A task is overdue if it is NOT completed and its due date is before today
function isOverdue(task) {
  return !task.completed && task.dueDate < getTodayString();
}


// ---------- 5. Message function ----------

// Shows a message under the form. type is "error" or "success"
function showMessage(text, type) {
  messageBox.textContent = text;
  messageBox.className = "message " + type;
}

function clearMessage() {
  messageBox.textContent = "";
  messageBox.className = "message";
}


// ---------- 6. Add and update tasks ----------

// Runs when the form is submitted (Add Task / Save Changes)
function handleFormSubmit(event) {
  event.preventDefault();   // stop the page from reloading

  const name = taskNameInput.value.trim();
  const subject = subjectInput.value.trim();
  const dueDate = dueDateInput.value;

  // Validation: check that all fields are filled in
  if (name === "") {
    showMessage("Please enter a task name.", "error");
    taskNameInput.focus();
    return;
  }
  if (subject === "") {
    showMessage("Please enter a subject.", "error");
    subjectInput.focus();
    return;
  }
  if (dueDate === "") {
    showMessage("Please select a due date.", "error");
    dueDateInput.focus();
    return;
  }

  if (editingTaskId === null) {
    // ADD mode: create a new task
    const newTask = {
      id: Date.now(),        // current time in milliseconds works as a unique id
      name: name,
      subject: subject,
      dueDate: dueDate,
      completed: false
    };
    tasks.push(newTask);
    showMessage("Task added successfully.", "success");
  } else {
    // EDIT mode: update the existing task
    const task = tasks.find(function (t) {
      return t.id === editingTaskId;
    });
    if (task) {
      task.name = name;
      task.subject = subject;
      task.dueDate = dueDate;
    }
    showMessage("Task updated successfully.", "success");
  }

  resetForm();
  refreshPage();
}

// Puts a task's details into the form so the user can edit them
function editTask(taskId) {
  const task = tasks.find(function (t) {
    return t.id === taskId;
  });
  if (!task) {
    return;
  }

  editingTaskId = taskId;
  taskNameInput.value = task.name;
  subjectInput.value = task.subject;
  dueDateInput.value = task.dueDate;

  formTitle.textContent = "Edit Task";
  submitButton.textContent = "Save Changes";
  cancelButton.classList.remove("hidden");
  clearMessage();

  taskNameInput.focus();
  taskForm.scrollIntoView({ behavior: "smooth" });
}

// Clears the form and goes back to "Add" mode
function resetForm() {
  taskForm.reset();
  editingTaskId = null;
  formTitle.textContent = "Add a New Task";
  submitButton.textContent = "Add Task";
  cancelButton.classList.add("hidden");
}

// Runs when the user clicks "Cancel Edit"
function cancelEdit() {
  resetForm();
  clearMessage();
}


// ---------- 7. Complete / Pending and Delete ----------

// Switches a task between completed and pending
function toggleStatus(taskId) {
  const task = tasks.find(function (t) {
    return t.id === taskId;
  });
  if (task) {
    task.completed = !task.completed;
    refreshPage();
  }
}

// Deletes a task after the user confirms
function deleteTask(taskId) {
  const sure = confirm("Are you sure you want to delete this task?");
  if (!sure) {
    return;
  }

  // Keep every task except the one with this id
  tasks = tasks.filter(function (t) {
    return t.id !== taskId;
  });

  // If the deleted task was being edited, reset the form
  if (editingTaskId === taskId) {
    resetForm();
  }

  clearMessage();
  refreshPage();
}


// ---------- 8. Showing tasks on the page ----------

// Creates one line like "Subject: Maths" safely.
// textContent is used (not innerHTML), so user text can never run as HTML code.
function createInfoLine(label, value) {
  const line = document.createElement("p");
  line.className = "task-info";

  const labelPart = document.createElement("strong");
  labelPart.textContent = label + ": ";

  const valuePart = document.createElement("span");
  valuePart.textContent = value;

  line.appendChild(labelPart);
  line.appendChild(valuePart);
  return line;
}

// Creates a button and attaches a click function to it
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.className = "btn " + className;
  button.addEventListener("click", onClick);
  return button;
}

// Builds the card (HTML element) for one task
function createTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  const overdue = isOverdue(task);

  // Add a CSS class so the card gets green or red styling
  if (task.completed) {
    card.classList.add("completed");
  } else if (overdue) {
    card.classList.add("overdue");
  }

  // Task name
  const title = document.createElement("h3");
  title.textContent = task.name;
  card.appendChild(title);

  // Subject and due date
  card.appendChild(createInfoLine("Subject", task.subject));
  card.appendChild(createInfoLine("Due Date", formatDate(task.dueDate)));

  // Status line
  const statusLine = document.createElement("p");
  statusLine.className = "task-info";

  const statusLabel = document.createElement("strong");
  statusLabel.textContent = "Status: ";
  statusLine.appendChild(statusLabel);

  const statusText = document.createElement("span");
  if (task.completed) {
    statusText.textContent = "Completed";
    statusText.className = "status-completed";
  } else if (overdue) {
    statusText.textContent = "Pending (Overdue)";
    statusText.className = "status-overdue";
  } else {
    statusText.textContent = "Pending";
    statusText.className = "status-pending";
  }
  statusLine.appendChild(statusText);
  card.appendChild(statusLine);

  // Buttons: complete/pending, edit, delete
  const buttonArea = document.createElement("div");
  buttonArea.className = "task-buttons";

  const statusButtonText = task.completed ? "Mark as Pending" : "Mark as Completed";
  buttonArea.appendChild(createButton(statusButtonText, "btn-primary", function () {
    toggleStatus(task.id);
  }));
  buttonArea.appendChild(createButton("Edit", "btn-secondary", function () {
    editTask(task.id);
  }));
  buttonArea.appendChild(createButton("Delete", "btn-danger", function () {
    deleteTask(task.id);
  }));

  card.appendChild(buttonArea);
  return card;
}

// Draws all tasks on the page
function showTasks() {
  taskList.innerHTML = "";   // remove old cards (safe: we are only clearing)

  if (tasks.length === 0) {
    emptyMessage.classList.remove("hidden");   // show friendly message
    return;
  }

  emptyMessage.classList.add("hidden");

  tasks.forEach(function (task) {
    taskList.appendChild(createTaskCard(task));
  });
}


// ---------- 9. Dashboard summary ----------

function updateDashboard() {
  const total = tasks.length;

  const completed = tasks.filter(function (t) {
    return t.completed;
  }).length;

  const pending = total - completed;

  totalCount.textContent = total;
  pendingCount.textContent = pending;
  completedCount.textContent = completed;
}


// ---------- 10. Refresh everything ----------

// Called after every change: save data, redraw tasks, update counts
function refreshPage() {
  saveTasks();
  showTasks();
  updateDashboard();
}


// ---------- 11. Start the app ----------
taskForm.addEventListener("submit", handleFormSubmit);
cancelButton.addEventListener("click", cancelEdit);

loadTasks();      // 1. load saved tasks
showTasks();      // 2. display them
updateDashboard(); // 3. show the counts