import React from 'react';
import { useState, useEffect } from 'react';

const PokemonImage = ( props ) => {
    const {dexNum} = props
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}`);
                const data = await response.json();
                const url = data.sprites?.front_default;
                setImageUrl(url);
            } catch (err) {
                console.error(err);
            }
        };

        if (dexNum) {
            fetchImageUrl();
        }
    }, [dexNum]);

    return (
        imageUrl ? <img src= { imageUrl } alt = "pokemon" /> : null
    );
  };

  export default PokemonImage;
