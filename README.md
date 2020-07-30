melonJS boilerplate, simplified
-------------------------------------------------------------------------------

Sample project featuring :
- WebGL1 as default renderer
- Video autoscaling
- Mobile optimized HTML/CSS
- Swiping disabled on iOS devices
- Debug Panel (if #debug)
- Default icons
- asset file (resources.js) automatic generation
- distribution build
- Standalone build for desktop operating systems
- ES5 & ES6 shim for non compliant browser (see index.html)

## To run distribution

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone https://github.com/mbolis/melonjs-boilerplate-simple.git

Then in the cloned directory, simply run:

    npm install

Running the game:

    npm run serve

And you will have the boilerplate example running on http://localhost:8000

Every change you make to the code (except for changes to `index.html` and `index.css`), and game resources, will trigger a rebuild.  
You need to reload the running game afterwards.

## Building Release Versions

To build:

    npm run dist

This will create a `build` directory containing the files that can be uploaded to a server, or packaged into a mobile app.

-------------------------------------------------------------------------------

Includes a fix to prevent crashes on startup on some Linux machines. The fix works by unrolling a short loop in one of the shaders once at startup.

Note that you may have to edit the file `Gruntfile.js` if you need to better dictate the order your files load in. Note how by default the game.js and resources.js are specified in a specific order.

-------------------------------------------------------------------------------
Copyright (C) 2011 - 2020 Olivier Biot, 2020 Marco Bolis  
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
