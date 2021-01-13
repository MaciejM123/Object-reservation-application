const courtModel = require('../models/courtModel');

module.exports.courtsGet = async function (req, res) {
  try {
    const courts = await courtModel.find();
    let courtsFixed = JSON.parse(
      JSON.stringify(courts).split('"_id":').join('"id":'),
    );
    res.status(200).json(courtsFixed);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.courtsGetFront = async function (req, res) {
  try {
    const courts = await courtModel.find();
    res.status(200).json(courts);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports.courtsCreate = async function (req, res) {
  console.log(req.body.date);
  const isExist = courtModel.findOne(
    {
      ids: req.params.ids,
    },
    async function (err, court) {
      if (err) return res.status(404).json(err);
      else {
        const court = new courtModel({
          ids: req.body.ids,
          nameCourt: req.body.nameCourt,
          description: req.body.description,
          date: req.body.date,
          sessionTime: req.body.sessionTime,
        });
        try {
          const savedCourt = await court.save();
          res.status(201).json(savedCourt);
        } catch (err) {
          res.status(400).json(err);
        }
      }
    },
  );
};

module.exports.courtsDelete = async function (req, res) {
  try {
    const deletedCourt = await courtModel.deleteOne({
      _id: req.params.courtId,
    });
    res.status(200).json(deletedCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.courtsUpdate = async function (req, res) {
  try {
    const updatedCourt = await courtModel.updateOne(
      {
        _id: req.params.courtId,
      },
      {
        $set: {
          ids: req.body.id,
          nameCourt: req.body.nameCourt,
          description: req.body.description,
          date: req.body.date.map(date => {
            return {
              nameOfDay: date.nameOfDay,
              value: date.value,
            };
          }),
        },
      },
    );
    res.status(200).json(updatedCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
module.exports.getCourt = async function (req, res) {
  try {
    const getCourt = await courtModel.findById(req.params.courtId);
    res.status(200).json(getCourt);
  } catch (err) {
    res.status(404).json(err);
  }
};
