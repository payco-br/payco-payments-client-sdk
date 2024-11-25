import z from "zod";

import { cnpj, cpf } from "cpf-cnpj-validator";

export const CardBrand = {
	/** MasterCard */
	Mastercard: "mastercard",
	/** VasterCard */
	Visa: "visa",
	/** American Express */
	Amex: "amex",
	/** Hipercard */
	Hipercard: "hipercard",
	/** Elo */
	Elo: "elo",
} as const

export const cardDataSchema = z.object({
	/** Nome do titular */
	holderName: z.string().regex(/^[a-zA-Z\s]+$/).min(2),
	/** Documento do titular (CPF ou CNPJ) */
	holderDocument: z.string().refine(arg => cpf.isValid(arg) || cnpj.isValid(arg), "Invalid document, must be a valid CPF or CNPJ"),
	/** Número do cartão */
	number: z.string().regex(/^\d{16}$/, "Invalid card number, must be a valid credit card number").refine(arg => {
		const firstDigit = arg[0];
		return !arg.split("").every((digit: string) => digit === firstDigit);
	}, "Invalid card number, must be a valid credit card number"),
	/** Bandeira do cartão
	 * 
	 * Valores suportados:
	 * - Mastercard (`mastercard`)
	 * - Visa (`visa`)
	 * - American Express (`amex`)
	 * - Hipercard (`hipercard`)
	 * - Elo (`elo`)
	 */
	cardBrand: z.nativeEnum(CardBrand),
	/** Mês de expiração do cartão */
	expirationMonth: z.string().regex(/^(0[1-9]|1[0-2])$/),
	/** Ano de expiração do cartão */
	expirationYear: z.string().regex(/^\d{2}$/),
	/** Código de validação do cartão */
	cvv: z.string().regex(/^\d{3}$/),
});

export type CardData = z.infer<typeof cardDataSchema>;
