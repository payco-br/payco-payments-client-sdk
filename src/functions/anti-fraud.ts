/**
 * Retorna um ID gerado pelo sistema anti-fraude para identificar um visitante ou novo cliente e fazer o vínculo entre este acesso e uma futura compra.
 *
 * **Caso o cliente já tenha um identificador único gerado pela sua platatforma, utilize {@link setCustomerID}**
 * @returns Identificador único que pode ser atribuído a um visitante ou novo cliente
 */
export function getVisitorID() {
	return Konduto.getVisitorID();
}

/**
 * Envia o identificador de um cliente (já registrado em sua plataforma) para que o sistema anti-fraude faça o vínculo entre este acesso e uma futura compra.
 *
 * @param id Identificador único do cliente
 */
export function setCustomerID(id: string | number) {
	return Konduto.setCustomerID(id);
}

/**
 * Opcionalmente utilizado para melhorar a análise de risco, fornecendo informações específicas sobre as diversas páginas do site.
 * @param type Tipo de página ou elemento a ser marcado
 * @param value Nome da página ou valor marcado
 *
 * @example Marcando a página de checkout
 * ```
 * SDK.addPageTag("page", "checkout")
 * SDK.addPageTag("checkout", "id=1, sku=Nome do Produto")
 * ```
 */
export function addPageTag(type: string, value: string) {
	Konduto.sendEvent(type, value);
}
