const db = require("../../../data/db-config");

const registerUser = (user) => {
  return db("users").insert(user, ["user_id", "user_email", "user_password"]);
};

const findBy = async (key, filter) => {
    const user = await db("users").where({ [key]: filter }).first();
    return user;
}

module.exports = {
    registerUser,
    findBy
};