const iframe = document.createElement("iframe");
iframe.style.display = "none";
document.body.appendChild(iframe);
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
iframeDocument.open();
iframeDocument.write("<pre>" + receiptContent + "</pre>");
iframeDocument.close();

iframe.contentWindow.print();

iframe.parentNode.removeChild(iframe);
