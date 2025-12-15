## Todo List
  Building a Todo List app for weekly assignments using Vite with a React template.

## Setup Instructions:
 1. Create a new repository in GitHub named as 'todo-list'. Do not add a .gitignore or a license at this stage.
 2. Clone the repository locally.
 3. Initialize the Vite + React App
    
    open a terminal in the local repository directory and  run the below command to scaffold out a Vite project using the React template
    
        npm create vite@latest . -- --template react
        npm install  -- to install all the dependencies packages

## To start the server:

 1. Start the development server with the command : 
 
    npm run dev
 2. open a browser to the Local link listed in the CLI.
 
 3. Keep the development server running and SPA open in a browser window while you work.

## Week 1: 
  1. create and checkout a new branch for week 1's assignment 'week-01-setup'
  
  2. publish the branch to GitHub
  
  3. Modify the code to display a title 'Todo List' and three todos beneath it.
  
  4. Enable ESLint to Highlight code problems and integrate Prettier 
  
  5. Commit changes in local working branch and push them up to GitHub and create a Pull Request(PR) comparing the working branch(week-01-setup) to main.   
  
  At the end of Week1, App should contains three todos under the app's title 'Todo List'

  ## Week 2:
   1.Create TodoList.jsx and move all todo code from App.jsx to TodoList.
   
   2.Create TodoForm.jsx with a non-functioning form with 1 input field and a submit button,

   3.Place the instance of TodoList and TodoForm into App component

   ## Week 3: Break

   ## Week 4:
   1. Render each static todo in a TodoListItem Component.

   2. In App Component, create a new state value that will hold a new todo. The browser should render that new state value between the form and the todo list.

   ## Week 5:
   1. The app now allow users to add a todo and keep the input focused when a todo is submitted using the button or the enter key.

   2. Renders all entered todos in a list.
   
     