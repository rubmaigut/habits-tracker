export const createUser = async (email, username, password) => {
  let API_URL_NEW_USER = "https://habit-tracker-mr.herokuapp.com/user/new/signup";
  //" https://habit-tracker-mr.herokuapp.com/user/new/signup"

  let userInfo;
  let error400;

  await fetch(API_URL_NEW_USER, {
    mode: 'cors',
    credentials: 'include'
  }, {
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
  let ICON_URL = " https://habit-tracker-mr.herokuapp.com/icons";

  return fetch(ICON_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const formDataSelected = async (tableName) => {
  let FORM_URL = ` https://habit-tracker-mr.herokuapp.com/setup/${tableName}`;

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
  let CUSTOM_HABIT = " https://habit-tracker-mr.herokuapp.com/habits";

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
      console.log("err", err);
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
  id,
}) => {
  let UPDATE_HABIT = ` https://habit-tracker-mr.herokuapp.com/habit/update/${id}`;

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
        console.log("error", response);
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
      console.log("err", err);
      habitError = true;
      updateHabit = false;
    });
  return {
    habitError,
    updateHabit,
  };
};

export const defaultHabits = async (accessToken) => {
  let DEFAULT_HABIT_URL = " https://habit-tracker-mr.herokuapp.com/default-habits";

  return fetch(DEFAULT_HABIT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const findDefaultHabits = async ({ accessToken, id }) => {
  let FIND_DEFAULT_HABIT_URL = ` https://habit-tracker-mr.herokuapp.com/default-habits/${id}`;
  return fetch(FIND_DEFAULT_HABIT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const findHabit = async ({ accessToken, id }) => {
  let FIND_HABIT_URL = ` https://habit-tracker-mr.herokuapp.com/habit/${id}`;
  return fetch(FIND_HABIT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const getUserHabits = async ({ accessToken }) => {
  let FIND_USER_HABIT_URL = ` https://habit-tracker-mr.herokuapp.com/habits/user`;
  return fetch(FIND_USER_HABIT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const fetchGoal = async () => {
  let GOAL_URL = " https://habit-tracker-mr.herokuapp.com/setup/goal";

  return fetch(GOAL_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.log(error));
};

export const fetchHabitByDay = async ({ accessToken, startDate }) => {
  let HABIT_DONED = " https://habit-tracker-mr.herokuapp.com/done-by-date";

  return fetch(HABIT_DONED, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      date: startDate,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const fetchHabitByMonth = async ({ accessToken, startDate }) => {
  let HABIT_DONED = " https://habit-tracker-mr.herokuapp.com/done-by-month";

  return fetch(HABIT_DONED, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      date: startDate,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const IsHabitDone = async ({ accessToken, id, count, goal, isDone }) => {
  let DONE_HABIT = ` https://habit-tracker-mr.herokuapp.com/done/update/${id}`;

  let habitDoneSaved;
  let errorSavedHabit;

  await fetch(DONE_HABIT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      countDone: count,
      goalDone: goal,
      isDone: isDone,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        errorSavedHabit = true;
        habitDoneSaved = false;
        console.log("response", response);
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        habitDoneSaved = true;
      }
    })
    .catch((err) => {
      console.log("err", err);
      errorSavedHabit = true;
      habitDoneSaved = false;
    });
  return {
    errorSavedHabit,
    habitDoneSaved,
  };
};

export const deleteHabits = async ({ accessToken, id }) => {
  let DELETE_HABIT = ` https://habit-tracker-mr.herokuapp.com/habit/delete/${id}`;

  return fetch(DELETE_HABIT, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  }).then((response) => {
    return response.json();
  })
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
