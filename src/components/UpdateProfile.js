import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

function UpdateProfile(){
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const confirmPasswordRef = useRef(); 
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Password do not match')
        }
        setError('')
        setLoading(true)
        const promise = []
        if(emailRef.current.value !== currentUser.email){
            promise.push(updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promise.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promise).then(() => {
            history.push('/')
        }).catch (() => {
            setError('Faild to update account')
        }).finally(() => {
            setLoading(false)
        })
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password confirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Update</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center"><Link to="/">Dashboard</Link></div>
            </Card>
        </>
    )
}

export default UpdateProfile;