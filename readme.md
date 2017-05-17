## Up and running
-----------------

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

### config/
Mostly objects which reference constants, like keyCodes, colors, frameRate, and resource paths.

### controllers/
Modules to manage event-driven command creation. In particular, a controller is useful for responding to input and entity collisions.

### lib/
Bedrock of the framework that is unlikely to need much change.

### models/
In-game objects and modules to support them. models/entities/ contains most scene nodes that move and render sprites, models/states/ is application states like game, pause, and title screen, and models/levels/ contains setup objects for each level that gets passed to the application when the game state is active.

### views/
Scripts to handle specialized render logic, like animations and special effects.


## Features
-----------
**Fixed-step game loop** - adjust frameRate in config/app.js.

**State management** - set initial state in config/app.js, switch out state by calling `stateStack.pop(); stateStack.push(newState);`

**Scene Graph** - Easily send messages to objects on the screen by creating commands which target scene nodes by category.

**Collision Detection** - By default, all Entities check collision with each other. Other types of scene nodes can set `_registersCollisions` manually. State can delegate specific collision events to a controller, which can create a command when a certain category of scene node collides with a certain other category.

**Graphics** - Put images somewhere in the public/ directory and reference them throughout your project from config/textures.js.

**Keyboard Input** - Create a controller and reference key bindings from config/keys.js.

## Inspiration
--------------
The architecture of the framework is inspired by the book _[SFML Game Development](https://www.packtpub.com/game-development/sfml-game-development)_ by Jan Haller, Henrik Vogelius Hansson, Artur Moreira.

There is an inheritance pattern which can be observed by looking at SceneNode, Entity, and (for example) Beekeeper modules. Anyone is of course free to use prototypes to extend the framework but the basic library instead uses factory functions to create, extend and override object data and interfaces.  This idea is adapted from _[JavaScript: The Good Parts](https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/)_ by Douglas Crockford.  Truly private variables can exist if placed in the factory function but outside the scope of the object that gets returned by the factory.  Variables prefixed with an underscore are suggesting that they should be treated as protected, and preferably are only referenced within the factory or an extending factory, or altered within the callback passed to the factory when creating a new object.


## To Do
--------
-Class for managing the View and Viewport

-Animation system

-Audio support

-Saving high scores and other data with Mongo

-More unit tests

-JSDoc

