const { getIO } = require('../socket');

const emitUpdate = (event, data) => {
    const io = getIO();
    io.emit(event, data);
};

module.exports = { emitUpdate };
