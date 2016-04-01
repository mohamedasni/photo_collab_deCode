# photo_collab_deCode
Hey Foko deCode Team!

Just a few instructions on how to setup:

If you guys are using an IntelliJ IDEA IDE such as Webstorm (free for student btw!!), just do check out from version control and it should clone the project for you guys. This could save time, I suggest you all try to use an IDE that has GIT integrated into it, rather using the command line every time! (You can try to download Webstorm, again free for students!, and I will show you how to push and pull from the repo if you could not figure it out)

Once you have cloned the project follow these steps:

1. Go to you project directory in your terminal and type the following 2 commands:
        -npm install
        -bower install
  (This will install all the modules that I had specifies in the package.js and bower.js files)

2. If you don't have MongoDB installed go to 'https://www.mongodb.org/' download and install it.
3. Make sure Mongo is added to your path, in order to use its commands in the terminal.
4. Once MongoDB is set up, type the following command: "mongod --dbpath ."
5. Now go back to your project and run the www.js file in the bin folder. (if you're not using an IDE and your terminal instead: simply navigate to the bin folder in the project and type "node www")
6. Now go to your browser and type "http://localhost:3000" (I set it up to listen on port 3000, if that port is being used, you can either free it up, or go to the www.js folder and change the port number!)
7. You should now see a template page!


Now for the project structure:

Note: This is a very modular structure!

1.The view folder will contain all the view files. :P
2.The public folder will contain our javascripts, controllers (angular if you want, or jquery etc...), bower modules (in the libs folder if you have done bower install already)
3. The routes folder, well... will contain our node.js routes!
4. Finally the models folder will contain all the mongo models we make.


Any quesitons about the skeleton and structure please DM me! - Simo Asni


