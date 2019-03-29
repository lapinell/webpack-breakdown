//Notes
//  . is a reference to the working directory
//  .. is a ref to the directory above the working directory
//  __dirname is always the directory in which the currently executing script resides; 
// // officially "the directory name of the current module"
------
// webpack.config.js should be in the root folder so using __dirname is smartest because we want to reference the root and not accidently any other directory
const Plugin = require('plugin') // installed via npm into node_modules
const webpack = require('webpack') // access to built-in plugins

const path = require('path') // a core node.js module to manipulate file paths

const basicConfig = {
  // Webpack has built-in optimization that corresponds to each type of environment: dev, production, none

  // development mode: Sets process.env.NODE_ENV on DefinePlugin to the value of 'development'. Enables NamedChunksPlugin and NamedModulesPlugin.

  // production mode: Sets process.env.NODE_ENV on DefinePlugin to the value of 'production'. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and TerserPlugin.

  // None mode: Opts out of any default optimization options

  mode: 'production', // the default mode

  //this is where the module webpack should use to begin building out its internal dependency graph
  entry: './src/index.js' ,
  
  // tells webpack where to emit the bundles it creates and how to name them
  output: {
  
    // names the file and puts it in dist directory by default
    filename: 'bundle.js'
  },
  module: {

    // This rule is defined for this single module and has the following rule
    rules: {
      // test identifies which file or files should be transformed
      test: /\.css$/, //

      // use idicates which loader should be used to do the transforming
      use: 'css-loader' // loaders are transformations that are applied on the source code of a module; they allow you to pre-process files as you import/load them
    } 
      // Webpack finds any .css files inside a require()/import statement and uses the css-loader to transform it before adding it the bundle.
  },
  plugins: [
    new Plugin()
  ]
}
--------
const Plugin = require('plugin') // a fake plugin for example uses
const HtmlWebpackPlugin = require('html-webpack-plugin') //installed via npm
const webpack = require('webpack') //to access built-in plugins
const path = require('path')

const multipleConfig = {
  
  // multiple entries are used to separate concerns by environment, build target and runtime
  entry: {
    main: './src/index.js',
    exampleApp: './src/exampleApp.js',
    entryChunkName: ['./src/arrayOfStrings.js', './src/arrayOfStrings2.js']
  }, 

  // if config creates more than one chunk (as with multi entries or using certain plugins, use substitutions such as [name])
  output: {
    // result: writes to disk: ./public/main.js, ./public/exampleApp.js, ./public/entryChunkName.js
    filename: '[name].js',
    path: __dirname + '/public'
  },
 
  // uses multiple loaders to transform scss files in css into styles
  module: {
    rules: {
      test: /\.(css, scss, sass)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  },
  plugins: [
    new Plugin(),
    new webpack.ProgressPlugin(), // a built-in plugin
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}

// we want 3 separate dependency graphs because this gives us the opportunity to use optimization.splitChunks to create bundles of shared app code between each page reducing the amount of duplicated code
const advancedConfig = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/[name]/',
    publicPath: 'https://website.com/[name]/'
  }
}

module.exports { basicConfig, multipleConfig, advancedConfig }