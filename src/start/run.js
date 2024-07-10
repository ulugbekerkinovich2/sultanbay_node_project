const config = require("../../config/index.js");
const { connect } = require("mongoose");

const run = async (app) => {
    try {
        const mongoUri = config.mongoUri;

        await connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');

        const port = config.port;
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = run;
