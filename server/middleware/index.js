const Card = require('../models/card');

async function userCreatedCard(req, res, next) {
  const { id } = req.params;
  console.log(req.user._id);

  let foundCard, error;

  try {
    foundCard = await Card.findOne({_id: id});
  } catch (err) {
    return res.json({ error: err });
  }

  if (!foundCard) {
    return res.json({error: "Did not find card in database!"});
  }

  const hasContributor = !!foundCard.contributor.id;

  // Normally we want the card to only be editable by the user who created it
    // Turn back on if needed
    if (true/*!hasContributor || foundCard.contributor.id.equals(req.user._id)*/) {
      return next();
    } else {
      return res.json({error: "You do not have permission to do this."});
    }
}

module.exports = {
  userCreatedCard: userCreatedCard
}