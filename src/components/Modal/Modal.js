import React, { useState, useEffect } from 'react'
import * as axios from 'axios'
import styles from './Modal.module.css'
import { NavLink } from "react-router-dom";

const Modal = (props) => {

    const [imageURL, setImageURL] = useState()
    const [comments, setComments] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [newComment, setNewComment] = useState({ name: '', text: '' })

    const imageId = props.match.params.imageId

    useEffect(() => {

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

        if (!newComment.name || !newComment.text) return

        let newCommentId = 0
        if (comments.length) newCommentId = comments[comments.length - 1].id + 1

        setNewComment({ ...newComment, id: newCommentId })



        axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, newComment)

        // отображаем добавление комментария, даже если он не добавляется на сервер
        setComments([...comments, newComment])

        setNewComment({name: '', text: ''})
    }

    window.addEventListener("keydown", function (event) {
        if (event.keyCode == 27) {
            event.preventDefault()
            window.history.back();
        }
    })

    return (
        <div className={styles.modal} onClick={() => window.history.back()}>
            {
                isLoaded ?
                    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                        <NavLink to='/' className={styles.close}>&#215;</NavLink>
                        <div className={styles.photoAndComments}>
                            <img src={imageURL} />
                            <div className={styles.comments}>
                                {
                                    comments.map(comment =>
                                        <div key={comment.id} className={styles.comment}>
                                            <div className={styles.date}>18.12.2019</div>
                                            <div>{comment.text}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                value={newComment.name}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="text"
                                placeholder="Ваш комментарий"
                                value={newComment.text}
                                onChange={handleInputChange}
                            />
                            <button>Оставить комментарий</button>
                        </form>
                    </div> : <div className={styles.loading}>Загрузка...</div>
            }


        </div>
    )
}

export default Modal