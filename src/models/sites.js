const R = require("ramda");
const convertActiveIntToBoole = R.evolve({ active: a => Boolean(a) });

module.exports = function(db) {
  return {
    getById: id => {
      // Could use the device model here but I think it would complicate the
      // matter more.
      return Promise.all([
        db.get("SELECT * FROM sites WHERE id = ?;", id),
        db
          .all("SELECT * FROM devices WHERE siteId = ?;", id)
          .then(R.map(convertActiveIntToBoole))
      ]).then(([site, devices = []]) =>
        // this is probably a good case for a maybe or optional to describe the
        // absence of data. In this case I'll pass the null through but I dont
        // like it.
        site
          ? {
              ...site,
              devices
            }
          : site
      );
    }
  };
};
