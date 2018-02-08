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

## Deployment
Make sure Docker is running, then:

1. Build the project: `docker build -t blog .`
2. Create a docker network: `docker network create blog-net`
3. Run a MongoDB instance: `docker run -d --name mongo --network blog-net mongo:3.4`
4. Run it: `docker run -d --network blog-net -p 80:8010 -e DB=mongodb://mongo:27017/qomosc -e SECRET_KEY=mysecret blog`

> You should pass the MongoDB connection url as `DB` environment variable. `SECRET_KEY` is required if you want secure sessions. Provide a random and unguessable key.