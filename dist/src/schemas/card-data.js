Object.defineProperty(exports, "__esModule", { value: true });
exports.cardDataSchema = exports.CardBrand = void 0;
var v = require("valibot");
var cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
var CardBrand;
((CardBrand) => {
	CardBrand["Mastercard"] = "mastercard";
	CardBrand["Visa"] = "visa";
	CardBrand["Amex"] = "amex";
	CardBrand["Hipercard"] = "hipercard";
	CardBrand["Elo"] = "elo";
})(CardBrand || (exports.CardBrand = CardBrand = {}));
exports.cardDataSchema = v.object({
	holderName: v.string([v.regex(/^[a-zA-Z\s]+$/), v.minLength(2)]),
	holderDocument: v.string([
		v.custom((value) => {
			if (
				cpf_cnpj_validator_1.cpf.isValid(value) ||
				cpf_cnpj_validator_1.cnpj.isValid(value)
			)
				return true;
			return false;
		}, "invalid document, must be a valid CPF or CNPJ"),
	]),
	number: v.string([
		v.regex(/^\d{16}$/),
		v.custom((value) => {
			var firstDigit = value[0];
			return !value.split("").every((digit) => digit === firstDigit);
		}, "invalid card number, must be a valid credit card number"),
	]),
	cardBrand: v.enum_(CardBrand),
	expirationMonth: v.string([v.regex(/^(0[1-9]|1[0-2])$/)]),
	expirationYear: v.string([v.regex(/^\d{2}$/)]),
	cvv: v.string([v.regex(/^\d{3}$/)]),
});
//# sourceMappingURL=card-data.js.map
