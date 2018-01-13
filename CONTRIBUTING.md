# Contributing

## Adding new features

### Router

To add routers, you should create a file in src/routers/ directory, the simplest way is to write `./bird router ROUTERNAME` in command line.

### Model(Database Collections)

To add collecions, you should create a file in src/models directory, the simplest way is to write `./bird model MODELNAME` in command line.

### Public Files

To add CSS, JavaScript, Fonts or Images you should put them in src/public file.

Note: CSS files must have .less extension in /src/public/css/, except /src/public/css/lib/ that must have .css

### Utilities

To add utilities you should add files to src/utils/

## View

To add html files you should add them to /src/views/

Note: In this project we're using nunjucks template, so your files must have .njk extension
