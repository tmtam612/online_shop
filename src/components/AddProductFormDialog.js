import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {useDispatch} from "react-redux";
import {getListProducts} from '../actions/index';



function AddProductFormDialog(props) {

    const dispatch = useDispatch();
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
    }

    const handleAddProduct = () => {

        var dataForm = form;
        const items = dataForm.image.split('\\');
        if (items.length > 0)
            dataForm.image = items[items.length - 1];
        dataForm = JSON.parse(JSON.stringify(dataForm));

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/products',
            data: dataForm,
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
            });

    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{ backgroundColor: "#8bc34a", float: "right" }}
            >
                <i className="fa fa-plus" aria-hidden="true"></i>
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
                        onChange={handleChange}
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

