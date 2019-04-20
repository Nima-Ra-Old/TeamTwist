function sendPicture(app) {
<<<<<<< HEAD
  app.get('/profile_photos', (req, res, next) => {
    let picture = req.query.profilePic ? `documents/profile-images/${req.query.profilePic}.jpg` : `documents/team-images/${req.query.teamPic}.jpg`;
=======
  app.get('/api/photos', (req, res, next) => {
    let picture = req.query.profilePic ? `documents/profile-images/${req.query.profilePic}.png` : `documents/team-images/${req.query.teamPic}.png`;
>>>>>>> user-panel
    res.sendFile(picture, {root: './'});
  });
}

module.exports = {
  sendPicture: function(app){
  	return sendPicture(app);
  }
}
