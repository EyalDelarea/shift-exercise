const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const router = express.Router();
const { buildResponse } = require("./Utils/ResponsePraser");

router.post("/register", async (req, res) => {
  try {
    const { userID, password } = req.body;

    const errors = [];
    //validate fields (server side or client side or both?)
    for (const item of Object.values(req.body)) {
      if (item === "" || item === undefined) {
        errors.push("Please fill all the fields");
      }
    }

    if (password.length < 6) {
      errors.push("Password length should be at least 6 characters");
    }

    if (errors.length > 0) {
      res.send(buildResponse(400, errors));
    } else {
      const existsCheck = await User.findOne({ userID: userID });
      if (existsCheck) {
        //email is taken
        res.send(buildResponse(400, "ID is already taken"));
      } else {
        const newUser = new User({
          userID: userID,
          password: password,
        });
        //Hash password
        bcrypt.genSalt(10, async (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const insert = await newUser.save();
            if (insert) {
             // const jwt = generateJWT(newUser);
              res.send(
                buildResponse("200", {
                  message: "Sucsess",
                  payload: {
                    user: newUser,
                  },
                })
              );
            } else {
              res.send(
                buildResponse(
                  "500",
                  "Saving the user has failed,Please try again later."
                )
              );
            }
          });
        });
      }
    }
  } catch (e) {
    console.log("Error :" + e);
    res.send(buildResponse("500", e.message));
  }
});


router.post("/login", async (req, res, next) => {
  const { userID, password } = req.body;
  User.findOne({ userID: userID }).then(async (user) => {
    if (!user) {
      res.send(buildResponse("404", "UserID could not be found"));
    }
    //Compare hashed passwords Maybe shouldn't do it here?
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.send(buildResponse(200, user));
      } else {
        res.send(buildResponse("403", "Wrong password"));
      }
    });
  });
});


module.exports = router;
