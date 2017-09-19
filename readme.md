## Up and running
-----------------

git clone https://e_e_harm@bitbucket.org/e_e_harm/beekeeper_js.git

cd beekeeper_js

npm install

npm install -g nodemon browserify

(in another shell) mongod

mongo db/seed.js

npm test

npm start

navigate to: http://localhost:8081


## Framework
------------

**server.js** The app runs on Express, go in here to set up the database/server/routes/paths however you like.

**public/js/index.js** Connects the framework to the browser.  The main loop lives here.  Browser events are passed from here into the game.  The base setup accepts keyboard input, but adding mouse and joystick support should be pretty easy.

## src/

**config/** Mappings for keyCodes, frameRate, resource paths, and as much as possible any numeric values aside from 0 and 1 that would otherwise be hardcoded into the game objects.

**controllers/** Modules to manage event-driven command creation. In particular, a controller is useful for responding to input and entity collisions.

**lib/** Reusable abstractions.

**models/** In-game objects and modules to support them. models/entities/ contains most scene nodes that move and render sprites, models/states/ is application states like game, pause, and title screen, and models/scenes/ contains setup objects for each level that gets passed to the application when the game state is active.

**views/** Scripts to handle specialized render logic, like animations and special effects.


## Features
-----------
**Fixed-step game loop** - Adjust frameRate in config/app.js.

**State management** - Set initial state in config/init.js, switch out state by calling `stateStack.pop(); stateStack.push(newState);`

**Scene Graph** - Send messages to objects on the screen by creating commands which target scene nodes by category.

**Collision Detection** - By default, all Entities check collision with each other. Other types of scene nodes can set `_registersCollisions` manually. State can delegate specific collision events to a controller, which can create a command when a certain category of scene node collides with a certain other category. Two out-of-the-box categories are worth mentioning: the 'wall' category comes with the library Wall entity, and the 'world-bound' category automatically plucks the entity from the scene graph if it leaves the boundaries of the canvas.

**Keyboard Input** - Create a controller and reference key bindings from config/keys.js.

**Graphics** - Put images somewhere in the public/ directory and reference them throughout your project from config/textures.js.

**Animation** - Put a reference to your spriteSheet and its descriptor in config/textures.js, and create an animator from lib/animator.js. Pass to the animator a reference to the canvas and an object containing your entity's position, an array of sprite names from the descriptor, and the length of the animation in milliseconds.

**Random Number Generation** - A la dice rolling and coin flipping.

**Timers** - Entities have a timers object that can be used by calling `entity.timers.addTimer(callback)` and in the callback defining a function the runs now (timer.onStart()), a number of milliseconds for the timer to last (timer.ms), and a function that runs after that many milliseconds (timer.onEnd()).

**Audio** - This feature is barely implemented but you can use the Sound module to add audio elements into the DOM, play them and pause them.

## Inspiration
--------------
The architecture of the framework is inspired by the book _[SFML Game Development](https://www.packtpub.com/game-development/sfml-game-development)_ by Jan Haller, Henrik Vogelius Hansson, Artur Moreira.

I tried to get the benefits of inheritance by cascading object factories instead of creating prototypes and instantiating objects with the 'new' keyword.  I got this idea from _[JavaScript: The Good Parts](https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/)_ by Douglas Crockford.


## To Do
--------
- Class for managing a game camera

