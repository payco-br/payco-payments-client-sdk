import z from "zod";
export declare const CardBrand: {
    /** MasterCard */
    readonly Mastercard: "mastercard";
    /** VasterCard */
    readonly Visa: "visa";
    /** American Express */
    readonly Amex: "amex";
    /** Hipercard */
    readonly Hipercard: "hipercard";
    /** Elo */
    readonly Elo: "elo";
};
export declare const cardDataSchema: z.ZodObject<{
    /** Nome do titular */
    holderName: z.ZodString;
    /** Documento do titular (CPF ou CNPJ) */
    holderDocument: z.ZodEffects<z.ZodString, string, string>;
    /** Número do cartão */
    number: z.ZodEffects<z.ZodString, string, string>;
    /** Bandeira do cartão
     *
     * Valores suportados:
     * - Mastercard (`mastercard`)
     * - Visa (`visa`)
     * - American Express (`amex`)
     * - Hipercard (`hipercard`)
     * - Elo (`elo`)
     */
    cardBrand: z.ZodNativeEnum<{
        /** MasterCard */
        readonly Mastercard: "mastercard";
        /** VasterCard */
        readonly Visa: "visa";
        /** American Express */
        readonly Amex: "amex";
        /** Hipercard */
        readonly Hipercard: "hipercard";
        /** Elo */
        readonly Elo: "elo";
    }>;
    /** Mês de expiração do cartão */
    expirationMonth: z.ZodString;
    /** Ano de expiração do cartão */
    expirationYear: z.ZodString;
    /** Código de validação do cartão */
    cvv: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: string;
    holderName: string;
    holderDocument: string;
    cardBrand: "mastercard" | "visa" | "amex" | "hipercard" | "elo";
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}, {
    number: string;
    holderName: string;
    holderDocument: string;
    cardBrand: "mastercard" | "visa" | "amex" | "hipercard" | "elo";
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}>;
export type CardData = z.infer<typeof cardDataSchema>;
