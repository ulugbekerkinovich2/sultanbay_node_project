const config = require ("../../config/index.js");
const {connect} = require("mongoose");

const run = async (app) => {
    const mongoUri = config.mongoUri;

    await connect(mongoUri);
    
    const port = config.port;
    app.listen(port, () => {
        console.log(`Server running on port:${port}`);
    });
};

module.exports = run;