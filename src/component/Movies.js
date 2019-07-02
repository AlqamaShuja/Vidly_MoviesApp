import React, { Component } from 'react';
import {Link, } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieSevice';
import { toast } from 'react-toastify';
import Pagination from './common/pagination';
import {paginate } from '../utils/paginate'
import ListGroup from './common/listGroup';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import SearchBox from './searchBox'


class Movies extends Component {
    state = { 
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        searchQuery: "",
        selectedGenre: "",
        sortColumn: { path: 'title', order: 'acs'},
    };

    async componentDidMount(){
        const { data } = await getGenres();
        const genres = [{ _id:"", name: 'All Genres'}, ...data ];

        const { data: movies } = await getMovies();
        this.setState({
            movies,
            genres,
        });
    }

    handleDelete= async movie => {
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({
            movies
        });
        try{
            await deleteMovie(movie._id)
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                toast.error('This movie has already been deleted.')
                this.setState({ movies: originalMovies })
            }
        }
    }
    OppositeFillOrEmpty=(movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]}
        movies[index].liked = !(movies[index].liked);
        this.setState({
            movies
        })
    }
    FillOrEmpty(movie){
        if( movie.liked === false )  return "fa fa-heart-o"
        return "fa fa-heart";
    }

    handlePageChange=(page)=>{
        this.setState({
            currentPage: page
        });
    }

    handleGenreSelect = genre =>{
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: "",
        });
    }

    handleSort= sortColumn =>{
        this.setState({
            sortColumn
        });
    }

    getPageData = () =>{

        const {pageSize, currentPage, movies: allMovies, searchQuery , selectedGenre, sortColumn } = this.state;

        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m=> 
                    m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
        else if(selectedGenre && selectedGenre._id)
             filtered = allMovies.filter(m=> m.genre._id === selectedGenre._id)   

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data : movies }
    }

    handleSearch = (query) =>{
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1,
        })
    }

    render() { 

        const count = this.state.movies.length;
        if(count === 0) 
            return <h5> There is no movie in DataBase </h5>
        
        const {totalCount, data: movies} = this.getPageData();

        const {pageSize, currentPage,  sortColumn, searchQuery } = this.state;

        

        return ( 
            <div className="row">
                <div className="col-2 m-5">
                    <ListGroup 
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">

                    <div>
                        <Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 20 }}> New Movies </Link>
                    </div>
                    <h4>There are { totalCount } movies in Data Base</h4>

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    
                    <MoviesTable movies={movies} 
                                 FillOrEmpty={this.FillOrEmpty}
                                 OppositeFillOrEmpty={this.OppositeFillOrEmpty}
                                 sortColumn={sortColumn}
                                 onSort={this.handleSort}
                                 handleDelete={this.handleDelete} />

                    <Pagination itemCount={totalCount}
                                pageSize={pageSize}
                                onPageChange={this.handlePageChange}
                                currentPage={currentPage}
                                />
                </div>
                
            </div>
         );
    }
}
 
export default Movies;