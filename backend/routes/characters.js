const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../models/character');

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
      console.log(stats);
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

const getStatsOnLevelUp = (character, level) => {
  let baseHP = 30;
  for(let i=1; i<level; i++) {
    baseHP += 10 + (i+1)*2;
  }
  // let actualHP = character.maxHealth;
  // for(let i=1; i<level; i++) {
  //   actualHP += 10 + (i+1)*2;
  // }

  let baseExp = 0;
  for(let i=1; i<level+1; i++) {
    baseExp += i*100 ;
  }

  //fix
  let basePP = 1;
  for(let i=1; i<level; i++) {
    basePP += 2+(i+1) ;
  }
  let baseMP = basePP;
  if(character.charClass === 'Warrior') {
      // actualHP += (level-1)*5;
      baseHP += (level)*5;
      basePP += (level)*5;
  }
  if(character.charClass === 'Hunter') {
    basePP += (level)*10;
  }
  if(character.charClass === 'Mage') {
    baseMP += (level)*10;
  }
  if(character.charClass === 'Druid') {
    // actualHP += (level-1)*5;
    baseHP += (level)*5;
    baseMP += (level)*5;
  }

  // let gainHP = actualHP - baseHP;
  // console.log(gainHP);
  let newHP = level > character.level ? baseHP : character.maxHealth

  return [newHP, baseExp, basePP, baseMP]
}

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
        r => {
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
