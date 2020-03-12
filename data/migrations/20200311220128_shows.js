
exports.up = function(knex) {
    return knex.schema.createTable('shows', function(show){
        show.increments();
        
        show.string('name', 128).notNullable();
        show.text('description').notNullable();
        show.boolean('watched').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('shows');
};
