const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repository/users");

const app = express();

app.use(bodyParser.urlencoded({ extendend: true }));
app.use(
  cookieSession({
    keys: ["dsdkjsodkdsksasldjajs"],
  })
);

app.get("/signup", (req, res) => {
  res.send(
    `
    Your id is: ${req.session.userId}
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

app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }

  if (password !== confirmPassword) {
    return res.send("Password must match");
  }

  // Create a user in our repo to represent this person

  const user = await usersRepo.create({ email, password });

  // Store the id of that user inside the users cookie
  req.session.userId = user.id;

  res.send("Account Created");
});

app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

app.get("/signin", (req, res) => {
  res.send(
    `
    <div style="max-width: 300px">
        <form method="POST" style="display:flex;flex-direction: column">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <button>Sign In</button>

        </form>
    </div>
    `
  );
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePassword(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid password");
  }

  req.session.userId = user.id;

  res.send("You are signed in");
});

app.listen(3000, () => {
  console.log("Listening");
});
