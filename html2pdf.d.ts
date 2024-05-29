declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: {};
    jsPDF?: {};
    margin?: number | number[];
    pagebreak?: { mode?: string | string[]; before?: string | string[]; after?: string | string[] };
  }

  interface Html2Pdf {
    from(element: HTMLElement): Html2Pdf;
    set(options: Html2PdfOptions): Html2Pdf;
    save(): Promise<void>;
  }

  function html2pdf(): Html2Pdf;

  export default html2pdf;
}
