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
    "status": "x"
}

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

const CartsPage = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedCart, setSelectedCart] = useState(defaultCart);
    const [showCart, setShowCart] = useState(false);

    const columns = useMemo<MRT_ColumnDef<Cart & { userFullName: string, numItems: number }>[]>( () => [
        {
            accessorKey: 'userFullName',
            header: 'User Full Name',
        },
        {
            accessorKey: 'date',
            header: 'Date',
        },
        {
            accessorKey: 'status',
            header: 'Status',
        },
        {
            accessorKey: 'numItems',
            header: 'Number of Items in Cart',
        },
    ], [], );

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/carts");
                if (!response.ok) {
                    throw new Error("Failed to fetch carts");
                }
                const data = await response.json();
                setCarts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);  // where set to true?
                // console.log(data);
            }
        };

        fetchCarts();
    }, []);

    if (loading) return <p>Loading carts...</p>;
    if (error) return <p>Error: {error}</p>;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://api.jsoning.com/mock/public/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
                // console.log(data);
            }
        };

        fetchUsers();
    }, []);

    const cartsTableData = useMemo(() => {
        return carts.map((cart) => {
            const user = users.find((u) => u.id === String(cart.userId));
            return {
                ...cart,
                userFullName: user ? `${user.firstname} ${user.lastname}` : "Unknown User",
                numItems: cart.items.length,
            };
        });
    }, [carts, users]);

    const table = useMaterialReactTable({
        columns,
        data: cartsTableData,
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                console.info(event, row.original.id);
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
    });

    return (
       <div className="container mx-auto p-6">
            <MRT_Table table={table} />
            <Dialog
                open={showCart}
                onClose={() => setShowCart(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Cart Details</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        {selectedCart.id}
                    </Typography>
                    <Typography variant="body1">
                        <strong>User name:</strong> Firstname Lastname
                    </Typography>
                    <Typography variant="body1">
                        <strong>User email:</strong> example@gmail.com
                    </Typography>
                    <Typography variant="body1">
                        <strong>User city, state, and zip code:</strong> Bville, NY 13027
                    </Typography>
                    <Typography variant="body1">
                        <strong>User Phone:</strong> 123-123-1234
                    </Typography>
                    <Typography variant="body1">
                        <strong>For each product in cart:</strong>
                    </Typography>
                    <Typography variant="body1">
                        <strong>- Product name:</strong> Product name
                    </Typography>
                    <Typography variant="body1">
                        <strong>- Product description:</strong> Product description
                    </Typography>
                    <Typography variant="body1">
                        <strong>- Quantity:</strong> Quantity
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setShowCart(false)} color="primary"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </DialogActions>
            </Dialog>
            {/* <h1>Users</h1>
			<ul>
				{users.map((user) => (
				<li key={user.id}>{user.firstname}</li> // Adjust according to your JSON structure
				))}
			</ul> */}
        </div>
    );
};

export default CartsPage;