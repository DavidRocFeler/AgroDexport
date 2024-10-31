// import { IAgroProduct } from "@/interface/types";

// export const exampleMyProducts: IAgroProduct[] = [
//     {
//         id: 1,
//         name: "Tomates Orgánicos",
//         description: "Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.",
//         variety: "Cherry",
//         origin: "Piura, Peru",
//         harvestDate: "2024-09-01",
//         pricePerUnit: 3.50,
//         unitType: "5t",
//         stock: "20t",
//         images: [
//         "https://th.bing.com/th/id/R.c708d27739608c0991455e18453d56a5?rik=Kuig%2bcxBwN8d9g&pid=ImgRaw&r=0",
//         ],
//         nutritionalInfo: {
//         calories: 20,
//         protein: 1,
//         fat: 0.2,
//         carbs: 3,
//         },
//         uses: ["Ensaladas", "Salsas", "Guisos"],
//         certifications: "Orgánico, Fair Trade",
//         shippingOptions: {
//         method: "Refrigerated",
//         deliveryTime: "15-20 días",
//         seaFreight: "Marsk",
//         },
//         reviews: [
//         {
//             userName: "Juan Pérez",
//             rating: 5,
//             comment: "Producto muy fresco y de excelente calidad.",
//         },
//         ],
//     },
//     {
//         id: 2,
//         name: "Tomates Orgánicos",
//         description: "Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.",
//         variety: "Cherry",
//         origin: "Piura, Peru",
//         harvestDate: "2024-09-01",
//         pricePerUnit: 3.50,
//         unitType: "5t",
//         stock: "20t",
//         images: [
//         "https://th.bing.com/th/id/R.c708d27739608c0991455e18453d56a5?rik=Kuig%2bcxBwN8d9g&pid=ImgRaw&r=0",
//         ],
//         nutritionalInfo: {
//         calories: 20,
//         protein: 1,
//         fat: 0.2,
//         carbs: 3,
//         },
//         uses: ["Ensaladas", "Salsas", "Guisos"],
//         certifications: "Orgánico, Fair Trade",
//         shippingOptions: {
//         method: "Refrigerated",
//         deliveryTime: "15-20 días",
//         seaFreight: "Marsk",
//         },
//         reviews: [
//         {
//             userName: "Juan Pérez",
//             rating: 5,
//             comment: "Producto muy fresco y de excelente calidad.",
//         },
//         ],
//     },
//     {
//         id: 3,
//         name: "Tomates Orgánicos",
//         description: "Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.",
//         variety: "Cherry",
//         origin: "Piura, Peru",
//         harvestDate: "2024-09-01",
//         pricePerUnit: 3.50,
//         unitType: "5t",
//         stock: "20t",
//         images: [
//         "https://th.bing.com/th/id/R.c708d27739608c0991455e18453d56a5?rik=Kuig%2bcxBwN8d9g&pid=ImgRaw&r=0",
//         ],
//         nutritionalInfo: {
//         calories: 20,
//         protein: 1,
//         fat: 0.2,
//         carbs: 3,
//         },
//         uses: ["Ensaladas", "Salsas", "Guisos"],
//         certifications: "Orgánico, Fair Trade",
//         shippingOptions: {
//         method: "Refrigerated",
//         deliveryTime: "15-20 días",
//         seaFreight: "Marsk",
//         },
//         reviews: [
//         {
//             userName: "Juan Pérez",
//             rating: 5,
//             comment: "Producto muy fresco y de excelente calidad.",
//         },
//         ],
//     },
//     {
//         id: 4,
//         name: "Tomates Orgánicos",
//         description: "Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.",
//         variety: "Cherry",
//         origin: "Piura, Peru",
//         harvestDate: "2024-09-01",
//         pricePerUnit: 3.50,
//         unitType: "5t",
//         stock: "20t",
//         images: [
//         "https://th.bing.com/th/id/R.c708d27739608c0991455e18453d56a5?rik=Kuig%2bcxBwN8d9g&pid=ImgRaw&r=0",
//         ],
//         nutritionalInfo: {
//         calories: 20,
//         protein: 1,
//         fat: 0.2,
//         carbs: 3,
//         },
//         uses: ["Ensaladas", "Salsas", "Guisos"],
//         certifications: "Orgánico, Fair Trade",
//         shippingOptions: {
//         method: "Refrigerated",
//         deliveryTime: "15-20 días",
//         seaFreight: "Marsk",
//         },
//         reviews: [
//         {
//             userName: "Juan Pérez",
//             rating: 5,
//             comment: "Producto muy fresco y de excelente calidad.",
//         },
//         ],
//     },
//     {
//         id: 5,
//         name: "Tomates Orgánicos",
//         description: "Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.. Tomates frescos y orgánicos cultivados en Piura, Peru. Ideales para ensaladas y salsas.",
//         variety: "Cherry",
//         origin: "Piura, Peru",
//         harvestDate: "2024-09-01",
//         pricePerUnit: 3.50,
//         unitType: "5t",
//         stock: "20t",
//         images: [
//         "https://th.bing.com/th/id/R.c708d27739608c0991455e18453d56a5?rik=Kuig%2bcxBwN8d9g&pid=ImgRaw&r=0",
//         ],
//         nutritionalInfo: {
//         calories: 20,
//         protein: 1,
//         fat: 0.2,
//         carbs: 3,
//         },
//         uses: ["Ensaladas", "Salsas", "Guisos"],
//         certifications: "Orgánico, Fair Trade",
//         shippingOptions: {
//         method: "Refrigerated",
//         deliveryTime: "15-20 días",
//         seaFreight: "Marsk",
//         },
//         reviews: [
//         {
//             userName: "Juan Pérez",
//             rating: 5,
//             comment: "Producto muy fresco y de excelente calidad.",
//         },
//         ],
//     },
// ];
