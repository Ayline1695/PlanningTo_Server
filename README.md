# Planning To
<br>

## Description

An app to manage your daily life, to create your own projects and list. The app help to planning your future plans.

## User Stories

-  **404:** As an user I can see a 404 page if I try to reach a page that does not exist
-  **Signup:** As an user I can sign up to the app so that I can start to manage my daily life
-  **Login:** As a user I can login to the app so that I can see my projects and manage them
-  **Logout:** As a user I can logout from the app so no one else can use it
-  **View User Home** As a user I can see my profile
-  **Edit User Home** As a user I can edit my profile
-  **View Projects/Lists** As a user I want to see a list of my project and also a view of each project individually
-  **Add Projects/Lists** As a user I can add a project/List
-  **Edit Projects/Lists** As a user I can edit a project/List
-  **Delete Projects/lists** As a user I can delete a project/List
-  **Add Tasks** As a user I can add tasks to a project/List
-  **Delete Tasks** As a user I can remove tasks from a project/List
-  **View User profile** As a user I can see my profile
-  **Edit User profile** As a user I can edit my profile


## Backlog
- Share proyects between users
- edit tasks/projects
- drag and drop my proyects/lists home
- see featured projects
- add project deadlines to home page with the name of each project
- Times cities

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior                                                     |
| ------------------------- | -------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`                       | HomePage             | public `<Route>`            | Home page                                                    |
| `/signup`                 | SignupPage           | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage            | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/HomeUser`               | HomeUserPage     | user only `<PrivateRoute>`  | Page that shows all user´s projects, lists and dates             |
| `/projects`               | ProjectsListPage     | user only `<PrivateRoute>`  | Page that shows all projects              |
| `/projects/add`           | AddProjectForm       | user only `<PrivateRoute>`  | New project form, adds a new project and redirects to projects list once project has been added |
| `/projects/:id`           | ProjectDetailPage    | user only `<PrivateRoute>`  | Page with the details of a project, an edit form, the tasks list, and a form to add new tasks | 
| `/lists`               | ListsPage     | user only `<PrivateRoute>`  | Page that shows all user´s  list                |
| `/lists/add`           | AddListForm       | user only `<PrivateRoute>`  | New project form, adds a new list and redirects to projects in case is inside one, if is not, redirect to homepage of the User |
| `/lists/:id`           | ListDetailPage    | user only `<PrivateRoute>`  | Page with the details of a list, an edit form|
| `/profile`                | ProfilePage          | user only  `<PrivateRoute>` | Shows the user profile, that also renders an edit form  | 


## Components

- HomePage
 
- LoginPage

- SignupPage

- HomeUserPage
  * ProjectsCards
  * Lists
  * EventsOfDay
  * LastProjects

- ProjectsListPage  
  * ProjectCard
  * DeleteProjectButton

- AddProjectForm

- ProfilePage
  * EditProfileForm
  * EditProjects
  * EditListsButton
  * DeleteProjectsButton
  * DeleteListsButton

- ProjectDetailPage
  * EditProjectForm
  * TasksList
  * AddTaskForm
  * DeleteTaskButton

- Routes
  * AnonRoute
  * PrivateRoute

- Common
  * Navbar
  * Footer
  * Buttons


## Services

- Auth Service
  - authApi.login(user)
  - authApi.signup(user)
  - authApi.logout()

- Projects Service
  - projectsApi.list()
  - projectsApi.addProject(project)
  - projectsApi.getProjectDetails(projectId)
  - projectsApi.editProject(projectId, projectBody)
  - projectsApi.deleteProject(projectId)
 
- Tasks Service
  - tasksApi.addTask(projectId, taskBody)
  - tasksApi.deleteTask(projectId, taskId)
  
- Lists Service
  - listApi.list()
  - listsApi.addList(list)
  - listsApi.getListDetails(listId)
  - listsApi.editList(listId, listsBody)
  - listssApi.deleteList(listId)
  

<br>


# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  imageUrl: { type: String, required: true },
  projects: [ { type: mongoose.Schema.Types.ObjectId, ref: "Project" } ],
  lists: [ { type: mongoose.Schema.Types.ObjectId, ref: "List" } ]
},{ timestamps: true }
```

Project model

```javascript
{
  title: String,
  description: String,
  imageUrl: { type: String, required: true },
  tasks: [ { type: mongoose.Schema.Types.ObjectId, ref: "Task" } ],
  lists: [ { type: mongoose.Schema.Types.ObjectId, ref: "List" } ]
},{ timestamps: true }
```

Task model

```javascript
{
  description: String,
  status: Boolean,
},{ timestamps: true }
```
List model

```javascript
{
  name: String,
  description: String,
  status: Boolean,
  tasks: [ { type: mongoose.Schema.Types.ObjectId, ref: "Task" } ]
},{ timestamps: true }
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                | {username, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/api/projects`               |                              |                | 400          | Sends all projects                                         |
| GET         | `/api/projects/:projecId`           | {id}                         |                |              | Sends one specific project with its tasks/lists (if any)        |
| POST        | `/api/projects`               | {title, description}       | 201            | 400          | Create and saves a new project in the DB                   |
| PUT         | `/api/projects/:projecId`           | {title, description}              | 200            | 400          | Edits project in the DB                           |
| DELETE      | `/api/projects/:projecId`          | {id}                         | 201            | 400          | Deletes project    |
| POST        | `/api/tasks/:projecId`                | {name,description, status}      | 200            | 404          | Adds a new task to a specific project |
| PUT         | `/api/tasks/:taskId`            | {description, status}                   | 201            | 400          | Edits a task in the DB                         |
| DELETE      | `/api/tasks/:taskId`            | {id}                         | 200            | 400          | Deletes task                                             |
| GET         | `/api/lists              |                              |                | 400          | Sends all Lists                                        |
| GET         | `/api/lists/:listId`           | {id}                         |                |              | Sends one specific list with its tasks (if any)        |
| POST        | `/api/lists`               | {title, description}       | 201            | 400          | Create and saves a new list in the DB                   |
| PUT         | `/api/listss/:listId`           | {title, description}              | 200            | 400          | Edits list in the DB                           |
| DELETE      | `/api/lists/:listId`          | {id}                         | 201            | 400          | Delete list    |
| GET         | `/api/user`                 | {}                           | 201            | 400          | Sends user default                                          |
| PUT         | `/api/user/:userId`                  | {username ...}            |                |              | Edits user                           |



<br>


## Links

### Figma

https://www.figma.com/file/bwMCFrJBfPJQw56zmRSqEg/Untitled?node-id=2%3A380

### Git

https://github.com/Ayline1695/PlanningTo

The url to your repository and to your deployed project

[Client repository Link](https://github.com/yourgitusername/project-client) /

[Server repository Link](https://github.com/yourgitusername/project-server) /

[Deployed App Link](http://netlify.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)






