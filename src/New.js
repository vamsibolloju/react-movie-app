import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography, CardMedia } from '@mui/material'

export default function New(props){
    const [ newMoviews, setNewMoviews ] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=c03f809c96e4307a000484efcc535d4e').then(
            async (response) => {
                console.log(response)
                const body = await response.json();
                setNewMoviews(body.results);
            }
        )
    }, []);
    
    return (      
        <div>   
            <Carousel
                indicatorContainerProps={{
                    style: {
                        marginTop: '20px',
                    }
                    
                }}
            >
                {
                    newMoviews.map( (item, i) => <Item key={i} item={item} /> )
                }
            </Carousel>
        </div>
    )
}

function Item(props)
{
    return (
        <div> 
            <h1> New movies </h1>
        <Paper style={ { marginBottom: '20px', height: '500px' } }>
            <CardMedia
                    className="media"
                    image={ 'https://image.tmdb.org/t/p/w780' + props.item.backdrop_path }
                    title={props.item.title}
                >
                    <img alt="poster" class="poster" src={ 'https://image.tmdb.org/t/p/w342' + props.item.poster_path } />
                    <Typography className="media-caption">
                        {props.item.title}
                        <br />
                        <small> { props.item.overview } </small>
                    </Typography>
                </CardMedia>
        </Paper>
        </div>
    )
}
