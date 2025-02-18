import axios from 'axios';
import { Fiserv3dsGetAuthRequest, Fiserv3dsGetAuthResponse } from '@types/fiserv3ds';

const fiservClient = axios.create({
    baseURL: process.env.FISERV_BASE_URL,
});

export async function getAuthMethod(cardNumber:string):Promise<Fiserv3dsGetAuthResponse> {

    const requestData: Fiserv3dsGetAuthRequest = {
    cardholder: {
        acct: {
            number: cardNumber
        }
    },
    brand_id: '2'
};

    const response = await fiservClient.post<Fiserv3dsGetAuthResponse>('/v2/authentication', {
        requestData
    }, {
        headers: {
            'Content-Type': 'application/json',
            'merchant_id': `merchant_id`,
            'merchant_key': `merchant_key`,
        }
    });

    const getAuthResponse: Fiserv3dsGetAuthResponse = response.data;

    return getAuthResponse;

}