# Up and running
git clone https://e_e_harm@bitbucket.org/e_e_harm/beekeeper_js.github

cd beekeeper_js

npm install

npm install -g nodemon browserify

npm test

npm start

npm run open or navigate to: http://localhost:8081


## Framework
------------

### server.js
The framework runs on Express, so you can go in here to connect your game to a database or configure the setup for the server.

### public/js/index.js
Connects the framework to the browser.  The main loop lives here; it simply calls game.tick() on a fixed timestep.  The framerate is set in this file.  Browser events are passed from here into the game.  The base setup accepts keyboard input, but support for mouse and joystick will come along soon.

## src/
### game.js
This is the initial state. This class is serving two roles at the moment: it manages the application state and it is a state in and of itself.  This will be updated soon.  The Game passes input events to a player object, initializes the World and is responsible for updating and rendering the world with each tick.

### world.js
The World manages the Scene Graph and the Command Queue, and is responsible for passing commands, deltaTime, and the canvas to scene nodes so they can handle input, update, and render.  Each frame, the command queue is emptied into the scene graph, allowing each node to respond to the commands in the order they were created.  Then every node in the scene graph is updated and rendered.

### command.js
Commands can be created by a Player when a certain watched event occurs.  The command doesn't need to know about the event or the specific node on which it should work.  You can create commands in a Player object by passing a function for a scene node to execute as the first argument, and an array of categories as the second.  Every node in the world's scene graph will check the category list against its own categories to see if the command applies to that particular node, and if it does, the node will call that command on itself.

### scene_node.js
A scene node can represent any object in a scene graph.  The most interesting type of scene node is an Entity, which provides logic for a game character, enemy, bullet, or anything else that gets a graphical representation in the game.  A scene node can respond to commands as described in the command.js explanation, and it has access to the current deltaTime and canvas so it can run some custom logic on each call to update() and render().  Each scene node can have child nodes, which it will automatically update along with itself, so you can create a node tree, passing parent update logic to child nodes to synchronize their updating.

### entity.js
Entities are a common type of scene node that come with a position and velocity so they can be moved around the screen.  Most entities will also have a sprite - the default render logic for entities draws the entity's sprite at its current position on the screen.  This can be overwritten if the entity should render a 'shape literal' to the canvas such as a rectangle.

## Configuration
---------------

### player.js
There will probably be one player object for each state eventually.  Player objects listen for events and convert them into commands.

### textures.js
Contains a helper class for initializing Sprites and an object that can hold references to the files where your sprite images are stored.

## Inspiration
------------
The architecture of the framework is inspired by the book _[SFML Game Development](https://www.packtpub.com/game-development/sfml-game-development)_ by Jan Haller, Henrik Vogelius Hansson, Artur Moreira.

Scene Nodes (and eventually Game States) utilize the [Mozart](https://github.com/philipwalton/mozart) library to mimic classical inheritance in Javascript.  This library is only used in classes that require an inheritance hierarchy that can provide protected methods that can be overwritten.  See the entity class and Beekeeper class for examples of ways to extend a Mozart class.  Everywhere possible, I prefer factory methods, which in this framework will usually construct objects by calling ModuleName(), but in the case of commands (and perhaps other classes in the future) I decided that Command.new was a bit more expressive.  I don't believe the inconsistency is a huge obstacle, but anyone working with the framework can of course modify these conventions on their own.

## more to come
The Game class will eventually be a state, and the World is a support class for the GameState.  State and Application will be two important framework classes

## todo
-Class for managing the View and Viewport

-Collision detection system

-Animation system

-Audio support

-Write tests

