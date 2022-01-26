const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const fs = require("fs");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/demo.html"));
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const username = "yadav";
  const pass = "12345";
  if (req.body.uname == username && req.body.psw == pass) {
    const data = require("./data.json");
    console.log("Successful");
    res.status(200).send(data);
  } else {
    console.log("Failed");
    res.status(500).send("fail");
  }
});

router.get("/todos", (req, res) => {
  //res.sendFile(path.join(__dirname, "/todos.html"));
  var data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  res.status(200).send(data);
});
router.post("/todos", (req, res) => {
  var data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  data.push({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  var newData = JSON.striingify(data);
  fs.writeFile("data.json", newData, (err) => {
    if (err) throw err;
    console.log("Data added");
  });
  res.status(200).send(data);
});

// Delete Todo based on todo's title
router.delete("/todos/:title", (req, res) => {
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  const { title } = req.params;
  const found = data.some((element) => element.title === title);

  if (found) {
    data = data.filter((element) => element.title !== title);
    let newData = JSON.stringify(data);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
      console.log("Deleted selected todo");
    });
    res.status(200).send(data);
  } else {
    res.status(400).send("No such todo");
  }
});

// Update Todo
router.put("/todos/:title", (req, res) => {
  let data = fs.readFileSync("data.json");
  data = JSON.parse(data);

  const { title } = req.params;
  const found = data.some((element) => element.title === title);

  if (found) {
    let { description, status } = req.body;
    let newData = data.map((element) => {
      if (element.title === title) {
        return { ...element, description: description, status: status };
      }
      return element;
    });

    newData = JSON.stringify(newData);
    fs.writeFile("data.json", newData, (err) => {
      if (err) throw err;
      console.log("Updated selected todo");
    });
    res.status(200).send(data);
  } else {
    res.status(400).send("No such todo");
  }
});

router.post("/register", (req, res) => {
  res.send("trying to register");
});

router.get("/logout", (req, res) => {
  res.send("Logging out");
});
app.use("/", router);

app.listen(port, () => {
  console.log(`server reunning at port: ${port}`);
});
