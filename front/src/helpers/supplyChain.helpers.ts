import { ISupplyChainProps } from "@/interface/types";

export const supplyChainArray: ISupplyChainProps[] = [
    {
        id: 1,
        title: "Farmer",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Phytosanitary certificate",
        documentB: "Registration of agricultural producer",
        documentC: "Organic certification",
        documentD: "Quality certificate",
        documentE: "Certificate of origin"
    },
    {
        id: 2,
        title: "Internal logistics",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Internal transfer or referral guide",
        documentB: "Packing List",
        documentC: "Proof of delivery",
        documentD: null,
        documentE: null
    },
    {
        id: 3,
        title: "Customs Origin",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Export permission ",
        documentB: "Export declaration",
        documentC: "Inspection certificate",
        documentD: null,
        documentE: null
    },
    {
        id: 4,
        title: "International Logistic",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Bill of Lading (B/L)",
        documentB: "Transport insurance",
        documentC: "Cargo manifest",
        documentD: "Sea Waybill",
        documentE: "Shipping Instruction",
    },
    {
        id: 5,
        title: "Customs destiny",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Import declaration",
        documentB: "Inspection",
        documentC: "Certificate",
        documentD: "Import permit",
        documentE: null,
    },
    {
        id: 6,
        title: "Destiny logistics",
        image: "./FarmerIcon.png",
        description: "este es el componente supply chain",
        documentA: "Referral guide or delivery remission",
        documentB: "Proof of delivery",
        documentC: "Transportation service invoice",
        documentD: null,
        documentE: null
    }
]