module.exports = function(app) {
    app.use(proxy("/auth/google", { target: "https://habit-tracker-mr.herokuapp.com" }));
    app.use(proxy("/home", { target: "https://habit-tracker-mr.herokuapp.com" }));
    app.use(proxy("/auth/google/callback", { target: "https://habit-tracker-mr.herokuapp.com" }));
    app.use(proxy("/**", { target: "https://habit-tracker-mr.herokuapp.com" }));
};