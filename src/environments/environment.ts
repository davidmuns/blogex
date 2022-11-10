// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  users: "",
  PRODUCT_URL: 'https://blogexapp.herokuapp.com/producto/',
  AUTH_URL: 'https://blogexapp.herokuapp.com/auth/',
  EMAIL_PASSWORD_URL: 'https://blogexapp.herokuapp.com/email-password/',
  ARTICLE_BASE_URL: 'https://blogexapp.herokuapp.com/article/',
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer ',
  ARTICLES_LOCAL: './assets/articles.json',
  IMG_MAX_SIZE: 2100000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
