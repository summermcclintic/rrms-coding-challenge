import React, { useEffect, useState } from "react";
import { useMemo } from 'react';
import {
  MRT_Table,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';

export type Rating = {
    rate: number;
    count: number;
}

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    sku: string;
    image_url: string;
    rating: Rating;
};

// export type Person = {
//     firstName: string;
//     lastName: string;
//     address: string;
//     city: string;
//     state: string;
// };

// export const data = [
//   {
//     firstName: 'Dylan',
//     lastName: 'Murray',
//     address: '261 Erdman Ford',
//     city: 'East Daphne',
//     state: 'Kentucky',
//   },
//   {
//     firstName: 'Raquel',
//     lastName: 'Kohler',
//     address: '769 Dominic Grove',
//     city: 'Columbus',
//     state: 'Ohio',
//   },
//   {
//     firstName: 'Ervin',
//     lastName: 'Reinger',
//     address: '566 Brakus Inlet',
//     city: 'South Linda',
//     state: 'West Virginia',
//   },
//   {
//     firstName: 'Brittany',
//     lastName: 'McCullough',
//     address: '722 Emie Stream',
//     city: 'Lincoln',
//     state: 'Nebraska',
//   },
//   {
//     firstName: 'Branson',
//     lastName: 'Frami',
//     address: '32188 Larkin Turnpike',
//     city: 'Charleston',
//     state: 'South Carolina',
//   },
// ];  

export const defaultProduct = {
    "id": "0",
      "name": "x",
      "description": "x",
      "price": 0,
      "category": "x",
      "stock": 0,
      "sku": "x",
      "image_url": "https://example.com/images/wirelessmouse.jpg",
      "rating": {
        "rate": 0,
        "count": 0
      }
}

export const data = [
    {
      "id": "1",
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with adjustable DPI settings and long battery life.",
      "price": 29.99,
      "category": "Peripherals",
      "stock": 150,
      "sku": "WMOUSE-001",
      "image_url": "https://example.com/images/wirelessmouse.jpg",
      "rating": {
        "rate": 4.5,
        "count": 200
      }
    },
    {
      "id": "2",
      "name": "Mechanical Keyboard",
      "description": "Mechanical keyboard with customizable RGB lighting and durable switches.",
      "price": 89.99,
      "category": "Peripherals",
      "stock": 100,
      "sku": "MKEYBOARD-002",
      "image_url": "https://example.com/images/mechanicalkeyboard.jpg",
      "rating": {
        "rate": 4.7,
        "count": 350
      }
    },
    {
      "id": "3",
      "name": "Gaming Headset",
      "description": "High-quality gaming headset with surround sound and noise-canceling microphone.",
      "price": 69.99,
      "category": "Peripherals",
      "stock": 80,
      "sku": "GHEADSET-003",
      "image_url": "https://example.com/images/gamingheadset.jpg",
      "rating": {
        "rate": 4.6,
        "count": 180
      }
    },
    {
      "id": "4",
      "name": "1080p Webcam",
      "description": "Full HD webcam with built-in microphone and adjustable stand.",
      "price": 49.99,
      "category": "Peripherals",
      "stock": 60,
      "sku": "WEB-004",
      "image_url": "https://example.com/images/1080pwebcam.jpg",
      "rating": {
        "rate": 4.4,
        "count": 120
      }
    },
    {
      "id": "5",
      "name": "Laptop Stand",
      "description": "Adjustable laptop stand for improved ergonomics and cooling.",
      "price": 39.99,
      "category": "Accessories",
      "stock": 200,
      "sku": "LSTAND-005",
      "image_url": "https://example.com/images/laptopstand.jpg",
      "rating": {
        "rate": 4.8,
        "count": 220
      }
    },
    {
      "id": "6",
      "name": "USB Hub",
      "description": "4-port USB hub with fast charging capability.",
      "price": 19.99,
      "category": "Accessories",
      "stock": 300,
      "sku": "USHUB-006",
      "image_url": "https://example.com/images/usbhub.jpg",
      "rating": {
        "rate": 4.2,
        "count": 250
      }
    },
    {
      "id": "7",
      "name": "Portable SSD 1TB",
      "description": "High-speed 1TB portable SSD with USB-C connectivity.",
      "price": 129.99,
      "category": "Storage",
      "stock": 90,
      "sku": "PSSD-007",
      "image_url": "https://example.com/images/portablesdd.jpg",
      "rating": {
        "rate": 4.7,
        "count": 300
      }
    },
    {
      "id": "8",
      "name": "Bluetooth Speaker",
      "description": "Compact Bluetooth speaker with 10-hour battery life and water resistance.",
      "price": 59.99,
      "category": "Audio",
      "stock": 140,
      "sku": "BTSPEAKER-008",
      "image_url": "https://example.com/images/bluetoothspeaker.jpg",
      "rating": {
        "rate": 4.5,
        "count": 150
      }
    },
    {
      "id": "9",
      "name": "Desk Lamp",
      "description": "LED desk lamp with adjustable brightness and color temperature.",
      "price": 34.99,
      "category": "Home",
      "stock": 180,
      "sku": "DESKLAMP-009",
      "image_url": "https://example.com/images/desklamp.jpg",
      "rating": {
        "rate": 4.6,
        "count": 130
      }
    },
    {
      "id": "10",
      "name": "Gaming Chair",
      "description": "Ergonomic gaming chair with lumbar support and reclining features.",
      "price": 199.99,
      "category": "Furniture",
      "stock": 70,
      "sku": "GCH-010",
      "image_url": "https://example.com/images/gamingchair.jpg",
      "rating": {
        "rate": 4.8,
        "count": 170
      }
    }
  ];

    export const ProductsPage = () => {
        const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
        const [showProduct, setShowProduct] = useState(false);
        const columns = useMemo<MRT_ColumnDef<Product>[]>( () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'price',
                header: 'Price',
            },
            {
                accessorKey: 'category',
                header: 'Category',
            },
            {
                accessorKey: 'stock',
                header: 'Number In-Stock',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableBodyRowProps: ({ row }) => ({
        onClick: (event) => {
            console.info(event, row.id);
            setSelectedProduct(row.original);
            setShowProduct(true);
        },
        sx: {
            cursor: 'pointer', //you might want to change the cursor too when adding an onClick
        },
        hover: true,
        }),
        enableKeyboardShortcuts: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        mrtTheme: (theme) => ({
        baseBackgroundColor: theme.palette.background.default,
        }),
        muiTableProps: {
        sx: {
            border: '1px solid rgba(81, 81, 81, .5)',
            caption: {
            captionSide: 'top',
            },
        },
        },
        muiTableHeadCellProps: {
        sx: {
            border: '1px solid rgba(81, 81, 81, .5)',
            fontStyle: 'italic',
            fontWeight: 'normal',
        },
        },
        muiTableBodyCellProps: {
        sx: {
            border: '1px solid rgba(81, 81, 81, .5)',
        },
        },
    });

    return (
        <div className="container mx-auto p-6">
            <MRT_Table table={table} />
            {showProduct && (
                <div className="mt-6 border rounded-lg shadow-lg p-4 bg-white">
                    <button
                        className="float-right text-red-500 hover:text-red-700"
                        onClick={() => setShowProduct(false)}
                    >
                        Close
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                    <p><strong>Price:</strong> ${selectedProduct.price}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Description:</strong> {selectedProduct.description}</p>
                    <p><strong>In Stock:</strong> {selectedProduct.stock}</p>
                    <p><strong>Rate:</strong> {selectedProduct.rating.rate}</p>
                    <p><strong>Count:</strong> {selectedProduct.rating.count}</p>
                    <p><strong>Image URL:</strong> {selectedProduct.image_url}</p>
                    <p><strong>SKU:</strong> {selectedProduct.sku}</p>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;