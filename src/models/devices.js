const R = require("ramda");
const convertActiveIntToBoole = R.evolve({ active: a => Boolean(a) });
module.exports = function(db) {
  return {
    getAll: () => {
      return db
        .all("SELECT * FROM devices;")
        .then(R.map(convertActiveIntToBoole));
    },
    getAllByActivityStatus: isActive => {
      return db.get(
        "SELECT * FROM devices WHERE activity = ?;",
        Number(isActive)
      );
    },
    getById: id => {
      return db
        .get("SELECT * FROM devices WHERE id = ?;", id)
        .then(convertActiveIntToBoole);
    },
    create: ({ siteId, name, active }) => {
      return db
        .run("INSERT INTO devices (siteId, name, active) VALUES (?, ?, ?)", [
          siteId,
          name,
          Number(active)
        ])
        .then(insertResult =>
          db.get("SELECT * FROM devices WHERE id = ?", insertResult.stmt.lastID)
        )
        .then(convertActiveIntToBoole);
    }
  };
};
