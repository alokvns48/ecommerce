const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
  
    <div style="max-width: 300px">
          <form method="POST" style="display:flex;flex-direction: column">
              <input name="email" placeholder="email" />
              <input name="password" placeholder="password" />
              <button>Sign In</button>
  
          </form>
      </div>
    `,
  });
};
