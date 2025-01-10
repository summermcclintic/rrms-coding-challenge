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
    TextField,
    DialogContentText,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';

// add back to home button

export type Rating = {
    rate: number,
    count: number,
}

export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    sku: string,
    image_url: string,
    rating: Rating,
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
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(defaultProduct);
    const [showProduct, setShowProduct] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // test these out and fix
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    const table = useMaterialReactTable({
        columns,
        data: products,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
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

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleSubmit = () => {
        toast.success('Product added!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div className="container mx-auto p-6">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <MRT_Table table={table} />
            <Dialog
                open={showProduct}
                onClose={() => setShowProduct(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        <strong>Name:</strong> {selectedProduct.name}
                    </Typography>
                    {/* change order to match form ******************************* */}
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
                        <strong>Number In-Stock:</strong> {selectedProduct.stock}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Rating:</strong> {selectedProduct.rating.rate}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Rating Count:</strong> {selectedProduct.rating.count}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Image URL:</strong> {selectedProduct.image_url}
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
            <React.Fragment>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Product
                </button>
                <Dialog
                    open={showForm}
                    onClose={handleFormClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            handleSubmit();
                            handleFormClose();
                        },
                    }}
                >
                    <DialogTitle>New Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter product details.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="category"
                            name="category"
                            label="Category"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="stock"
                            name="stock"
                            label="Number In-Stock"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="sku"
                            name="sku"
                            label="SKU"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="image_url"
                            name="image_url"
                            label="Image URL"
                            type="url"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="rate"
                            name="rate"
                            label="Rating"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="rate_count"
                            name="rate_count"
                            label="Rating count"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        {/* change button format ****************************************/}
                        <button onClick={handleFormClose}>Cancel</button>
                        <button type="submit">Add</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default ProductsPage;