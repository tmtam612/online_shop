import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import {useDispatch} from "react-redux";
import {getListProducts} from '../actions/index';



function AddProductFormDialog(props) {

    const dispatch = useDispatch();
    const { products, setProducts , onCheckPropertiesEmpty } = props;

    const defaultFormAddValue = {
        name: '',
        image: '',
        description: '',
        price: '',
        inventory: '',
    }

    const defaultFormState = {
        status : 'info',
        text: 'Add 1 more Product'
    }

    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState(defaultFormAddValue);
    const [formState, setFormState] = React.useState(defaultFormState)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(defaultFormAddValue);
        setFormState(defaultFormState);
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value });
    }

    const onFileChange = (event)  => { 
        // Update the state 
        setForm({ ...form, [event.target.id]: event.target.files[0]});
    };

    const handleAddProduct = () => {

        if (onCheckPropertiesEmpty(form)) {
            var dataForm = new FormData();

            for (var key in form) {
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
                    handleClose();
                    setProducts([...products, response.data]);
                    axios.get("http://127.0.0.1:8000/api/products/")
                    .then((response) => { 
                        dispatch(getListProducts(response.data));
                    }).catch((err) => console.log('err', err));
                })
                .catch(function (error) {
                    setFormState({
                        status: 'error',
                        text: 'Failed to add product !\nPlease try again .'
                    })
                });
        } else {
            setFormState({
                status: 'error',
                text: 'Please fill in required field'
            })
        }

    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{ backgroundColor: "#8bc34a", float: "right" }}
            >
                <i className="fa fa-plus" aria-hidden="true"></i>Add
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity={formState.status}>
                            {formState.text}
                        </Alert>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        value={form.name}
                        onChange={handleChange} />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        required
                        value={form.description}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        required
                        value={form.price}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="inventory"
                        label="Inventory"
                        type="number"
                        required
                        value={form.inventory}
                        onChange={handleChange}
                        fullWidth />
                    <TextField
                        margin="dense"
                        id="image"
                        label="Image"
                        type="file"
                        required
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

