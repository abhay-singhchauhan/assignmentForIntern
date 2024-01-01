const express = require("express");
const app = express();
const session = require("express-session");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  session({
    secret: "any-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

const users = [
  { name: "Abhay", email: "abhay9chauhan@gmail.com", password: "abhay@123" },
];
const sessions = [
  { name: "Abhay", email: "abhay9chauhan@gmail.com", sessionId: "dsfsf" },
];

app.post("/signup", (req, res, next) => {
  //the user should be saved after verification of the email I'm not doing this because of time constraint
  const { name, email, password } = req.body;
  users.push({ name, email, password });
  console.log(users);
  res.status(200).json({ name, email });
});

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (
    users.find((user) => user.password === password && user.email === email)
  ) {
    req.session.user = { id: crypto.randomUUID, username: email };
    res.json({ message: "Login successful", user: req.session.user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
  console.log(users);
});

app.listen(2002);
