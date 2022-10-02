const User = require("../models/user");
const { hash, compare } = require("bcrypt");

//TO TO add all fields required by the exam


async function register(firstName, lastName, email, password) {
  const existing = await getUserByUserEmail(email);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  await user.save();

  return user;
}


async function login(email, password) {
  const user = await getUserByUserEmail(email);

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
async function getUserByUserEmail(email) {
  const user = User.findOne({ email: new RegExp(`^${email}$`, 'i') });

  return user;
}



module.exports = {
    login,
    register,
    getUserByUserEmail,
    
}
