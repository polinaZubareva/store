"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const PORT = process.env.PORT || 5000;
const application = (0, express_1.default)();
application.use((0, cors_1.default)());
application.use(express_1.default.json());
application.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
application.use('/', routes_1.default);
function startApplication() {
    try {
        db_1.db.authenticate().then(() => {
            console.log('Connection enabled');
        });
        db_1.db.sync();
        application.listen(PORT, () => {
            console.log(`Application started on PORT ${PORT}`);
        });
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
}
startApplication();
