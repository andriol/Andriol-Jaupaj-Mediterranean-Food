var db = require("../database");
module.exports = {
  storeImage: function (inputValues, callback) {
    var sql = "SELECT * FROM recipes WHERE image=?";
    db.query(sql, inputValues.image, function (err, data, fields) {
      console.log(inputValues);
      if (err) throw err;
      if (data.length > 1) {
        var msg = inputValues.image + " is already exist";
      } else {
        var sql = "INSERT INTO recipes SET ?";
        db.query(sql, inputValues, function (err, data) {
          if (err) throw err;
        });
        var msg = inputValues.image + "is uploaded successfully";
      }
      return callback(msg);
    });
  },

  displayImage: function (callback) {
    // check unique email address
    var sql = "SELECT image FROM recipes";
    db.query(sql, function (err, data, fields) {
      //console.log(data[0].image);
      if (err) throw err;
      return callback(data);
    });
  },
};
