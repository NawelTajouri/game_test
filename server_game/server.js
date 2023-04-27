// Import necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
app.use(bodyParser.json());


// Initialize Sequelize ORM with MySQL database
const sequelize = new Sequelize('test_games', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    define: {
        timestamps: false
       },
  });

  // test the connection to the database
sequelize
.authenticate()
.then(() => console.log("Database connection has been established successfully."))
.catch((err) => console.error("Unable to connect to the database:", err));


// Define Game model for Sequelize
const Game = sequelize.define('game', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    game: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    playTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    platforms: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  Game.removeAttribute('createdAt');
  Game.removeAttribute('updatedAt');
// Sync the model with the database
sequelize.sync();


// define the API routes
// CRUD operations
//GET ALL GAMES
app.get("/games", async (req, res) => {
    try {
      const games = await Game.findAll();
      res.json(games);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

//GET GAME BY ID
  app.get("/games/:id", async (req, res) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        res.json(game);
      } else {
        res.status(404).send("Game not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
 
//POST A GAME
app.post("/games", async (req, res) => {
    try {
      const game = await Game.create(req.body);
      res.json(game);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

app.listen(8081, () => {console.log("Listening!");
})

//UPDATE GAME BY ID
app.put("/games/:id", async (req, res) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        game.update(req.body);
        res.json(game);
      } else {
        res.status(404).send("Game not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  
//DELETE GAME BY ID

app.delete("/games/:id", async (req, res) => {
    try {
      const game = await Game.findByPk(req.params.id);
      if (game) {
        game.destroy();
        res.status(204).send();
      } else {   res.status(404).send("Game not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Custom endpoint to select top games by unique playTime
app.get('/select_top_by_playtime', async (req, res) => {
    try {
      const options = {};
      if (req.query.genre) {
        options.genre = req.query.genre;
      }
      if (req.query.platform) {
        options.platforms = {
          [Sequelize.Op.contains]: [req.query.platform],
        };
      }
      const games = await Game.findAll({
        where: options,
        order: [['playTime', 'DESC']],
      });
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });



  // Custom endpoint to select top games by unique players
  app.get('/select_top_by_players', async (req, res) => {
    try {
      const options = {};
      if (req.query.genre) {
        options.genre = req.query.genre;
      }
      if (req.query.platform) {
        options.platforms = {
          [Sequelize.Op.contains]: [req.query.platform],
        };
      }
      const games = await Game.findAll({
        where: options,
        count: true,
        col: 'userId',
        group: 'game'
      });
      res.json(games);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  
  





