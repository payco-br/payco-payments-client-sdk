import { ZodError } from "zod";
import { cardDataSchema } from "./card-data"

describe("cardDataSchema", () => {
  const validHolderDocument = "46290063898";
  const validCardNumber = "2306500224865945";

  test("properly validates card data", () => {
    const source = {
      cardBrand: "mastercard",
      cvv: "000",
      expirationMonth: "10",
      expirationYear: "29",
      holderDocument: validHolderDocument,
      holderName: "CARD HOLDER",
      number: validCardNumber,
    };

    const result = cardDataSchema.parse(source)

    expect(result).toStrictEqual(source)
  })

  test("should fail if card number is invalid", () => {
    const source = {
      cardBrand: "mastercard",
      cvv: "000",
      expirationMonth: "10",
      expirationYear: "29",
      holderDocument: validHolderDocument,
      holderName: "CARD HOLDER",
      number: "0000000a00000000",
    };

    expect(() => {
      cardDataSchema.parse(source)
    }).toThrow(new ZodError([
      {
        validation: "regex",
        code: "invalid_string",
        message: "Invalid card number, must be a valid credit card number",
        path: ["number"]
      }
    ]))
  })

  test("should fail if card number is all zeros", () => {
    const source = {
      cardBrand: "mastercard",
      cvv: "000",
      expirationMonth: "10",
      expirationYear: "29",
      holderDocument: validHolderDocument,
      holderName: "CARD HOLDER",
      number: "0000000000000000",
    };

    expect(() => {
      cardDataSchema.parse(source)
    }).toThrow(new ZodError([
      {
        code: "custom",
        message: "Invalid card number, must be a valid credit card number",
        path: ["number"]
      }
    ]))
  })

  test("should fail if card brand is invalid", () => {
    const source = {
      cardBrand: "test",
      cvv: "000",
      expirationMonth: "10",
      expirationYear: "29",
      holderDocument: validHolderDocument,
      holderName: "CARD HOLDER",
      number: validCardNumber,
    };

    expect(() => {
      cardDataSchema.parse(source)
    }).toThrow(new ZodError([
      {
        received: "test",
        code: "invalid_enum_value",
        options: [
          "mastercard",
          "visa",
          "amex",
          "hipercard",
          "elo"
        ],
        path: ["cardBrand"],
        message: "Invalid enum value. Expected 'mastercard' | 'visa' | 'amex' | 'hipercard' | 'elo', received 'test'"
      }
    ]))
  })

  test("should fail if card holder document is invalid", () => {
    const source = {
      cardBrand: "mastercard",
      cvv: "000",
      expirationMonth: "10",
      expirationYear: "29",
      holderDocument: "12345678900",
      holderName: "CARD HOLDER",
      number: validCardNumber,
    };

    expect(() => {
      cardDataSchema.parse(source)
    }).toThrow(new ZodError([
      {
        code: "custom",
        message: "Invalid document, must be a valid CPF or CNPJ",
        path: ["holderDocument"]
      }
    ]))
  })
})