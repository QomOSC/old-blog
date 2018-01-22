# QOM OSC

Clone the project using `git clone https://github.com/qomosc/blog.git` command.

Then install the dependencies using `yarn install` command, and:

```[sudo] npm install -g gulp nodemon```

Remember, you must have MongoDB installed on your machine.

And to run the project, run `gulp full:dev && npm run devserver` command.

[Contributing](https://github.com/QomOSC/blog/blob/master/CONTRIBUTING.md)


If you want to make any changes or build the project, you have three ways:


1. `npm run client:build` that just watches `/src/views` and `/src/public/`
2. `npm run server:build` that watches other directories than `src/views` and `/src/public/`
3. `npm run full:build` that watches all of the directories in `src/` dir.
