```
 ________  _______   ________  ________  ________  _______           ________  ________  ___     
|\   ___ \|\  ___ \ |\   ____\|\   __  \|\   ___ \|\  ___ \         |\   __  \|\   __  \|\  \    
\ \  \_|\ \ \   __/|\ \  \___|\ \  \|\  \ \  \_|\ \ \   __/|        \ \  \|\  \ \  \|\  \ \  \   
 \ \  \ \\ \ \  \_|/_\ \  \    \ \  \\\  \ \  \ \\ \ \  \_|/__       \ \   __  \ \   ____\ \  \  
  \ \  \_\\ \ \  \_|\ \ \  \____\ \  \\\  \ \  \_\\ \ \  \_|\ \       \ \  \ \  \ \  \___|\ \  \ 
   \ \_______\ \_______\ \_______\ \_______\ \_______\ \_______\       \ \__\ \__\ \__\    \ \__\
    \|_______|\|_______|\|_______|\|_______|\|_______|\|_______|        \|__|\|__|\|__|     \|__|
                                                                                                 
                                                                                                                                                 
```
# API docs

There are 3 api routes: /api/project, /api/annotation, /api/comments

##GET /api/project
This is how you fetch projects. You can fetch by id, name, user, or get all

- id: GET /api/project?id=the_id
    returns the project with the_id as the id
- name: GET /api/project?name=projectName
    return project with the given projectName
- user: GET /api/project?uName=username
    returns all projects by the given userName
- all: GET /api/project
    returns a list of all projects

returns 

```json
{
    "projectName": "String",
    "user": "String",
    "annotation": [{
        "user": "String",
        "comments": [{
            "user": "String",
            "text": "String"
        }],
        "img": "String",
	}]
};
```



##POST /api/project
A post request to /api/project must be accompanied with JSON data within the string body. JSON data must be of the from below:

request body
```json
    {
        "projectID" : "project id (from get all projects) - string",
        "uName" : "name of user creating comment - string",
        "imgString": "base 64 string representation of image"
    }
```
##GET /api/annotation
This is how you get an annotation from a project by index. Index = 0 is the first annotation, Index = annotation.length - 1 is the newest annotation. Returns annotation object.

request body

```json
{
	"projectID" : "project id (from get all projects) - string",
	"annIndex" : "index of annotation( valid from 0 to annotations.length - 1) - number"
}
```
returns
```json
{
        "user": "String",
        "comments": [{
            "user": "String",
            "text": "String"
        }],
        "img": "String",
}
```
##POST /api/annotation
This is how you add an annotation to an existing project. Returns image, username and project name of added annotation.
```json
{
	"projectID" : "project id (from get all projects) - string",
	"uName" : "name of user creating comment - string",
	"imgString" :
}
```

##POST /api/comments
This is how you add a comment to an existing annotation. Returns added comment.

request body
```json
{
	"uName" : "name of user creating comment - string",
    "text" : "comment text - string",
    "projectID" : "project id (from get all projects) - string",
    "annIndex" : "index of annotation( valid from 0 to annotations.length - 1) - number"

}
```
