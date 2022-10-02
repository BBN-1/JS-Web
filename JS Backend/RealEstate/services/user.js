const User = require("../models/user");
const { hash, compare } = require("bcrypt");

//TO TO add all fields required by the exam


async function register(fullname, username, password) {
  const existing = await getUserByUserName(username);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    fullname,
    username,
    hashedPassword,
  });

  await user.save();

  return user;
}

//TO DO change identifier
async function login(username, password) {
  const user = await getUserByUserName(username);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const hasMatch = await compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error("Incorrect username or password");
  }

  return user;
}

//TO TO identify user by given identifier
async function getUserByUserName(username) {
  const user = User.findOne({ username: new RegExp(`^${username}$`, 'i') });

  return user;
}

module.exports = {
    login,
    register
}
