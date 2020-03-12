// imports express and creates the router (chaining them together)
const router = require('express').Router();

// import model
const showsDB = require('../helpers/showsModel.js');

const cors = require('cors')

// GET shows
router.get('/', cors(), (req, res) => {
    showsDB.get()
        .then(shows => {
            res.status(200).json(shows)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error retrieving the shows!'})
        })
})

// GET shows' characters
router.get('/:id/characters', (req, res) => {
    const {id} = req.params;
    
    showsDB.getShowsCharacters(id)
        .then(characters => {
            res.status(200).json(characters)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error retrieving the characters for that show!'})
        })
})

// POST
router.post('/', (req, res) => {
    // const newShow = req.body;
    
    showsDB.insert(req.body)
        .then(() => {
            res.status(201).json(req.body)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error adding the new show!'})
        })
})

// PUT
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updateShow = req.body;
    
    showsDB.update(id, updateShow)
        .then(updateShow => {
            res.status(200).json(updateShow)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error updating the show!'})
        })
})

// DELETE
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    showsDB.remove(id)
        .then(deleteShow => {
            res.status(200).json(deleteShow)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'There was an error deleting the show!'})
        })
})

// export
module.exports = router;