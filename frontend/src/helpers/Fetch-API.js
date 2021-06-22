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

export const createCustomHabit = async ({
  accessToken,
  category,
  name,
  count,
  goal,
  frequency,
  timeRange,
  icon,
  message,
  startedDate,
  endingDate,
}) => {
  let CUSTOM_HABIT = "http://localhost:8080/habits";

  let habitCreated;
  let habitError;

  await fetch(CUSTOM_HABIT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      category,
      name,
      count,
      goal,
      frequency,
      timeRange,
      icon,
      message,
      startedDate,
      endingDate,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        habitError = true;
        habitCreated = false;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        habitCreated = true;
      }
    })
    .catch((err) => {
      console.log("err", err)
      habitError = true;
      habitCreated = false;
    });
  return {
    habitError,
    habitCreated,
  };
};

export const updateYourHabit = async ({
  accessToken,
  category,
  name,
  count,
  goal,
  frequency,
  timeRange,
  icon,
  message,
  startedDate,
  endingDate,
  id
}) => {
    let UPDATE_HABIT = `http://localhost:8080/habit/update/${id}`;

  let updateHabit;
  let habitError;

  await fetch(UPDATE_HABIT, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      category,
      name,
      count,
      goal,
      frequency,
      timeRange,
      icon,
      message,
      startedDate,
      endingDate,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        habitError = true;
        updateHabit = false;
        console.log('error',response)
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        updateHabit = true;
      }
    })
    .catch((err) => {
      console.log("err", err)
      habitError = true;
      updateHabit = false;
    });
  return {
    habitError,
    updateHabit,
  };
};

export const defaultHabits = async (accessToken)=>{
  let DEFAULT_HABIT_URL = "http://localhost:8080/default-habits"

  return fetch(DEFAULT_HABIT_URL,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const findDefaultHabits = async ({accessToken, id})=>{
  let FIND_DEFAULT_HABIT_URL = `http://localhost:8080/default-habits/${id}`
  return fetch(FIND_DEFAULT_HABIT_URL,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
    .catch((error) => console.log(error));
};

export const findHabit = async ({accessToken, id})=>{
  let FIND_HABIT_URL = `http://localhost:8080/habit/${id}`
  return fetch(FIND_HABIT_URL,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
    .catch((error) => console.log(error));
};

export const getUserHabits = async ({accessToken})=>{
  let FIND_USER_HABIT_URL = `http://localhost:8080/habits/user`
  return fetch(FIND_USER_HABIT_URL,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    }})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
    .catch((error) => console.log(error));
};

export const fetchGoal= async()=>{
  let GOAL_URL ="http://localhost:8080/setup/goal"

  return fetch(GOAL_URL)
  .then((response) => {
    return response.json();
  })
  .then((data) => data)
  .catch((error) => console.log(error))

}
