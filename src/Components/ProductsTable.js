import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

function ProductsTable(props) {
    const { product, index } = props;
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td><img src={product.image} alt='...' style={{ width: '40px', height: '30px' }} /></td>
            <div style={{ paddingTop: '15px' }}>
                <Link to={'/product/' + product._id} style={{ color: 'black' }}>{product.name}</Link>
            </div>
            <td>${product.price}</td>
            <td>
                <div className="btn-group" role="group" aria-label="...">
                    <Link to={'/updateproduct/'+product._id} className="btn btn-success"> <EditIcon /></Link>
                    <button onClick={() => props.handleDelete(product._id, index)} type="button" className="btn btn-danger"> <DeleteIcon /></button>
                </div>
            </td>
        </tr>
    )
}

export default ProductsTable
