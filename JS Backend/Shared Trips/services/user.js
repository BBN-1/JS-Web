const User = require("../models/user");
const { hash, compare } = require("bcrypt");

//TO TO add all fields required by the exam


async function register(email, password, gender) {
  const existing = await getUserByUserName(email);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    email,
    gender,
    hashedPassword,
  });

  await user.save();

  return user;
}


async function login(email, password) {
  const user = await getUserByUserName(email);

  if (!user) {
    throw new Error("Incorrect username or password");
  }

  const hasMatch = await compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error("Incorrect username or password");
  }

  return user;
}


async function getUserByUserName(email) {
  const user = User.findOne({ email: new RegExp(`^${email}$`, 'i') });

  return user;
}

module.exports = {
    login,
    register
}
