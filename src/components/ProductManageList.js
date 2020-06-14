import React from 'react';
import AddProductFormDialog from './AddProductFormDialog';
import EditProductFormDialog from './EditProductFormDialog';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

    console.log("alooo", props);

    const { products, setProducts } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [edit, setEdit] = React.useState({
        open: false,
        product: {},
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenEdit = prod => {
        setEdit({
            open: true,
            product: prod,
        })

    }

    const handleCloseEdit = () => {
        setEdit({
            ...edit,
            open: false,
        })
    }

    const handleChangeEdit = (event) => {
        setEdit({
            ...edit,
            product: {
                ...edit.product,
                [event.target.id]: event.target.value,
            }
        })

        console.log("after edit", edit);
    }

    const handleDeleteProduct = (id) => {
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/products/' + id,
        }).then(function (response) {
            const array = products.filter(item => item.id != id);
            setProducts(array);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <AddProductFormDialog products={products} setProducts={setProducts} />
            <EditProductFormDialog products={products} setProducts={setProducts} edit={edit} setEdit={setEdit} onCloseEdit={handleCloseEdit} onChangeEdit={handleChangeEdit} />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Inventory</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Rating</TableCell>
                            <TableCell align="left">Image</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell component="td" scope="row">
                                    {prod.name}
                                </TableCell>
                                <TableCell align="right">{prod.description}</TableCell>
                                <TableCell align="right">{prod.inventory}</TableCell>
                                <TableCell align="right">{prod.price}</TableCell>
                                <TableCell align="right">{prod.rating}</TableCell>
                                <TableCell align="left">
                                    <textarea disabled>{prod.image}</textarea>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        onClick={() => { handleOpenEdit(prod) }}
                                    >
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => { handleDeleteProduct(prod.id) }}
                                    >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductManageList;

