const router = require('express').Router(); 
const{User} = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
  // Access our User model and run .findAll() method)
  User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get /apis/users/1
router.get('/:id', (req, res) => {
  const {id} = req.params
  User.findAll({
    where:{id}
  })
  .then(data => {
    if(!data){
      res.status(404).json({message:`No user found with this id`})
      return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Post api users
router.post('/', (req, res) => {
  const {username, email, password} = req.body;
  User.create({username, email, password})
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

//Put api users
router.get('/:id', (req, res) => {
  const {id} = req.params
  User.update(req.body, {
    where: id
  })
  .then(date => {
    if(!data[0]){
      res.status(404).json({message: `No user found with this id`})
      return;
    }
    res.json(data)
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

//Delete api user
router.delete('/:id,', (req, res) => {
  const {id} = req.params;
  User.destroy({where:{id}})
  .then(data => {
    if(!data){
      res.status(404).json({message: ` No user found with this id`})
      return;
    }
    res.json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;