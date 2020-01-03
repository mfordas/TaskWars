const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../models/character');
const { getStatsOnLevelUp } = require('../db/utils/getStatsOnLevelUp')
const { gameOver } = require('../db/utils/gameOver');

//Creating new character [working]
router.post('/', async (req, res) => {
  const Character = res.locals.models.character;

  const { error } = validateCharacter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let character = new Character(req.body);
  await character.save();
  res.send(character);
});

router.get('/', async (req, res) => {
  const Character = res.locals.models.character;
  const character = await Character.find().sort('name');
  res.send(character);
});

//Searching character by ID [working]
router.get('/:id', async (req, res) => {
  const Character = res.locals.models.character;

  const character = await Character.findById(req.params.id);
  if (!character) res.status(404).send(`Character with id ${req.params.id} not found`);
  res.send(character);
});

//Level update [working]
router.put('/:id/level', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      const stats = getStatsOnLevelUp(result, req.body.level);
      // console.log(stats);
      Character.findByIdAndUpdate(
        req.params.id,
        {
          maxHealth: stats[0],
          expRequired: stats[1],
          physical_power: stats[2],
          magical_power: stats[3],
          level: req.body.level,
        },
        { new: true },
      ).then(
        r => {
          res.send('Level updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});



router.put('/:id/maxHealth', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          maxHealth: req.body.maxHealth,
        },
        { new: true },
      ).then(
        r => {
          res.send('MaxHealth updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});
//[working]
router.put('/:id/health', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      if( req.body.health > 0 ) {
        Character.findByIdAndUpdate(
          req.params.id,
          {
            health: req.body.health,
          },
          { new: true },
        ).then(
          r => {
            res.send('Health updated!');
          },
          err => {
            res.status(403).send('Bad request!');
          },
        );
      } else {
        gameOver(Character, result);
      }
  
    }
  });
});

//[working]
router.put('/:id/exp_points', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          exp_points: req.body.exp_points,
        },
        { new: true },
      ).then(
        async r => {
          // console.log(r);
          if(r.exp_points >= r.expRequired){
            let stats = [0, 0, 0, 0];
            let nextLevel = r.level;
            let reqExp = r.expRequired;
            while(r.exp_points > reqExp) {
              nextLevel++;
              stats = getStatsOnLevelUp(result, nextLevel);
              reqExp = stats[1];
            }

            await Character.findByIdAndUpdate(
              req.params.id,
              {
                level: nextLevel,
                health: stats[0],
                maxHealth: stats[0],
                expRequired: stats[1],
                physical_power: stats[2],
                magical_power: stats[3],
              }
            )
          }
          res.send('Experience points updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});


//[working]
router.put('/:id/physical_power', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          physical_power: req.body.physical_power,
        },
        { new: true },
      ).then(
        r => {
          res.send('Physical power updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

//[working]
router.put('/:id/magical_power', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      Character.findByIdAndUpdate(
        req.params.id,
        {
          magical_power: req.body.magical_power,
        },
        { new: true },
      ).then(
        r => {
          res.send('Magical power updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

router.put('/:id/avatar', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else {
      // console.log(result);
      Character.findByIdAndUpdate(req.params.id, {
        avatar: req.body.avatar
      }, { new: true }).then(
        r => {
          res.send(`Avatar updated for: ${r.name}:\n${r}`);
        },
        err => {
          console.log(err.errmsg);
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});


async function getCharacters(Character, id) {
  if (id) {
    return await Character.find({ _id: id }).then(
      result => {
        return result[0];
      },
      err => console.log('Error', err),
    );
  } else {
    return await Character.find().then(
      result => {
        return result;
      },
      err => console.log('Error', err),
    );
  }
}

module.exports = router;
