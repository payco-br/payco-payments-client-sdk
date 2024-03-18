Object.defineProperty(exports, "__esModule", { value: true });
exports.installScripts = void 0;
function installScripts(_a) {
	var orgId = _a.orgId,
		sessionId = _a.sessionId;
	var $sessionId =
		sessionId !== null && sessionId !== void 0
			? sessionId
			: window.crypto.randomUUID();
	var head = document.head;
	var script =
		'<script type="text/javascript" src="https://h.online-metrix.net/fp/tags.js?org_id='
			.concat(orgId, "&session_id=adiq_br")
			.concat($sessionId, '"></script>');
	head.insertAdjacentHTML("beforeend", script);
	var body = document.body;
	var nonscript =
		'<noscript><iframe style="width: 100px; height: 100px; border: 0; position:absolute; top: -5000px;" src="https://h.online-metrix.net/fp/tags.js?org_id='
			.concat(orgId, "&session_id=adiq_br")
			.concat($sessionId, '"></iframe>></noscript>');
	body.insertAdjacentHTML("beforeend", nonscript);
	return $sessionId;
}
exports.installScripts = installScripts;
//# sourceMappingURL=install-scripts.js.map
