export type InstallScriptsInput = {
	orgId: string;
	sessionId?: string;
};

export function installScripts({ orgId, sessionId }: InstallScriptsInput) {
	const $sessionId = sessionId ?? window.crypto.randomUUID();
	const head = document.head;
	const script = `<script type="text/javascript" src="https://h.online-metrix.net/fp/tags.js?org_id=${orgId}&session_id=adiq_br${$sessionId}"></script>`;
	head.insertAdjacentHTML("beforeend", script);

	const body = document.body;
	const nonscript = `<noscript><iframe style="width: 100px; height: 100px; border: 0; position:absolute; top: -5000px;" src="https://h.online-metrix.net/fp/tags.js?org_id=${orgId}&session_id=adiq_br${$sessionId}"></iframe>></noscript>`;
	body.insertAdjacentHTML("beforeend", nonscript);
	return $sessionId;
}
