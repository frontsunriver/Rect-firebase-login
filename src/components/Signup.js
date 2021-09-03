import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"


function Signup(){
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const confirmPasswordRef = useRef();
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Password do not match')
        }
        try{
            setError('')
            setLoading(true)
            signup(emailRef.current.value, passwordRef.current.value).then(()=>{
                history.push('login')
            }).catch((error) => {
                setError(error.message)
            })
        }catch{
            setError('Faild to server')
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Sign up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login In</Link>
            </div>
        </>
    )
}

export default Signup;