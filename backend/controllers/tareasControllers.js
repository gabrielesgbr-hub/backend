const getTareas = (req, res) => {
    res.status(200).json({"mensaje":"getTareas"}) 
}

const createTareas = (req, res) => {
    res.status(201).json({"mensaje":"createTareas"}) 
}

const updateTareas = (req, res) => {
    res.status(200).json({"mensaje":`Tarea modificada ${req.params.id}`}) 
}

const deleteTareas = (req, res) => {
    res.status(200).json({"mensaje":`Tarea borrada ${req.params.id}`}) 
}

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}