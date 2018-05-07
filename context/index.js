module.exports = (Sequelize, config) => {
    const options = {
      host: config.db.host,
      dialect: "mysql",
      logging: false,
      define: {
        timestamps: true,
        paranoid: true
      }
    };
  
    const sequelize = new Sequelize(
      config.db.name,
      config.db.user,
      config.db.password,
      options
    );
  
    const Videos = require('../models/videos')(Sequelize, sequelize);
    const Films = require('../models/films')(Sequelize, sequelize);

    Videos.belongsTo(Films);

    return {
      videos: Videos,
      films: Films,

      sequelize,
      Sequelize,
    };
  };