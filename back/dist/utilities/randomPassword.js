"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPassword = randomPassword;
function randomPassword() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}
//# sourceMappingURL=randomPassword.js.map