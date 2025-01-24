"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const users_model_1 = __importStar(require("../models/users.model"));
const verifyToken_1 = require("../utils/tokens/verifyToken");
const userAuth = async (request, response, next) => {
    try {
        const authorization = request.headers.authorization;
        if (authorization === undefined) {
            response.status(401).json({
                status: `error`,
                message: `You are not authorized to view this page`,
                errorMessage: `Token not found`,
            });
            return;
        }
        const token = authorization.split(" ");
        const mainToken = token[1];
        if (!mainToken || mainToken === "") {
            response.status(401).json({
                status: `error`,
                message: `Login required`,
                errorMessage: `Token not found`,
            });
            return;
        }
        const decode = (0, verifyToken_1.verifyToken)(mainToken);
        const user = await users_model_1.default.findOne({ where: { id: decode.id, role: users_model_1.role.USER } });
        if (!user) {
            response.status(401).json({
                status: `error`,
                message: `Please check login credentials again`,
                errorMessage: `User not found`,
            });
            return;
        }
        request.user = decode;
        next();
    }
    catch (error) {
        response.status(401).json({
            status: "error",
            message: "Invalid or expired token",
            errorMessage: error.message,
        });
        return;
    }
};
exports.userAuth = userAuth;
