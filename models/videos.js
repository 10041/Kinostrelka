module.exports = (Sequelize, sequelize) => {
    return sequelize.define("videos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      name_original: Sequelize.STRING,
      genre: Sequelize.TEXT,
      country: Sequelize.STRING,
      age_limit: Sequelize.TINYINT,
      trailer_link: Sequelize.TEXT,
      preview_path: Sequelize.STRING,
      preview_text: Sequelize.STRING,
      plot: Sequelize.TEXT,
      release_date: Sequelize.DATE,
      release_bel: Sequelize.DATE,
      release_rus: Sequelize.DATE,
      in_roles: Sequelize.TEXT,
      director: Sequelize.STRING,
      film_script: Sequelize.STRING,
      music: Sequelize.STRING,
      operator: Sequelize.STRING,
      producer: Sequelize.STRING,
      company: Sequelize.STRING,
    });
  };