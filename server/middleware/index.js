const Card = require('../models/card');

function userCreatedCard(req, res, next) {
  const { id } = req.params;
  console.log(req.user._id);

  Card.findOne({_id: id}, (err, foundCard) => {
    if (err) {
      return res.json({error: err});
    }
    if (!foundCard) {
      return res.json({error: "Did not find card in database!"});
    }

    console.log(foundCard.contributor);
    if (foundCard.contributor.id.equals(req.user._id)) {
      return next();
    } else {
      return res.json({error: "You do not have permission to do this."});
    }
  });
}

module.exports = {
  userCreatedCard: userCreatedCard
}