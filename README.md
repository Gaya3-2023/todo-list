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

  ## Week 6:
   1. Render a message 'Add todo above to get started' when the todolist is empty.
   2. Disable the Add Todo button when the input is empty.
   3. Allow users to complete a todo. And list only the todos which is not complete.
   4. Convert form to controlled component.
      
  ## Week 7: Break

  ## Week 8:
   1. Organized components into features and shared directories for better structure.
   2. Created TextInputWithLabel as a reusable component to handle inputs and labels.
   3. Refactored TodoForm to use TextInputWithLabel for consistency.
   4. Enabled users to edit existing todos and toggle between display and edit modes.
   5. Added local state (workingTitle, isEditing) for controlled editing; updateTodo updates the todo list.
   6. Users can complete todos, edit titles, cancel edits, and save updates seamlessly.   
      
  ## Week 9:

   1. Configure the Airtable base and load todos from Airtable.
   2. Show a loading message while fetching todos from the API. Once the request completes,re-render the UI with the todo list(or display the original paragraph if no todos are returned).
   3. Enhance the "Add New Todo" functionality to show a saving indicator on the Add Todo button while the todo is being saved to Airtable.
   4. Update the Edit and Complete Todo features so that changes are persisted in Airtable.
   5. Display errors messages to the user if there are any fetch issues.
   6. overall, the app should retrieve todos from Airtable,allow users to create and edit todos , persist all changes to Airtable, and show any API-related errors to the user.


   ## Week 10:

   1. Updated Airtable table by adding new Field 'createdTime'
   2. created utility function 'encodeUrl' to handle sortby,direction and search todos url which is used in four locations: useEffect,addTodo,updateTodo and completeTodo. 
   3. Created a component 'TodosViewForm' to provide the user with a way to choose sort and direction(asc/desc). Also to provide options to search todos titles 
   4. Overall, the app should use the API to sort todos by title or createdTime and use the API to search for todos based on title contents.    
   