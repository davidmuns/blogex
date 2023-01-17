export const environment = {
  production: true,
  users: "",
  FRONT_BASE_URL: 'https://blogex.netlify.app/',
  PRODUCT_URL: 'https://blogexapp.herokuapp.com/producto/',
  AUTH_URL: 'https://blogexapp.herokuapp.com/auth/',
  EMAIL_PASSWORD_URL: 'https://blogexapp.herokuapp.com/email-password/',
  ARTICLE_BASE_URL: 'https://blogexapp.herokuapp.com/article/',
  IMG_BASE_URL: 'https://blogexapp.herokuapp.com/imagen/',
  USER_BASE_URL: 'https://blogexapp.herokuapp.com/user/',
  VIDEO_BASE_URL: 'https://blogexapp.herokuapp.com/video/',
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer ',
  ARTICLES_LOCAL: './assets/articles.json',
  IMG_MAX_SIZE: 3100000, // 3MB
  // tinymce text editor config
  EDITOR_CONFIG: {
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    menubar: true, // defaults to false on mobile phones
    // toolbar: false,
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    mobile: {
      theme: 'mobile',
      plugins: 'lists'
    }
  }
};
