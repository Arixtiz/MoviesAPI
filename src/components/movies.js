import React from "react";
//import Header from "../template/Header";
import { Container, Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import { useEffect , useState} from "react";
import { APIurlMovies, APIurlImage, APIurlMovie } from "../services/apirest";
import axios from "axios";
import MovieCard from "../template/MovieCard";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import Error404  from "../template/404NotFound";


function Movie(){

    const urlMovie = APIurlMovie;
    const [page,setPage] = useState(1);
    const urlMovies = APIurlMovies;
    const [search,setSearch] = useState(false);
    const [disable, setDisable] = useState(false);

    const handlePage=async(e)=>{ 
            if(page<=1){
                setPage(1);
                setDisable(true);
            }else if(page > 1){
                setDisable(false);
            }

            e.preventDefault();     
            await fetchMovies(page);
           
    };

    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [credits,setCredits] = useState([]);

    const fetchMovies = async (p,searchKey) => {
        const type = searchKey ? "search" : "discover"
        const {data: {results} }= await axios.get(`${urlMovies}/${type}/movie`, {
            params: {
                api_key: 'cb884ce9e20e0c70613da1c3bf1037a3',
                language: 'es-ES',
                page: p.toString(),
                query: searchKey,
                append_to_response: 'casting'
            }
        })
        setMovies(results);
    }

    const searchMovies = async(e)=>{
        setSearch(true)
        e.preventDefault();
        let p = 1;
        fetchMovies(p,searchKey);
    }
    
    useEffect( () => {
        handlePage();
        if(search == true){
            fetchMovies(page,searchKey)
        }else{
            fetchMovies(page)
        }  
    }, [])

  
    return(
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark" width="max">
                <Container fluid>
                    <Navbar.Brand href='/'>MoviesAPI</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll'>  </Navbar.Toggle>
                    <NavbarCollapse id='navbarScroll'>
                        <NavbarCollapse></NavbarCollapse>
                        <Nav className='me-auto my-2 my-lg-3'
                        style={{maxHeight:'100px'}}
                        navbarScroll></Nav>
                        <Form className="d-flex" onSubmit={searchMovies}>
                            <input placeholder='Buscar Pelicula' arial-label='search' className='me-2' type="text" onChange={(e)=> setSearchKey(e.target.value)}></input>
                            <Button variant='secondary' type={'submit'}>Buscar</Button>
                        </Form>
                    </NavbarCollapse>
                </Container>
            </Navbar>

            {movies.length>0 ?(<div className="container">
                <div className="grid">
                    {movies.map((movie)=> <MovieCard key={movie.id} {...movie} />)};
                </div>     
            </div>):(<   Error404 />
            )}
            
            {movies.length>0 && search==false ? (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <Form className="d-flex" onSubmit={handlePage}>

                            <li><Button variant='secondary' disabled={disable} type={'submit'} onClick={(e)=> setPage(page-1)}>Previous</Button></li>
                            <div variant='secondary' className="container justify-content-center">
                            <li margin="10px"><p>{page}</p></li>
                            </div>
                            <li><Button variant='secondary' type={'submit'} onClick={(e)=> setPage(page+1)}>Next</Button></li>
                        </Form>
                        </ul>
                </nav>
            </div>
            ) : (<h1></h1>)}
            
        </React.Fragment>
        
    );
}
 export default Movie;