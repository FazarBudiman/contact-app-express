const express = require("express");
const morgan = require("morgan");
const { loadContact, findContact } = require("./utils/contact");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("Time: " + Date.now());
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  const mahasiswa = [
    {
      nama: "Asep",
      email: "asep@gmail.com",
    },

    {
      nama: "Usro",
      email: "usro@gmail.com",
    },
  ];

  res.render("index", { nama: "Fazar Budiman", title: "Halaman Index", mahasiswa: mahasiswa });
});

app.get("/about", (req, res) => {
  res.status(200);
  res.render("about");
});

let contacts = loadContact();
app.get("/contact", (req, res) => {
  res.status(200);
  res.render("contact", { contacts: contacts });
});

app.get("/contact/:nama", (req, res) => {
  res.status(200);
  const contact = findContact(req.params.nama);
  res.render("detail", { contact: contact });
});

app.get("/product/:id", (req, res) => {
  res.send(`Product ID: ${req.params.id} and label product; ${req.query.label}`);
});

app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404<h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
