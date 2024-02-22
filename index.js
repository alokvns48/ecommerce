const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extendend: true}));

app.get("/", (req, res) => {
  res.send(
    `
    <div style="max-width: 300px">
        <form method="POST" style="display:flex;flex-direction: column">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="confirm password" />
            <button>Sign Up</button>

        </form>
    </div>
    `
  );
});



app.post("/", (req, res) => {
    console.log(req.body);
  res.send("Account Created");
});

app.listen(3000, () => {
  console.log("Listening");
});
