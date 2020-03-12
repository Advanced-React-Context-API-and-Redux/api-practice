module.exports = {
    intToBoolean,
    booleanToInt,
    showToBody,
    characterToBody
};

function intToBoolean(int) {
    return int === 1 ? true: false;
};

function booleanToInt(bool) {
    return bool === true ? 1 : 0;
};

function showToBody(show){
    const result = {
        ...show,
        completed: intToBoolean(show.watched)
    };

    if(show.characters) {
        result.chracters = show.characters.map(character => ({
            ...chracter,
            like: intToBoolean(character.like)
        }));
    };

    return result;
};

function characterToBody(character) {
    return {
        ...character,
        like: intToBoolean(character.like)
    };
};