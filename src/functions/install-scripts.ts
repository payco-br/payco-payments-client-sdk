export type InstallScriptsInput = {
	orgId: string;
	sessionId?: string;
};

export function installScripts({ orgId, sessionId }: InstallScriptsInput) {
	const $sessionId = sessionId ?? window.crypto.randomUUID();
	const body = document.body;

	const adiq_script = document.createElement("script");
	adiq_script.id = "adiq";
	adiq_script.type = "text/javascript";
	adiq_script.src = `https://h.online-metrix.net/fp/tags.js?org_id=${orgId}&session_id=adiq_br${$sessionId}`;
	body.appendChild(adiq_script);

	const fsrv_script = document.createElement("script");
	fsrv_script.type = "text/javascript";
	fsrv_script.id = "kdtjs";
	fsrv_script.async = true;
	fsrv_script.src = "https://i.k-analytix.com/k.js";
	body.appendChild(fsrv_script);

	const noscript = `
		<noscript>
			<iframe
				style="width: 100px; height: 100px; border: 0; position:absolute; top: -5000px;"
				src="https://h.online-metrix.net/fp/tags.js?org_id=${orgId}&session_id=adiq_br${$sessionId}"
			></iframe>
		</noscript>`;
	body.insertAdjacentHTML("beforeend", noscript);

	return $sessionId;
}
