const express = require("express");
const router = express.Router();
const ShiftSchema = require("../Models/Shift");
const { buildResponse } = require("./Utils/ResponsePraser");

router.use(express.json());

//All shifts Route
router.get("/", async (req, res) => {
  try {
    const shifts = await ShiftSchema.find({ userOwnderId: req.query.userID });
    console.log(shifts);
    res.send(buildResponse("200", JSON.stringify(shifts)));
  } catch (e) {
    res.send(buildResponse("400", e));
  }

  res.status(400);
});

//Create shifts Route
router.post("/", async (req, res) => {
  const { start, end, userID } = req.body;

  const userDocExists = await ShiftSchema.findOne({ userOwnderId: userID });
  var userDocRef = userDocExists;
  if (userDocExists === null) {
    //create document
    const shift = new ShiftSchema({
      shifts: [],
      userOwnderId: userID,
    });
    const newShift = await shift.save();
    userDocRef = newShift;
  }

  //continue to add shifts
  userDocRef.shifts.push({ start: start, end: end });

  try {
    const insrted = await userDocRef.save();
    res.send(
      buildResponse(
        201,
        JSON.stringify({ msg: "New shift has been created :" + userDocRef })
      )
    );
  } catch (e) {
    res.status(500).json("There was an erorr trying to create the object " + e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteRes = await ShiftSchema.deleteOne({ _uid: req.body.id });
    if (deleteRes.n === 1) {
      res.status(200).json("Items was sucsessfuly deleted");
    } else {
      res.status(404).json("Couldn't find object to delete");
    }
  } catch (e) {
    res.sendStatus(500).json({
      type: "Internal Error",
      message: e,
    });
  }
});

//update name attribute
router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const query = { userOwnderId: _id, shifts: req.body };
  const search = await ShiftSchema.updateOne(query);

if(search){
  res.send(buildResponse(200,"Removed Sucssfuly"))
}else{
  res.send(buildResponse(400,"Item not found"))
}

  
});

module.exports = router;
