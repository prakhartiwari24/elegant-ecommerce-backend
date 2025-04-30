"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
const database_1 = __importDefault(require("./config/database"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.server = this.app.listen(5002, () => {
            logger_1.default.info(`Server running on port 5002 🚀`);
        });
        database_1.default.sync().then(() => {
            logger_1.default.info(`Database synchronized`);
        });
    }
    start() {
        logger_1.default.info("App started");
    }
}
exports.application = new App();
exports.application.start();
//# sourceMappingURL=app.js.map