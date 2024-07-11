const zod = require('zod');

const createTodo = zod.object({
    title: zod.string().min(1).max(100),
    description: zod.string().min(1).max(200)
})

const updateTodo = zod.object({
    id: zod.string()
})

module.exports = {
    createTodo,
    updateTodo  // Exporting the validation schemas for create and update operations respectively.  // This can be used in the routes where we receive the data from the client.  // For example, in the PUT request to /edit/:id, the client will send a JSON object containing the updated todo's id.  // We validate this id using the updateTodo schema before updating the todo.
}