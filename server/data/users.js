import { getUsers } from '../db/database.js'

export async function createUser(username, password, name, email, url) {
    const user = {
      username,
      password,
      name,
      email,
      url
    }
  return getUsers().insertOne(user).then((user) => {
    return user;
  })

  // const user = {
  //   username,
  //   password,
  //   name,
  //   email,
  //   url
  // };
  // users = [user, ...users]
  // return users
}

export async function loginUser(username) {
  return getUsers().findOne({username})
  .then((user) => {
    return user.password
  }).catch((error) => {
    return "fail"
  })
  // for (var i in users) {
  //   if(users[i].username === username) {
  //     return users[i].password
  //   }
  // }
  // return "fail"
}

export async function findByUsername(username) {
  return getUsers().findOne({username})
    .then((user) => {
      return user
    })

  // for (var i in users) {
  //   if(users[i].username === username) {
  //     return users[i]
  //   }
  // }
  // return false
}