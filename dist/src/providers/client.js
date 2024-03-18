Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
var axios_1 = require("axios");
function createClient(_a) {
	var baseURL = _a.baseURL;
	return axios_1.default.create({
		baseURL: baseURL,
	});
}
exports.createClient = createClient;
//# sourceMappingURL=client.js.map
