# Earliest Sunrise Calculator
Simple script that generates a number of random locations on Earth, fetches their sunrise/sunset times, sorts them by earliest sunset and prints the length of the day with the earliest sunset.

## Getting started
To get started with this project, clone this repository:

`git clone https://github.com/Jakub-L/earliest-sunrise.git`

And install the package dependencies:

`npm install`

## Usage
To build and run the function use:

`npm start`

This will compile the TypeScript file to JavaScript and execute it using Node.

Alternatively, you can separately build the script using:

`npm run build`

And then manually execute the functions with:

`node ./dist/index.js`

The function will then run. The length of the day with the earliest sunset will be then printed to the console.

### Changing Functionality
To change the number of random locations generated, change the `count` argument with which `main()` is invoked in `src/index.ts`.

The API is limited to 5 concurrent requests, with a 10ms interval between checks whether another request can be sent. These properties can be changed by changing `MAX_CONCURRENT_REQUESTS` and `REQUEST_RETRY_INTERVAL_MS` in `src/api.ts`. 

## Acknowledgements
This program uses the [Sunrise and Sunset API](https://sunrise-sunset.org/api).