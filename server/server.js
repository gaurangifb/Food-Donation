import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import checkAuth from "./middleware/check-auth.js";

const app = express();
//app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's origin
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signupadmin",
  //database: "signup",
});

conn.connect((err) => {
  if (err) {
    console.error(err);
    console.log("Error in connecting database");
  } else {
    console.log("Database Connected");
  }
});

app.get('/donor', (req, res) => {
  const sql = "SELECT * from logindonor"
  conn.query(sql, (err, result) => {
    if(err) return res.json({Error: "Get donors error in sql"})
    return res.json({Status: "Success in retrieving donors", Result: result})
  })
})

app.post("/signupadmin", (req, res) => {
  const sql =
    "INSERT INTO loginAdmin (`name`, `email`, `password`) VALUES (?, ?, ?)";

  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing admin password" });

    const values = [req.body.name, req.body.email, hash];

    conn.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.json("Errorr in signing admin");
      } else {
        console.log("done");
        return res.json(data);
      }
    });

    // conn.query(
    // "SELECT email FROM loginAdmin WHERE email = ?",
    // [req.body.email],
    // (err, result1) => {
    //   if (err) {
    //     console.error(err);
    //     return res.json({
    //       Status: "error",
    //       Error: "Error checking email existence",
    //     });
    //   }

    //   if (result1.length > 0) {
    //     return res.json({
    //       Status: "error",
    //       Error: "Email has already been registered",
    //     });
    //   }

    // Email does not exist, insert the new admin
    // conn.query(sql, values, (err, data) => {
    //   if (err) {
    //     console.error(err);
    //     return res.json({ Status: "error", Error: "Error in signing" });
    //   } else {
    //     console.log("done");
    //     return res.json({
    //       // Status: "success",
    //       // Error: "Errorrrr in signing",
    //       data
    //     });
    //   }
    // });
    //}
    //);
  });
});

app.post("/loginadmin", (req, res) => {
  const sql = "SELECT * FROM loginadmin Where email = ?";

  const values = [req.body.email, req.body.password];
  conn.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: "Errorrrr", Error: "Error in running query" });
    }

    // if(result.length>0) {
    //   return res.json("Success for logging")
    // } else {
    //   return res.json("Failure for logging")
    // }

    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error donor" });

          // const id = result[0].id;
          // const token = jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" });

          // console.log("Cookies in Request:", req.cookies);

          // res.cookie("token", token, {
          //   path: "/",
          //   secure: false,
          //   httpOnly: false,
          // });
          // console.log(token);

          // const token1 = req.cookies.token;
          // console.log("this is req.cookies.token:  ", token1);
          console.log("done logging admin");
          return res.json({ Status: "Success for logging" });
        }
      );
    } else {
      console.log("INvalid email or pass");
      return res.json({
        Status: "Error for logging",
        Error: "Wrong email or password",
      });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token1 = req.cookies.token;

  if (!token1) {
    return res.redirect("http://localhost:5173/loginadmin");
    console.log("come backkkkkkkkkkkkkk");

    //res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token1, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error(err);
        return res.json({ Error: "Token wrong" });
      }
      next();
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  console.log("hello there");
  return res.json({ Status: "Success for authentication" });
});

// app.post("/loginadmin", (req, res) => {
//   const sql = "SELECT * FROM loginAdmin Where `email` = ? and `password`= ?";
//   const values = [req.body.email, req.body.password];
//   conn.query(sql, [req.body.email], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.json({ Status: "Errorrrr", Error: "Error in running query" });
//     }
//     if (result.length > 0) {
//       if (err) return res.json({ Error: "password error" });

//       console.log("done logging");
//       return res.json({ Status: "Success for logging" });
//     } else {
//       console.log("INvalid email or pass");
//       return res.json({
//         Status: "Error for logging",
//         Error: "Wrong email or password",
//       });
//     }
//   });
// });
//

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success for cookie cleared" });
});

app.post("/signupdonor", (req, res) => {
  const sql =
    "INSERT INTO loginDonor (`name`, `email`, `password`) VALUES (?, ?, ?)";

  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing donor password" });

    const values = [req.body.name, req.body.email, hash];
    conn.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.json("Errorr in signing donor");
      } else {
        console.log("done");
        return res.json(data);
      }
    });
  });
});

app.post("/logindonor", (req, res) => {
  const sql = "SELECT * FROM logindonor Where email = ?";
  const values = [req.body.email, req.body.password];
  conn.query(sql, [req.body.email], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Status: "Errorrrr", Error: "Error in running query" });
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password error" });

          console.log("done logging donor");
          return res.json({ Status: "Success for logging" });
        }
      );
    } else {
      console.log("INvalid email or pass");
      return res.json({
        Status: "Error for logging",
        Error: "Wrong email or password",
      });
    }
  });
});

app.get("/test-cookie", (req, res) => {
  const token = req.cookies.token;
  console.log("Token from Cookie:", token);
  return res.json({ token });
});

app.listen(8081, () => {
  console.log("Running");
});
