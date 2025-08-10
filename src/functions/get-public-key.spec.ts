import type { AxiosInstance } from "axios";

import { getPublicKey } from "./get-public-key";

describe("getPublicKey", () => {
	let client: AxiosInstance;

	beforeAll(() => {
		client = {
			get: jest.fn(),
		} as unknown as AxiosInstance;
	});

	it("should get public key", async () => {
		const keyId = "keyId";
		const publicKey = "publicKey";
		const response = {
			data: {
				public_key: publicKey,
			},
		};
		jest.spyOn(client, "get").mockResolvedValue(response);

		const result = await getPublicKey({
			client,
			keyId,
		});

		expect(result).toEqual({ publicKey });
		expect(client.get).toHaveBeenCalledWith(
			`api/v1/payments/card/public_key/${keyId}`,
		);
	});
});
