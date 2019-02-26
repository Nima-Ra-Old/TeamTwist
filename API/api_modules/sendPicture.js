function sendPicture(app) {
  app.get('/api/photos', (req, res, next) => {
    let picture = req.query.profilePic ? `documents/profile-images/${req.query.profilePic}.png` : `documents/team-images/${req.query.teamPic}.png`;
    res.sendFile(picture, {root: './'});
  });
}

module.exports = {
  sendPicture: function(app){
  	return sendPicture(app);
  }
}
