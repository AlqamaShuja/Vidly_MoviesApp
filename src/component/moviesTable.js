import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';


class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content: movie=> <Link to={`/movies/${movie._id}`}>{ movie.title}</Link>},
        { path: 'genre.name', label: 'Genre'},
        { path: 'numberInStock', label: 'Stock'},
        { path: 'dailyRentalRate', label: 'Rate'},
        { key: 'Like', 
          content: movie => <Like FillOrEmpty={()=> this.props.FillOrEmpty(movie)} OppositeFillOrEmpty={()=>this.props.OppositeFillOrEmpty(movie)} />
        },
        { key:'delete', 
          content: movie => <button className="btn btn-danger btn-sm" onClick={()=> this.props.handleDelete(movie)}> Delete </button> 
        },
    ];
    

    render() { 
        const { movies, onSort, sortColumn } = this.props;

    return ( 
        <Table columns={this.columns} data={movies} onSort={onSort} sortColumn={sortColumn} />
     );
    }
}



export default MoviesTable;