// **************** AUTH DATA *******************

function storeAuthData(authData) {
  localStorage.setItem("authData", JSON.stringify(authData));
}

function getAuthData() {
  return localStorage.getItem("authData")
    ? JSON.parse(localStorage.getItem("authData"))
    : {};
}

// ************************************************

// ******************* OTP DATA *******************

function storeOTPData(otp) {
  localStorage.setItem("otp", JSON.stringify(otp));
}

function getOTPData() {
  return localStorage.getItem("otp")
    ? JSON.parse(localStorage.getItem("otp"))
    : {};
}

// ************************************************

// ************* YAMAAT CATEGORIES ****************

function storeYamaatCategories(yamaatCategories) {
  localStorage.setItem("yamaatCategories", JSON.stringify(yamaatCategories));
}

function getYamaatCategories() {
  return localStorage.getItem("yamaatCategories")
    ? JSON.parse(localStorage.getItem("yamaatCategories"))
    : {};
}

// ************************************************

// ************* CURRENT GAME (YAMAAT OR HORROR) **************

function storeCurrentGame(game) {
  localStorage.setItem("currentGame", JSON.stringify(game));
}

function getCurrentGame() {
  return localStorage.getItem("currentGame")
    ? JSON.parse(localStorage.getItem("currentGame"))
    : {};
}

// ************************************************

// ************* YAMAAT CURRENT GAME **************

function storeCurrentQuestion(question) {
  localStorage.setItem("currentQuestion", JSON.stringify(question));
}

function getCurrentQuestion() {
  return localStorage.getItem("currentQuestion")
    ? JSON.parse(localStorage.getItem("currentQuestion"))
    : {};
}

// ************************************************

// ****************** MY GAMES ********************

function storeMyYamaatGames(games) {
  localStorage.setItem("myYamaatGames", JSON.stringify(games));
}

function getMyYamaatGames() {
  return localStorage.getItem("myYamaatGames")
    ? JSON.parse(localStorage.getItem("myYamaatGames"))
    : {};
}

function storeMyHorrorGames(games) {
  localStorage.setItem("myHorrorGames", JSON.stringify(games));
}

function getMyHorrorGames() {
  return localStorage.getItem("myHorrorGames")
    ? JSON.parse(localStorage.getItem("myHorrorGames"))
    : {};
}

export {
  storeAuthData,
  getAuthData,
  storeOTPData,
  getOTPData,
  storeYamaatCategories,
  getYamaatCategories,
  storeCurrentGame,
  getCurrentGame,
  storeCurrentQuestion,
  getCurrentQuestion,
  storeMyYamaatGames,
  getMyYamaatGames,
  storeMyHorrorGames,
  getMyHorrorGames,
};
