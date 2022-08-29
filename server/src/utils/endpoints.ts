enum user_endpoints {
    GET_USER = "/user/:user_id",
    CREATE_USER = "/create",
    UPDATE_USER = "/update/user/:user_id", // USER_ID REQUIRED
    DELETE_USER = "/delete/user/:user_id", // USER_ID REQUIRED
    GET_ALL_USERS = "/get/all",
    GET_ALL_USER_POSTS = "/posts/get/all",
    LOGIN_USER = "/login"
}

enum post_endpoints {
    GET_POST = "/post/:post_id",
    CREATE_POST = "/create",
    UPDATE_POST = "/update/post/:post_id", // USER_ID REQUIRED
    DELETE_POST = "/delete/post/:post_id", // USER_ID REQUIRED
    GET_ALL_POSTS = "/get/all",
}

export { user_endpoints, post_endpoints };