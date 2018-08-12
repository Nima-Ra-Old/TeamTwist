function sendPicture(app) {
  app.get('/profile_photos', (req, res, next) => {
    let profilePic = req.query.profilePic;
    res.sendFile(`users/profile-images/${profilePic}.jpg`, {root: './'});
  });
}

module.exports = {
  sendPicture: function(app){
  	return sendPicture(app);
  }
}
