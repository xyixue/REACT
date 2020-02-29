const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleWares = jsonServer.defaults();
server.use(jsonServer.bodyParser);
server.use(middleWares);

// Token
const SECRET = "kfjsakfjsak4342423dfkajf";
const expiresIn = "1h";
const createToken = payload => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

//isAuthenticated
const getUserDB = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "UTF-8")
  );
};

const isAuthenticated = ({ email, password }) => {
  return (
    getUserDB().users.findIndex(
      user => user.email === email && user.password === password
    ) !== -1
  );
};
const isExist = email => {
  return getUserDB().users.findIndex(user => user.email === email) !== -1;
};

//Login
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password })) {
    const user = getUserDB().users.find(
      user => user.email === email && user.password === password
    );
    const { nickname, type } = user;
    //jwt
    const jwtToken = createToken({ nickname, type, email });

    return res.status(200).json(jwtToken);
  } else {
    const status = 401;
    const message = "Incorrect email or password";
    return res.status(status).json({ status, message });
  }

  console.log("Login success");
  return res.status(200).json("Login success");
});

server.post("/auth/register", (req, res) => {
  const { email, password, nickname, type } = req.body;

  if (isExist(email)) {
    return res.status(401).json(401, "Email already exist");
  }

  fs.readFile(path.join(__dirname, "users.json"), (err, _data) => {
    if (err) {
      const status = 401;
      const msg = err;
      return res.status(status).json({ status, msg });
    }
    const data = JSON.parse(_data.toString());

    const last_item_id = data.users[data.users.length - 1].id;

    data.users.push({ id: last_item_id + 1, email, password, nickname, type });
    fs.writeFile(
      path.join(__dirname, "users.json"),
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const msg = err;
          return res.status(status).json({ status, msg });
          return;
        }
      }
    );
  });
  const jwtToken = createToken({ nickname, type, email });
  res.status(200).json(jwtToken);
});

server.use("/carts", (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(" ")[1]
    );
    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error token is revoked";
    res.status(status).json({ status, message });
  }
});
// Verify the token
const verifyToken = token => {
  return jwt.verify(token, SECRET, (err, decode) =>
    decode !== undefined ? decode : err
  );
};

server.use(router);
server.listen(3003, () => {
  console.log("JSON Server is running");
});
