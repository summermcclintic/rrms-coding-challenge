import React, { useEffect, useState } from "react";
import { useMemo } from 'react';
import {
  MRT_Table,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

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

export const ProductsPage = () => {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
    const [showProduct, setShowProduct] = useState(false);
    // const [showForm, setShowForm] = useState(false);

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
    ], [], );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const products = await response.json();
                setData(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                console.log(data);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    // useEffect(() => {
    //     console.log("Fetched Data:", data);
    // }, [data]);

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                console.info(event, row.original.id);
                setSelectedProduct(row.original);
                setShowProduct(true);
            },
            sx: {
                cursor: 'pointer',
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
            <Dialog
                open={showProduct}
                onClose={() => setShowProduct(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        {selectedProduct.name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Price:</strong> ${selectedProduct.price}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Category:</strong> {selectedProduct.category}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Description:</strong> {selectedProduct.description}
                    </Typography>
                    <Typography variant="body1">
                        <strong>In Stock:</strong> {selectedProduct.stock}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Rate:</strong> {selectedProduct.rating.rate}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Count:</strong> {selectedProduct.rating.count}
                    </Typography>
                    <Typography variant="body1">
                        <strong>SKU:</strong> {selectedProduct.sku}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setShowProduct(false)} color="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </DialogActions>
            </Dialog>
            {/* <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                    }}
                >
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment> */}
        </div>
    );
};

export default ProductsPage;