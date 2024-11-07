export interface IInternalLogistic {
    InternalTransferGuide: string;
    PackingList: string;
    DeliveryReceipt: string;
}

export interface ICustomOfOrigin {
    ExportPermit: string;
    ExportDeclaration: string;
    InspectionCertificate: string;
}

export interface IInternationalLogistic {
    TransportInsurance: string;
    CargoManifest: string;
    CargoGuide: string;
    BillOfLading: string;
    GoodsDepositReceipt: string;
}

export interface ICustomOfDestiny {
    ImportDeclaration: string;
    InspectionCertificate: string;
    ImportPermit: string
}

export interface IDestinyLogistic {
    DeliveryNote: string;
    ProofOfDelivery: string;
    InternalTransportServiceInvoice: string;
}