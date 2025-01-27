"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database/database");
const routes_routes_1 = __importDefault(require("./routes/routes.routes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// const corsOptions = {
//   origin: `${process.env.APP_URL}`, // Your frontend URL
//   methods: 'GET,POST,PUT,DELETE', // Allowed methods
//   allowedHeaders: 'Content-Type,Authorization', // Allowed headers
// };
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
app.get("/", (request, response) => {
    response.status(200).json({ message: "This is EliteMail" });
});
app.use("/v1", routes_routes_1.default);
const PORT = process.env.PORT;
database_1.database.sync({ force: false }).then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
