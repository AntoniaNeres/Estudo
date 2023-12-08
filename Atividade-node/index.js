const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");

const cookieParser = require("cookie-parser");
const sessions = require("express-session");

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// cookie parser middleware
app.use(cookieParser());

//configure template handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//parser para leitura do body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//ADICIONANDO CAMINHO CSS
app.use(express.static("public"));

app.get("/users/add", (req, res) => {
  res.render("userform", { auth });
});

app.post("/users/save", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const message = `O usuário ${name} tem ${age} anos de idade`;

  res.render("viewuser", { message, auth });
});

const usuario = {
  login: "teste",
  senha: 123,
};

//username and password
// const login = 'user'
// const senha = '123456'

// a variable to save a session
var session;

app.get("/", (req, res) => {
  res.render("login");
});

var auth = false;

app.post("/user/login", (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;

  let message = "";

  if (login == usuario.login && senha == usuario.senha) {
    session = req.session;
    session.userid = req.body.login;
    console.log(session.userid);
    auth = true;
    message = `Usuário ${session.userid} logado com sucesso!`;
    res.render("home", { usuario: usuario, auth, message });
  } else {
    auth = false;
    message = "Usuário e/ou senha inválidos!";
    res.render("login", { auth, message });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//pagina 404
app.use(function (req, res, next) {
  res.status(404).render("404");
});

//webserver
app.listen(port, () => {
  console.log("Server Started");
});
