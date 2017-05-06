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
Classes to convert input into commands which can control scene nodes or other parts of the application.

### lib/
Bedrock of the framework that is unlikely to need much change.

### models/
In-game objects and classes to support them.

### states/
Objects that live on the state stack, like main menu, game, and pause.

### views/
Scripts to handle specialized render logic, like animations and special effects.


## Inspiration
--------------
The architecture of the framework is inspired by the book _[SFML Game Development](https://www.packtpub.com/game-development/sfml-game-development)_ by Jan Haller, Henrik Vogelius Hansson, Artur Moreira.

There is an inheritance pattern which can be observed by looking at SceneNode, Entity, and (for example) Beekeeper modules. Anyone is of course free to use prototypes to extend the framework but the basic library instead uses factory functions to create, extend and override object data and interfaces.  This idea is adapted from _[JavaScript: The Good Parts](https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/)_ by Douglas Crockford.  Truly private variables can exist if placed in the factory funtion but outside the scope of the object that gets returned by the factory.  Variables prefixed with an underscore are suggesting that they should be treated as protected, and preferably are only referenced within the factory or an extending factory, or altered within the callback passed to the factory when creating a new object.

## To Do
--------
-Class for managing the View and Viewport

-Collision detection system

-Projectiles

-Animation system

-Audio support

-Write tests

