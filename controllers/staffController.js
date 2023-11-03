const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel");

//#desc Register a staff
//@route POST /api/staff/register
//@access public
const registerStaff = asyncHandler(async (req, res) => {
  const { staffNo, webmail, password } = req.body;
  if (!staffNo || !webmail || !password) {
    res.status(400);
    throw new Error("All fields are mendatory");
  }
  const staffAvailable = await Staff.findOne({ webmail });
  if (staffAvailable) {
    res.status(400);
    throw new Error("Staff already registered");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const staff = await Staff.create({
    staffNo,
    webmail,
    password: hashedPassword,
  });

  console.log(`Staff created: ${staff}`);
  if (staff) {
    res.status(201).json({ _id: staff.id, staffNo: staff.staffNo, webmail: staff.webmail });
  } else {
    res.status(404);
    throw new Error("Staff data is not valid");
  }
  res.json({ message: "Register the Staff!" });
});

//#desc Login a staff
//@route POST /api/staff/login
//@access public
const loginStaff = asyncHandler(async (req, res) => {
  const { webmail, password } = req.body;
  if (!webmail || !password) {
    res.status(400);
    throw new Error("All fields are mendatory");
  }
  const staff = await Staff.findOne({ webmail });
  //compare password with hashed password
  if (staff && (await bcrypt.compare(password, staff.password))) {
    const accessToken = jwt.sign(
      {
        staff: {
          staffNo: staff.staffNo,
          webmail: staff.webmail,
          id: staff.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Webmail or Password is not valid");
  }
});

//#desc Current a staff
//@route POST /api/staff/current
//@access private
const currentStaff = asyncHandler(async (req, res) => {
  // @ts-ignore
  res.send(req.staff);
});

module.exports = { registerStaff, loginStaff, currentStaff };
