# API docs

There are 3 api routes: /api/project, /api/annotation, /api/comments

##GET /api/project
This is how you fetch projects. You can fetch by id, name, user, or get all

id: GET /api/project?id=the_id
    returns the project with the_id as the id
name: GET /api/project?name=projectName
    return project with the given projectName
user: GET /api/project?uName=username
    returns all projects by the given userName
all: GET /api/projectName
    returns a list of all project ids

##POST /api/project
A post request to /api/project must be accompanied with JSON data within the string body. JSON data must be of the from below:
    {
        "projectName": "...",
        "uName": "...",
        "imgString": ""
    }

##GET /api/annotation
