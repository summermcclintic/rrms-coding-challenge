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
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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

export type Item = {
    productId: number,
    quantity: number,
}

export type Cart = {
    id: string,
    userId: number,
    items: Item[],
    date: string,
    status: string,
}

export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    phone: string,
}

export type UserAndCart = Cart & {
    user: User | {
        firstname: string;
        lastname: string;
        email: string;
        city: string;
        state: string;
        zipcode: string;
        phone: string;
    };
};

export const defaultUser = {
    "id": "x",
    "firstname": "x",
    "lastname": "x",
    "email": "x",
    "username": "x",
    "address": "x",
    "city": "x",
    "state": "x",
    "zipcode": "x",
    "country": "x",
    "phone": "x"
}

export const defaultCart = {
    "id": "x",
    "userId": 0,
    "items": [
      {
        "productId": 0,
        "quantity": 0
      }
    ],
    "date": "x",
    "status": "x",
    "user": defaultUser
}

const CartsPage = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedCart, setSelectedCart] = useState<UserAndCart>(defaultCart);
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();

    const columns = useMemo<MRT_ColumnDef<UserAndCart & { numItems: number }>[]>( () => [
        {
            accessorFn: (row) => `${row.user.firstname} ${row.user.lastname}`,
            id: 'fullName',
            header: 'User Full Name',
        },
        {
            accessorFn: (row) => dayjs(row.date).format('MM/DD/YYYY hh:mm:ss A'),
            id: 'formattedDateTime',
            header: 'Date',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'numItems',
            header: 'Number of Items',
        },
    ], [], );

    // comine with other useeffect
    useEffect(() => {
        const fetchCarts = async () => {
            if (!products.length) {
                setLoading(true);
            }
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/carts");
                if (!response.ok) {
                    throw new Error("Failed to fetch carts");
                }
                const data = await response.json();
                setCarts(data);
            } catch (error) {
                setError(true);
                console.error(error);
                return;
            }
            setError(false);
            setLoading(false);
        };

        const fetchUsers = async () => {
            if (!products.length) {
                setLoading(true);
            }
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(true);
                console.error(error);
                return;
            }
            setError(false);
            setLoading(false);
        };

        const fetchProducts = async () => {
            if (!products.length) {
                setLoading(true);
            }
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(true);
                console.error(error);
                return;
            }
            setError(false);
            setLoading(false);
        };

        fetchCarts();
        fetchUsers();
        fetchProducts();
    }, []);

    const cartsTableData = useMemo(() => {
        return carts.map((cart) => {
            const user = users.find((u) => u.id === String(cart.userId));
            const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            return {
                ...cart,
                user: user || {
                    firstname: "Abandoned",
                    lastname: "User",
                    email: "N/A",
                    city: "N/A",
                    state: "N/A",
                    zipcode: "N/A",
                    phone: "N/A",
                },
                numItems: totalQuantity,
            };
        });
    }, [carts, users]);

    const table = useMaterialReactTable({
        columns,
        data: cartsTableData,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                setSelectedCart(row.original);
                setShowCart(true);
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
        state: {
            isLoading: loading,
            showAlertBanner: error,
        },
    });

    return (
        <div className="relative min-h-screen bg-gray-100">
            <button
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            >
                Back to Home
            </button>
            <div className="text-4xl font-bold text-center">Carts</div>
            <div className="flex flex-col items-center justify-center">
                <MRT_Table table={table} className="mt-8 max-w-screen-md"/>
            </div>
            <Dialog
                open={showCart}
                onClose={() => setShowCart(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Cart Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        <strong>User Full Name:</strong> {selectedCart.user.firstname} {selectedCart.user.lastname}
                    </Typography>
                    <Typography variant="body1">
                        <strong>User Email:</strong> {selectedCart.user.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>User City, State, and Zip Code:</strong> {selectedCart.user.city} {selectedCart.user.state} {selectedCart.user.zipcode}
                    </Typography>
                    <Typography variant="body1">
                        <strong>User Phone:</strong> {selectedCart.user.phone}
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "1em" }}>
                        Products
                    </Typography>
                    {selectedCart.items.map((item, index) => (
                        <div key={index}>
                            <Typography variant="body1">
                                <strong>Product Name:</strong> {
                                    products.find((p) => p.id === String(item.productId))?.name ||
                                    `Unknown Product (ID: ${item.productId})`
                                }
                            </Typography>
                            <Typography variant="body1">
                                <strong>Product Description:</strong> {
                                    products.find((p) => p.id === String(item.productId))?.description || 
                                    'Description not available'
                                }
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Quantity:</strong> {item.quantity}
                            </Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setShowCart(false)} color="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
                    >
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CartsPage;