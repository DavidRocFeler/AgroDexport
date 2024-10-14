"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplyChainModule = void 0;
const common_1 = require("@nestjs/common");
const supply_chain_controller_1 = require("./supply-chain.controller");
const supply_chain_service_1 = require("./supply-chain.service");
let SupplyChainModule = class SupplyChainModule {
};
exports.SupplyChainModule = SupplyChainModule;
exports.SupplyChainModule = SupplyChainModule = __decorate([
    (0, common_1.Module)({
        controllers: [supply_chain_controller_1.SupplyChainController],
        providers: [supply_chain_service_1.SupplyChainService]
    })
], SupplyChainModule);
//# sourceMappingURL=supply-chain.module.js.map