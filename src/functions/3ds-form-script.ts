export type Inject3DSFormInput = {
    actionUrl: string;
    threeDSMethodData: string;
};

/**
 * @typedef {Object} Inject3DSFormInput
 * @param {string} actionUrl - URL de destino para o envio do formulário.
 * @param {string} threeDSMethodData - Dados de um json com threeDSMethodNotificationURL e threeDSServerTransID.
 * codificado em base64. Ex: json: {
   "threeDSServerTransID":"12341234-1234-1234-1234-123412341234",
   "threeDSMethodNotificationURL":"threeDSMethodNotificationURL"
} - base64: ewogICAidGhyZWVEU1NlcnZlclRyYW5zSUQiOiIxMjM0MTIzNC0xMjM0LTEyMzQtMTIzNC0xMjM0MTIzNDEyMzQiLAogICAidGhyZWVEU01ldGhvZE5vdGlmaWNhdGlvblVSTCI6InRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiCn0=
 * @property {string} threeDSMethodNotificationURL - URL que receberá a notificação de conclusão do 3DS Method pelo ACS. (Máx: 256 AN)
 * @property {string} threeDSServerTransID - ID da transação 3DS Server. (Exatamente 36 AN)
 */
export function inject3DSForm({ actionUrl, threeDSMethodData }: Inject3DSFormInput) {
    const body = document.body;

    const form = document.createElement("form");
    form.name = "frm";
    form.method = "POST";
    form.action = actionUrl;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "threeDSMethodData";
    input.value = threeDSMethodData;

    form.appendChild(input);
    body.appendChild(form);

    const iframe = document.createElement("iframe");
    iframe.name = "threeDsMethodFrame";
    iframe.width = "1px";
    iframe.height = "1px";
    iframe.frameBorder = "0";
    body.appendChild(iframe);

    const script = document.createElement("script");
    script.textContent = `
        console.log('3DS Method');
        document.forms.threeDsMethodForm.submit();
    `;
    body.appendChild(script);
}
