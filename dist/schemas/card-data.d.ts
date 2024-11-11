import * as v from "valibot";
export declare enum CardBrand {
    Mastercard = "mastercard",
    Visa = "visa",
    Amex = "amex",
    Hipercard = "hipercard",
    Elo = "elo"
}
export declare const cardDataSchema: v.ObjectSchema<{
    /** Nome do titular */
    holderName: v.StringSchema<string>;
    /** Documento do titular (CPF ou CNPJ) */
    holderDocument: v.StringSchema<string>;
    /** Número do cartão */
    number: v.StringSchema<string>;
    /** Bandeira do cartão
     *
     * Bandeiras aceitas: MasterCard, Visa, Amex, Hipercard, Elo
     */
    cardBrand: v.EnumSchema<typeof CardBrand, CardBrand>;
    /** Mês de expiração do cartão */
    expirationMonth: v.StringSchema<string>;
    /** Ano de expiração do cartão */
    expirationYear: v.StringSchema<string>;
    /** Código de validação do cartão */
    cvv: v.StringSchema<string>;
}, undefined, {
    number: string;
    holderName: string;
    holderDocument: string;
    cardBrand: CardBrand;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}>;
export type CardData = v.Input<typeof cardDataSchema>;
