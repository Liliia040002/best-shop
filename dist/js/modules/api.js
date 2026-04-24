// import { Product } from './types.js';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('/src/assets/data.json');
        if (!response.ok) {
            throw new Error('Products loading error');
        }
        const data = (yield response.json());
        if (Array.isArray(data)) {
            return data;
        }
        if (Array.isArray(data.products)) {
            return data.products;
        }
        if (Array.isArray(data.items)) {
            return data.items;
        }
        if (Array.isArray(data.data)) {
            return data.data;
        }
        console.log(data);
        throw new Error('Products array not found in data.json');
    });
}
