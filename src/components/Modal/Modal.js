import React, { useState, useEffect } from 'react'
import * as axios from 'axios'
import styles from './Modal.module.css'
import { NavLink } from "react-router-dom";

const Modal = (props) => {

    const [imageURL, setImageURL] = useState()
    const [comments, setComments] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [newComment, setNewComment] = useState()

    useEffect(() => {

        const imageId = props.match.params.imageId

        axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`)
            .then(response => {
                setImageURL(response.data.url)
                setComments(response.data.comments)
                setLoaded(true)
            })
    }, [])

    const handleInputChange = event => {
        const { name, value } = event.target

        setNewComment({ ...newComment, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (!newComment.name || !newComment.comment) return

        let newCommentId = 0
        if (comments.length) newCommentId = comments[comments.length - 1].id + 1
        
        setNewComment({ ...newComment, id: newCommentId })
        console.log(newCommentId)

        axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${props.match.params.imageId}/comments`, newComment)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(newComment)
            })
    }

    return (
        <div className={styles.modal}>
            {
                isLoaded ?
                    <div className={styles.content}>
                        <NavLink to='/' className={styles.close}>&#215;</NavLink>
                        <div className={styles.photoAndComments}>
                            <img src={imageURL} />
                            <div className={styles.comments}>
                                {
                                    comments.map(comment =>
                                        <div key={comment.id}>{comment.text}</div>
                                    )
                                }
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="comment"
                                placeholder="Ваш комментарий"
                                onChange={handleInputChange}
                            />
                            <button>Оставить комментарий</button>
                        </form>
                    </div> : <div>Загрузка...</div>
            }


        </div>
    )
}

export default Modal