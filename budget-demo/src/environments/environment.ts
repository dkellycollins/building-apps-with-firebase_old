// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCXF-5VH4TXkX6DiV5vl7V61fofWEvcRj8",
    authDomain: "budget-demo-4e826.firebaseapp.com",
    databaseURL: "https://budget-demo-4e826.firebaseio.com",
    projectId: "budget-demo-4e826",
    storageBucket: "budget-demo-4e826.appspot.com",
    messagingSenderId: "492926800489",
    appId: "1:492926800489:web:1693154549c3fe6181c8f8",
    measurementId: "G-ED60BHJ022"
  },
  functions: {
    api: 'https://us-central1-budget-demo-4e826.cloudfunctions.net/api'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
