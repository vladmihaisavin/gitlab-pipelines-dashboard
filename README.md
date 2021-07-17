# express-react-boilerplate

This project is a boilerplate for a SPA web application, using Express APIs as a back-end.

# How to run

First, install the project, by running `yarn`

## Run Client
`$ yarn client`
## Run Server
`$ yarn server`
## Run Client and Server
`$ yarn local`

# Performance tests
The performance tests are situated in the `./tests/performance` directory.<br>
They are written in Javascript and implemented with [k6.io](https://www.k6.io).

In order to run the performance tests, you must first install k6 on the machine (or use docker). [How to install k6](https://k6.io/docs/getting-started/installation).

Then, you must start the server. You can start the server locally by running `$ yarn server`.
Run k6 in a sepparate terminal by using this command, in the root directory of the project: `$ k6 run ./tests/performance/scripts.js`.

You can change the number of users / duration from the scripts.js file, in the options object. If you need to load test, it's recommended to use [ramping](https://k6.io/docs/using-k6/options#stages).