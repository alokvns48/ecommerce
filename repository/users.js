const fs = require("fs");

class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf-8",
      })
    );
  }
}

const test = async () => {
  const repo = new UserRepository("users.json");

  const users = await repo.getAll();

  console.log(users);
};

test();
