Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInfo = void 0;
function getDeviceInfo() {
	return {
		http_accept_brower_value: navigator.userAgent,
		// @ts-ignore
		http_accept_content: navigator.accept,
		http_browser_language: navigator.language,
		http_browser_java_enabled:
			(navigator === null || navigator === void 0
				? void 0
				: navigator.javaEnabled()) || false,
		http_browser_javascript_enabled: true,
		http_browser_color_depth: window.screen.colorDepth,
		http_browser_screen_height: window.screen.height,
		http_browser_screen_width: window.screen.width,
		http_browser_time_difference: new Date().getTimezoneOffset().toString(),
		user_agent_browser_value: navigator.userAgent,
	};
}
exports.getDeviceInfo = getDeviceInfo;
//# sourceMappingURL=get-device-info.js.map
