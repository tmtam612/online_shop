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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tdimage: {
        maxWidth: 100,
        maxHeight: 100,
        overflowX: "scroll",
    }
});



function AddProductFormDialog(props) {

    const { products, setProducts } = props;

    const defaultFormAddValue = {
        name: '',
        image: '',
        description: '',
        price: '',
        inventory: '',
    }

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(defaultFormAddValue);

    // React.useEffect(() => {
    //     // setForm({...form,});
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [form]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(defaultFormAddValue);
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value });
        console.log(form)
    }

    const onFileChange = (event)  => { 
        // Update the state 
        setForm({ ...form, [event.target.id]: event.target.files[0]});
        console.log(form)
    };

    const handleAddProduct = () => {
        var dataForm = new FormData();

        for ( var key in form ) {
            dataForm.append(key, form[key]);
        }

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/products',
            data: dataForm,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(function (response) {
                console.log("response",response);
                handleClose();
                setProducts([...products, response.data]);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{ backgroundColor: "#8bc34a", float: "right" }}
            >
                <i class="fa fa-plus" aria-hidden="true"></i>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        value={form.name}
                        onChange={handleChange} />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        value={form.description}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="inventory"
                        label="Inventory"
                        type="number"
                        value={form.inventory}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="image"
                        label="Image"
                        type="file"
                        // value={form.image}
                        onChange={onFileChange}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default AddProductFormDialog;

