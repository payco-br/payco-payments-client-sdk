export function getDeviceInfo() {
	return {
		http_accept_browser_value: "*/*",
		http_accept_content: "*/*",
		http_browser_language: navigator.language.split(",").shift() || "pt-BR",
		http_browser_java_enabled: navigator?.javaEnabled() || false,
		http_browser_javascript_enabled: true,
		http_browser_color_depth: window.screen.colorDepth,
		http_browser_screen_height: window.screen.height,
		http_browser_screen_width: window.screen.width,
		http_browser_time_difference: new Date().getTimezoneOffset().toString(),
		user_agent_browser_value: navigator.userAgent,
	};
}
