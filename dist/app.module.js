"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config/config.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const products_module_1 = require("./products/products.module");
const cart_module_1 = require("./cart/cart.module");
const customer_module_1 = require("./roles/customer/customer.module");
const storekeeper_module_1 = require("./roles/storekeeper/storekeeper.module");
const delivery_module_1 = require("./roles/delivery/delivery.module");
const s3_module_1 = require("./s3/s3.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            common_module_1.CommonModule,
            products_module_1.ProductsModule,
            cart_module_1.CartModule,
            customer_module_1.CustomerModule,
            storekeeper_module_1.StorekeeperModule,
            delivery_module_1.DeliveryModule,
            s3_module_1.S3Module,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map