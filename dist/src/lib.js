var __awaiter =
	(this && this.__awaiter) ||
	((thisArg, _arguments, P, generator) => {
		function adopt(value) {
			return value instanceof P
				? value
				: new P((resolve) => {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))((resolve, reject) => {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	});
var __generator =
	(this && this.__generator) ||
	((thisArg, body) => {
		var _ = {
				label: 0,
				sent: () => {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return (v) => step([n, v]);
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while ((g && ((g = 0), op[0] && (_ = 0)), _))
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									  : y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	});
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo =
	exports.tokenize =
	exports.initialize =
	exports.sessionId =
	exports.keyId =
	exports.client =
		void 0;
var v = require("valibot");
var get_public_key_1 = require("./functions/get-public-key");
var client_1 = require("./providers/client");
var encrypt_card_data_1 = require("./functions/encrypt-card-data");
var card_data_1 = require("./schemas/card-data");
var tokenize_card_data_1 = require("./functions/tokenize-card-data");
var get_device_info_1 = require("./functions/get-device-info");
var install_scripts_1 = require("./functions/install-scripts");
var initialize = (input) =>
	__awaiter(void 0, void 0, void 0, function () {
		var baseURL;
		var _a;
		return __generator(this, (_b) => {
			if (!input.keyId) throw new Error("keyId is required");
			baseURL = input.baseURL || "https://api.payments.payco.com.br/open";
			exports.client = (0, client_1.createClient)({ baseURL: baseURL });
			exports.keyId = input.keyId;
			if ((_a = input.installScripts) !== null && _a !== void 0 ? _a : true) {
				exports.sessionId = (0, install_scripts_1.installScripts)({
					orgId: input.orgId || "k8vif92e",
					sessionId: input.sessionId,
				});
			} else {
				if (!input.sessionId)
					throw new Error("sessionId is required when installScripts is false");
				exports.sessionId = input.sessionId;
			}
			return [2 /*return*/];
		});
	});
exports.initialize = initialize;
var tokenize = (_a) => {
	var cardData = _a.cardData,
		_b = _a.verifyCard,
		verifyCard = _b === void 0 ? false : _b;
	return __awaiter(void 0, void 0, void 0, function () {
		var cardDataParsed, publicKey, encryptedCard;
		return __generator(this, (_c) => {
			switch (_c.label) {
				case 0:
					cardDataParsed = v.parse(card_data_1.cardDataSchema, cardData);
					return [
						4 /*yield*/,
						(0, get_public_key_1.getPublicKey)({
							client: exports.client,
							keyId: exports.keyId,
						}),
					];
				case 1:
					publicKey = _c.sent().publicKey;
					return [
						4 /*yield*/,
						(0, encrypt_card_data_1.encryptCardData)({
							card: cardDataParsed,
							publicKey: publicKey,
							keyId: exports.keyId,
							verifyCard: verifyCard,
						}),
					];
				case 2:
					encryptedCard = _c.sent().encryptedCard;
					return [
						4 /*yield*/,
						(0, tokenize_card_data_1.tokenizeCardData)({
							encryptedCard: encryptedCard,
							client: exports.client,
						}),
					];
				case 3:
					return [2 /*return*/, _c.sent()];
			}
		});
	});
};
exports.tokenize = tokenize;
var getDeviceInfo = () => (0, get_device_info_1.getDeviceInfo)();
exports.getDeviceInfo = getDeviceInfo;
//# sourceMappingURL=lib.js.map
