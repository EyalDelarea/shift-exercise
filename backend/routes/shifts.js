const express = require("express");
const router = express.Router();
const ShiftSchema = require("../Models/Shift");
const { buildResponse } = require("./Utils/ResponsePraser");

router.use(express.json());

/**
 * All shifts related routes
 */

//Query for shifts array coresponding to the userOwnerID id
router.get("/", async (req, res) => {
  try {
    const shifts = await ShiftSchema.find({ userOwnerID: req.query.userID });
    res.send(buildResponse("200", JSON.stringify(shifts)));
  } catch (e) {
    res.send(buildResponse("400", e));
  }

  res.status(400);
});

/**
 * Post request to create a new shift
 *
 * Two cases :
 * User already has a Document in the DB.
 * New user.
 */
router.post("/", async (req, res) => {
  const { start, end, userID } = req.body;
  try {
    //check for exsiting document with the _id of the user
    const userDocExists = await ShiftSchema.findOne({ userOwnerID: userID });
    //holds refreance to the corrent document which the shift will be added to the array
    var userDocRef = userDocExists;
    if (userDocExists === null) {
      //create document
      const shift = new ShiftSchema({
        shifts: [],
        userOwnerID: userID,
      });
      //update the ref
      userDocRef = await shift.save();
    }
    //Push the new shift into the array
    userDocRef.shifts.push({ start: start, end: end });
    await userDocRef.save();
    res.send(buildResponse(201, "New shift has been created :" + userDocRef));
  } catch (e) {
    console.log("Error in /shift post request "+e)
    res.status(500).json("There was an erorr trying to save the object " + e);
  }
});

/**
 * This endpoints handles the array of shifts inside the Shifts document.
 * Main uses :
 * 1. Update exsisting shifts inside the array
 * 2. Delete a shift from the array
 *
 * req should hold userOwnerID and the shifts array
 * shifts array logic implemented in the frontend
 */
router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const query = { userOwnerID: _id, shifts: req.body };
  try {
    const search = await ShiftSchema.updateOne(query);

    if (search) {
      res.send(buildResponse(200, "Removed Sucssfuly"));
    } else {
      res.send(buildResponse(404, "Item not found"));
    }
  } catch (e) {
    res.send(buildResponse(500, "Server Error " + e));
  }
});

module.exports = router;
