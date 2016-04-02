```
 ________ ________  ___  __    ________          ________  _______   ________  ________  ________  _______           ________  ________  ___     
|\  _____\\   __  \|\  \|\  \ |\   __  \        |\   ___ \|\  ___ \ |\   ____\|\   __  \|\   ___ \|\  ___ \         |\   __  \|\   __  \|\  \    
\ \  \__/\ \  \|\  \ \  \/  /|\ \  \|\  \       \ \  \_|\ \ \   __/|\ \  \___|\ \  \|\  \ \  \_|\ \ \   __/|        \ \  \|\  \ \  \|\  \ \  \   
 \ \   __\\ \  \\\  \ \   ___  \ \  \\\  \       \ \  \ \\ \ \  \_|/_\ \  \    \ \  \\\  \ \  \ \\ \ \  \_|/__       \ \   __  \ \   ____\ \  \  
  \ \  \_| \ \  \\\  \ \  \\ \  \ \  \\\  \       \ \  \_\\ \ \  \_|\ \ \  \____\ \  \\\  \ \  \_\\ \ \  \_|\ \       \ \  \ \  \ \  \___|\ \  \ 
   \ \__\   \ \_______\ \__\\ \__\ \_______\       \ \_______\ \_______\ \_______\ \_______\ \_______\ \_______\       \ \__\ \__\ \__\    \ \__\
    \|__|    \|_______|\|__| \|__|\|_______|        \|_______|\|_______|\|_______|\|_______|\|_______|\|_______|        \|__|\|__|\|__|     \|__|
                                                                                                                                                 
```
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


##GET /api/annotation
This is how you get an annotation from a project by index. Index = 0 is the first annotation, Index = annotation.length - 1 is the newest annotation. Returns annotation object.
```json
{
	"projectID" : project id (from get all projects) - string,
	"annIndex" : index of annotation( valid from 0 to annotations.length - 1) - number
}
```
returns
```json
{
        user: {
            type: String,
            required: true
        },
        comments: [{
            user: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }],
        img: {
            type: String,
            required: true,
            notEmpty: true
        }
}
```
##POST /api/annotation
This is how you add an annotation to an existing project. Returns image, username and project name of added annotation.
```json
{
	"projectID" : project id (from get all projects) - string,
	"uName" : name of user creating comment - string,
	"imgString" :
}
```

##POST /api/comments
This is how you add a comment to an existing annotation. Returns added comment.
```json
{
	"uName" : name of user creating comment - string,
    "text" : comment text - string,
    "projectID" : project id (from get all projects) - string,
    "annIndex" : index of annotation( valid from 0 to annotations.length - 1) - number

}
```