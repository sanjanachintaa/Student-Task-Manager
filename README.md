# Student Task and Deadline Manager

## 1. Project Overview

The **Student Task and Deadline Manager** is a simple web application designed to help students organize their academic tasks and keep track of deadlines. It allows students to add tasks, view their tasks, update task details, manage completion status, and keep their task information saved in the browser.

This mini-project is developed as part of **PEL5014 – Software Engineering and Agile Practices Lab**, Experiment 10.

## 2. Problem Statement

Students often have multiple assignments, homework activities, and academic deadlines to manage. Keeping track of these tasks manually can lead to missed deadlines and poor organization.

The Student Task and Deadline Manager provides a simple and user-friendly way to organize academic tasks, monitor their status, and manage deadlines in one place.

## 3. Objectives

- To help students organize their academic tasks.
- To record task names, subjects, and due dates.
- To track whether tasks are completed or pending.
- To allow users to update or delete tasks.
- To save task information in the browser using local storage.
- To apply software engineering and Agile practices during mini-project development.

## 4. Features

- **Add Tasks:** Create a task with its name, subject, and due date.
- **View Tasks:** Display saved tasks and their current status.
- **Manage Status:** Mark tasks as completed or pending.
- **Edit Tasks:** Update task details when required.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Data Persistence:** Store tasks in browser local storage so they remain available after refreshing the page.
- **Task Summary:** View task counts or status summaries, if implemented.
- **Deadline Highlighting:** Identify overdue tasks, if implemented.

*Note: The final feature list should match the features actually implemented in the project.*

## 5. Technologies Used

- **HTML5** – Structures the web page.
- **CSS3** – Provides styling and layout.
- **JavaScript** – Implements task management and application logic.
- **Browser Local Storage** – Stores task data locally in the browser.
- **Git and GitHub** – Used for version control and project hosting.

## 6. Project Structure

```text
Student-Task-Manager/
│
├── index.html       # Main web page
├── style.css        # Styling and layout
├── script.js        # Application functionality
└── README.md        # Project documentation
```

Additional files, such as test cases, screenshots, diagrams, or a CI workflow, may be added as the project documentation is completed.

## 7. Installation and Setup

No additional software installation or database setup is required to run the basic application.

1. Download or clone this repository.
2. Open the project folder.
3. Locate the `index.html` file.
4. Open `index.html` in a modern web browser.
5. Start adding and managing your tasks.

### Clone the Repository

Open a terminal or Command Prompt and run:

```bash
git clone https://github.com/sanjanachintaa/Student-Task-Manager.git
cd Student-Task-Manager
```

Then open `index.html` in your browser.

Alternatively, download the repository as a ZIP file from GitHub and extract it.

## 8. How to Use the Application

1. Open the application in your browser.
2. Enter the task name, subject, and due date.
3. Add the task using the application's add-task control.
4. View the task in the task list.
5. Mark the task as completed when finished.
6. Edit task details or delete a task when necessary.
7. Refresh the browser to verify that saved tasks remain available.

The exact controls may vary according to the final interface.

## 9. Testing

The application should be tested to verify that its main features work correctly.

| Test ID | Test Scenario | Expected Result |
|---|---|---|
| TC01 | Add a task with valid details | Task is added to the list |
| TC02 | Submit a task without a required name | Validation prevents an invalid task |
| TC03 | View the task list | Saved tasks and their statuses are displayed |
| TC04 | Mark a task as completed | Task status changes correctly |
| TC05 | Edit an existing task | Updated details are displayed |
| TC06 | Delete a task | Task is removed from the list |
| TC07 | Refresh the browser | Previously saved tasks remain available |
| TC08 | Enter or select a due date | The task displays the selected due date |

**Testing status:** Record the actual result of each test after running it. Do not mark tests as passed until they have been verified.

## 10. Agile Development Approach

The project is organized using a simple two-sprint Agile approach.

### Sprint 1: Basic Task Management

Planned features:
- Add tasks.
- View the task list.
- Mark tasks as completed or pending.

### Sprint 2: Task Management Improvements

Planned features:
- Edit task details.
- Delete tasks.
- Save tasks using browser local storage.
- Test the main application features.

Sprint results, completed user stories, and retrospective observations should be documented according to the work actually completed.

## 11. Version Control and Continuous Integration

The source code is maintained in a Git repository hosted on GitHub.

**GitHub Repository:**  
https://github.com/sanjanachintaa/Student-Task-Manager

Git is used to track source-code changes and commits. Continuous Integration (CI) can be configured using GitHub Actions to run appropriate checks when code is pushed to the repository.

Add the actual CI workflow and its results here once configured and verified. Do not claim that automated checks are passing unless the workflow has run successfully.

## 12. Limitations

- Task data is stored in the browser rather than in a shared online database.
- Tasks may not automatically synchronize across different browsers or devices.
- Data may be lost if the browser's local storage is cleared.
- The application does not require a user account in its basic version.

## 13. Future Enhancements

- Add reminders for upcoming deadlines.
- Introduce task priorities and categories.
- Add search and filtering options.
- Provide calendar-based task viewing.
- Add user authentication and cloud-based storage.
- Improve accessibility and mobile usability.

## 14. Conclusion

The Student Task and Deadline Manager demonstrates how a simple web application can help students organize academic work and monitor deadlines. The project uses HTML, CSS, and JavaScript to implement task management, with browser local storage for data persistence.

The project also provides an opportunity to apply software engineering concepts, including requirements analysis, user stories, sprint planning, testing, version control, documentation, and continuous integration.

---

**Course:** PEL5014 – Software Engineering and Agile Practices Lab  
**Experiment:** 10 – Mini-Project Demonstration and Documentation  
**Project:** Student Task and Deadline Manager