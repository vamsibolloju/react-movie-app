import { useEffect, useState } from "react"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    marginBottom: '2rem'
  }));

export default function Hot(){
    const [ hotMovies, setHotMovies ] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
                method: "GET",
                headers: {
                  "Accept": "application/json",
                  "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNmODA5Yzk2ZTQzMDdhMDAwNDg0ZWZjYzUzNWQ0ZSIsInN1YiI6IjY0YzRkNmFmOTVjZTI0MDBlNDEwOWI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fi3lvYA_wchcMsWEJ3GaAVxrYfaPEhqbkHQfLoP8nvs"
                },
        }).then(
            async (response) => {
                const hotMovies = [];
                const body = await response.json();
                console.log(body.results);
                let row = [];
                body.results.forEach(movie => {
                    row.push(movie);
                    if(row.length === 5){
                        hotMovies.push(row);
                        row = [];
                    }
                })
                setHotMovies(hotMovies);
            }
        )
    }, []);
    return (
        <div>
            {hotMovies.map((row, ind) => (
              <Grid justifyContent="center" key={ind} container spacing={2}>
                {
                row.map((item) => (<Grid item xs={12} sm={12} md={2} key={item.id}>  
                        <Item>
                            <img  style={ { marginBottom: '10px', width: '100%', maxWidth: '30rem' } } src={ 'https://image.tmdb.org/t/p/w342' + item.poster_path } alt="poster"  />
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', padding: '1px' }}> 
                                {item.title} 
                            </p>
                            <Rating precision={0.1} size="small" name="customized-10" defaultValue={item.vote_average} max={10} />
                            <p style={ { fontWeight: 'bold', paddingBottom: '10px' } } > 
                                {item.vote_average} / 10 
                            </p>
                        </Item>
                </Grid>))
                }
              </Grid>  
            ))}
        
        
        </div>
    )
}


/*
<Grid container spacing={10}>
            {hotMovies.map((row, ind) => (
                row.map((item) => (<Grid item xs={12} md={2} key={ind}>  
                    <div style={{ fontWeight: "700", textTransform: "capitalize" }}>
                        hello
                    </div>
                </Grid>))            
            ))}
        </Grid>
*/