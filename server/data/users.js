//pw: 12345
let users =  [
  {
    username: "ellie",
    password: "$2b$12$y.Pd.zjig2wILR9YekMV8.Qc/Fb12sQivaE8G8D9AqqnjdMl3xMgq",
    name: "Ellie",
    email: "ellie@test.com",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
  },
  {
    username: "bob",
    password: "$2b$12$y.Pd.zjig2wILR9YekMV8.Qc/Fb12sQivaE8G8D9AqqnjdMl3xMgq",
    name: "Bob",
    email: "bob@test.com",
    url: "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  }
]

export async function createUser(username, password, name, email, url) {
  const user = {
    username,
    password,
    name,
    email,
    url
  };
  users = [user, ...users]
  return users
}

export async function loginUser(username) {
  for (var i in users) {
    if(users[i].username === username) {
      return users[i].password
    }
  }
  return "fail"
}

export async function findByUsername(username) {
  for (var i in users) {
    if(users[i].username === username) {
      return users[i]
    }
  }
  return false
}