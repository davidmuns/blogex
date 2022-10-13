// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  users: "",
  PRODUCT_URL: 'http://localhost:8080/producto/',
  AUTH_URL: 'http://localhost:8080/auth/',
  EMAIL_PASSWORD_URL: 'http://localhost:8080/email-password/',
  ARTICLE_BASE_URL: 'http://localhost:8080/article/',
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer ',
  ARTICLES_LOCAL: './assets/articles.json'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
