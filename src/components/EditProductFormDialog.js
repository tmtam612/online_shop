import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";



function EditProductFormDialog(props) {

    console.log("edit props", props);

    const { edit, setEdit, onCloseEdit, onChangeEdit, products, setProducts } = props;

    const { product } = edit;

    // const handleChange = (event) => {
    //     setForm({ ...form, [event.target.id]: event.target.value });
    //     console.log(form)
    // }

    const editProductElement = (e) => {
        var tempProd = products.map(item => {
            if (item.id == e.id) {
                item = e;
            }
            return item;
        });

        console.log(tempProd);

        setProducts(tempProd);
    }

    const handleEditProduct = () => {
        // axios({
            //     method: 'post',
            //     url: 'http://127.0.0.1:8000/api/products/' + "2",
            //     data: dataForm,
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         }
            // })
        const dataForm = product;
        const items = dataForm.image.split('\\');
        if (items.length > 0)
            dataForm.image = items[items.length - 1];

        axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/products/' + dataForm.id,
            data: JSON.parse(JSON.stringify(dataForm)),
        })
            .then(function (response) {
                console.log("Edit response", response);
                editProductElement(response.data);
                onCloseEdit();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Dialog open={edit.open} onClose={onCloseEdit} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add 1 more product.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={product.name}
                        onChange={onChangeEdit} />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        value={product.description}
                        onChange={onChangeEdit}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        value={product.price}
                        onChange={onChangeEdit}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="inventory"
                        label="Inventory"
                        type="number"
                        value={product.inventory}
                        onChange={onChangeEdit}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="image"
                        label="Image"
                        type="file"
                        onChange={onChangeEdit}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditProduct} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default EditProductFormDialog;

