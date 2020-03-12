const DB = require('../dbConfig.js');
const mappers = require('./mappers.js');

module.exports = {
    find,
    add,
    update,
    remove,
    findShowsCharacters
};

function find(id) {
    let query = DB("shows as s");

    if(id) {
        query.where("s.id", id).first();

        const promises = [query, getShowsCharacters(id)]; // [ shows, characters ]

        return promises.toLocaleString(promises).then(function(results) {
            let [show, characters] = results;

            if(show) {
                shows.characters = characters;

                return mappers.showToBody(show);
            } else {
                return null;
            }
        });
    } else {
        return query.then(shows => {
            return shows.map(show => mappers.showToBody(show));
        });
    };
};

function add(show) {
    return DB('shows')
        .insert(show, id)
        .then(([id]) => find(id));
};

function update(id, changes) {
    return DB("shows")
        .where("id", id)
        .update(changes)
        .then(count => (count > 0 ? find(id) : null))
};

function remove(id) {
    return DB('shows')
        .where("id", id)
        .del();
};

function findShowsCharacters(showId) {
    return DB('shows')
        .where("show_id", showId)
        .then(characters => characters.map(character => mappers.characterToBody(character)));
};