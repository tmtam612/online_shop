import React from 'react';
import AddProductFormDialog from './AddProductFormDialog';
import EditProductFormDialog from './EditProductFormDialog';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tdImg: {
        maxWidth: 100,
        maxHeight: 100,
        overflowX: "scroll",
    }
});



function ProductManageList(props) {

    const { products, setProducts } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteDialog, setDeleteDialog] = React.useState({
        open: false,
        id: ''
    })
    const [edit, setEdit] = React.useState({
        open: false,
        status: 'info',
        text: 'Edit product',
        product: {},
    })

    const checkPropertiesEmpty = obj => {
        for (var key in obj) {
            if (obj[key] === "") {
                return false;
            }
        }
        return true;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenEdit = prod => {
        setEdit({
            ...edit,
            open: true,
            product: prod,
        })

    }

    const handleCloseEdit = () => {
        setEdit({
            ...edit,
            status: 'info',
            text: 'Edit product',
            open: false,
        })
    }

    const handleChangeEdit = (event) => {
        if (event.target.id === 'image') {
            setEdit({
                ...edit,
                product: {
                    ...edit.product,
                    "image": event.target.files[0],
                }
            })
        } else {
            setEdit({
                ...edit,
                product: {
                    ...edit.product,
                    [event.target.id]: event.target.value,
                }
            })
        }
    }

    const handleOpenDeleteDialog = (id) => {
        setDeleteDialog({
            open: true,
            id,
        });
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog({
            ...deleteDialog,
            open: false,
        });
    }

    const handleDeleteProduct = () => {
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/products/' + deleteDialog.id,
        }).then(function (response) {
            const array = products.filter(item => item.id !== deleteDialog.id);
            setProducts(array);
            handleCloseDeleteDialog();
        })
            .catch(function (error) {
            });
    }
    return (
        <div>
            <AddProductFormDialog
                products={products}
                setProducts={setProducts}
                onCheckPropertiesEmpty={checkPropertiesEmpty}
            />
            <EditProductFormDialog
                products={products}
                setProducts={setProducts}
                edit={edit} setEdit={setEdit}
                onCloseEdit={handleCloseEdit}
                onChangeEdit={handleChangeEdit}
                onCheckPropertiesEmpty={checkPropertiesEmpty} />
            <Dialog
                open={deleteDialog.open}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        No
                </Button>
                    <Button onClick={handleDeleteProduct} color="primary" autoFocus>
                        Yes
                </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table className={classes.table} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Inventory</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell component="td" scope="row" align="right">
                                    {prod.name}
                                </TableCell>
                                <TableCell align="right">{prod.description}</TableCell>
                                <TableCell align="right">{prod.inventory}</TableCell>
                                <TableCell align="right">{prod.price}</TableCell>
                               
                                <TableCell align="left">
                                    <textarea disabled value={prod.image}></textarea>
                                 </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => { handleOpenEdit(prod) }}
                                    >
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => { handleOpenDeleteDialog(prod.id) }}
                                    >
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={products.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductManageList;

