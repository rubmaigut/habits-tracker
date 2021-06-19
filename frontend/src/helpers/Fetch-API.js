export const createUser = async (email, username, password) => {
  let API_URL_NEW_USER = "http://localhost:8080/user/new/signup";
  //" https://habit-tracker-mr.herokuapp.com/user/new/signup"

  let userInfo;
  let error400;

  await fetch(API_URL_NEW_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: false,
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        error400 = true;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        userInfo = json;
      }
    })
    .catch((err) => (userInfo = false));

  return { userInfo, error400 };
};

export const iconsData = async () => {
  let ICON_URL = "http://localhost:8080/icons";

  return fetch(ICON_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const formDataSelected = async (tableName) => {
  let FORM_URL = `http://localhost:8080/setup/${tableName}`;

  return fetch(FORM_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};
