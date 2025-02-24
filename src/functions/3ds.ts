import axios from "axios";
import { FISERV_BASE_URL, MERCHANT_ID, MERCHANT_KEY } from "env";
import { Fiserv3dsGetAuthRequest, Fiserv3dsGetAuthResponse } from "fiserv3ds";

const fiservClient = axios.create({
	baseURL: FISERV_BASE_URL,
});

export async function getAuthMethod(
	cardNumber: string,
): Promise<Fiserv3dsGetAuthResponse> {
	const merchantId = MERCHANT_ID;
	const merchantKey = MERCHANT_KEY;
	const requestData: Fiserv3dsGetAuthRequest = {
		cardholder: {
			acct: {
				number: cardNumber,
			},
		},
		brand_id: "2",
	};

	const response = await fiservClient.post<Fiserv3dsGetAuthResponse>(
		"/v2/authentication",
		{
			requestData,
		},
		{
			headers: {
				"Content-Type": "application/json",
				merchant_id: merchantId,
				merchant_key: merchantKey,
			},
		},
	);

	const getAuthResponse: Fiserv3dsGetAuthResponse = response.data;

	return getAuthResponse;
}
