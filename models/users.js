module.exports = (Sequelize, sequelize) => {
    return sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      login: Sequelize.STRING,
      mame: Sequelize.STRING,
      //avatar: Sequelize
      
    });
  };