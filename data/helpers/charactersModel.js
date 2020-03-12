const DB = require('../dbConfig.js');
const mappers = require('./mappers.js');

module.exports = {
    getAll,
    get,
    insert,
    update,
    remove,
};

function getAll(id) {
    let query = DB("characters as c");

    if(id) {
        query.where("c.id", id).first();

        const promises = [query]; // [ characters ]

        return Promise.all(promises)
            .then(function(results) {
                let [ characters] = results;

            if(characters) {

                return mappers.characterToBody(characters);
            } else {
                return null;
            }
            })
            .catch(() => {
                res.status(500).json({ message: "There's a problem with the promises in charactersModel.js"})
            });
    } else {
        return query.then(characters => {
            return characters.map(character => mappers.characterToBody(character));
        });
    };
}

function get(id) {
    let query = DB("characters as c");

    if(id) {
        return query
            .where("c.id", id)
            .first()
            .then( character => {
                if(character) {
                    return mappers.characterToBody(character);
                } else {
                    return null;
                }
            });
    } else {
        return query.then(characters => {
            return characters.map(character => mappers.characterToBody(character));
        });
    }
}
        
function insert(character) {
    return DB('characters')
        .insert(character)
        .then(([id]) => this.get(id));
};

function update(id, changes) {
    return DB("characters")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? get(id) : null))
};

function remove(id) {
    return DB('characters')
        .where("id", id)
        .del();
};