import React, {useState, useEffect} from 'react'
import * as axios from 'axios'
import styles from './Gallery.module.css'
import { NavLink } from "react-router-dom";

const Gallery = () => {

    const [images, setImages] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    

    useEffect(() => {
        axios.get('https://boiling-refuge-66454.herokuapp.com/images')
            .then(response => {
                setImages(response.data)
                setLoaded(true)
            })
    }, [])

    return (
        <div>
            <h1>Test App</h1>
            <div className={styles.images}>
                {
                    isLoaded? images.map(image =>
                        <NavLink to={`/${image.id}`} params={{ imageId: image.id }} key={image.id}>
                            <img src={image.url} key={image.id} data-index={image.id} />
                        </NavLink> 
                    ) : <div className={styles.loading}>Загрузка...</div>
                }
            </div>
        </div>
    ) 
}

export default Gallery