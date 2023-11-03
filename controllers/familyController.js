const asyncHandler = require("express-async-handler");
const Family = require("../models/familyModel");
//#desc Get all familys
//@route GET /api/family
//@access private
const getFamilys = asyncHandler(async (req, res) => {
  const familys = await Family.find({ staff_id: req.staff.id });
  res.status(200).json(familys);
});

//#desc Create New family
//@route POST /api/family
//@access private
const createFamily = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, relationship, work_detail } = req.body;
  if (!name || !relationship || !work_detail) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }
  const family = await Family.create({
    name,
    relationship,
    work_detail,
    staff_id: req.staff.id,
  });
  res.status(201).json(family);
});

//#desc Get family
//@route GET /api/family/:id
//@access private
const getFamily = asyncHandler(async (req, res) => {
  const family = await Family.findById(req.params.id);
  if (!family) {
    res.status(404);
    throw new Error("Family not found");
  }
  res.status(200).json(family);
});

//#desc Update family
//@route PUT /api/family/:id
//@access private
const updateFamily = asyncHandler(async (req, res) => {
  const family = await Family.findById(req.params.id);
  if (!family) {
    res.status(404);
    throw new Error("Family not found");
  }

  if (family.staff_id.toString() !== req.staff.id) {
    res.status(403);
    throw new Error("You don't have permission to update other family members");
  }

  const updatedFamily = await Family.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedFamily);
});

//#desc Delete family
//@route DELETE /api/family/:id
//@access private
const deleteFamily = asyncHandler(async (req, res) => {
  const family = await Family.findById(req.params.id);
  if (!family) {
    res.status(404);
    throw new Error("Family not found");
  }

  if (family.staff_id.toString() !== req.staff.id) {
    res.status(403);
    throw new Error("You don't have permission to delete other family members");
  }

  await family.deleteOne({ _id: req.params.id });
  res.status(200).json(family);
});

module.exports = {
  getFamilys,
  createFamily,
  getFamily,
  updateFamily,
  deleteFamily,
};
