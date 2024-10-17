export interface Document{
    id: string,
    firstLanguageId: string,
    secondLanguageId: string,   
    code: string,
    urlPath: string,
    fileType: string,
    pageNumber: number,
    numberOfCopies: number,
    notarizationRequest: string,
    numberOfNotarizatedCopies: number,
    translationStatus: string,
    notarizationStatus: string,
    attachmentId: string,
    notarizationId: string,
    documentTypeId: string,
    orderId: string,
    
}