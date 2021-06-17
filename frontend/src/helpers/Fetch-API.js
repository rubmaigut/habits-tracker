export const createUser = async (email, username, password) => {
    let API_URL_NEW_USER = " https://habit-tracker-mr.herokuapp.com//user/new/signup"
  
    let userInfo;
    let error400;
  
    await fetch(API_URL_NEW_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  