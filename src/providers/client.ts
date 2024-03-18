import axios from "axios";

export type ClientConfig = {
	baseURL: string;
};

export function createClient({ baseURL }: ClientConfig) {
	return axios.create({
		baseURL,
	});
}
