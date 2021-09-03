import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

function Signin(){
    const emailRef = useRef();
    const passwordRef = useRef(); 
    const { signin } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
            // signin(emailRef.current.value, passwordRef.current.value).then(()=>{
            //     history.push('/')
            // }).catch((error) => {
            //     setError(error.message)
            // })
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        }catch{
            setError('Faild to server')
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
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
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Login In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Create an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Signin;