const layout = require("../layout");

module.exports = ({ req }) => {
  return layout({
    content: `       
    <div style="max-width: 300px">
    Your id is: ${req.session.userId}
        <form method="POST" style="display:flex;flex-direction: column">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="confirmPassword" placeholder="confirm password" />
            <button>Sign Up</button>

        </form>
    </div>
      `,
  });
};
