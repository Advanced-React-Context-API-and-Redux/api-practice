const router = require('express').Router();

// import model
const charactersDB = require('../helpers/charactersModel.js');

// GET all the characters
// router.get('/', (req, res) => {
    
//     charactersDB.getAll()
//         .then(() => {
//             res.status(200).json(res.data)
//         })
//         .catch(() => {
//             res.status(500).json({ errorMessage: 'There was an error retrieving the character!'})
//         })
// })

// GET characters by :id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    charactersDB.get(id)
        .then(character => {
            res.status(200).json(character)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error retrieving the character!'})
        })
})

// POST character
router.post('/', (req, res) => {
    const newChar = req.body;
    
    charactersDB.insert(newChar)
        .then(newChar => {
            res.status(201).json(newChar)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'There was an error adding the action!'})
        })
})

// PUT character
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updateAction = req.body;
    
    charactersDB.update(id, updateAction)
        .then(updateAction => {
            res.status(201).json(updateAction)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error updating the action!'})
        })
})

// DELETE character
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    charactersDB.remove(id)
        .then(deleteAction => {
            res.status(201).json(deleteAction)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error deleting the action!'})
        })
})

// export
module.exports = router;