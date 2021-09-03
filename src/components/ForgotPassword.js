import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"

function ForgotPassword(){
    const emailRef = useRef();
    const { resetpassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        
        try{
            setMessage('')
            setError('')
            setLoading(true)
            // signin(emailRef.current.value, passwordRef.current.value).then(()=>{
            //     history.push('/')
            // }).catch((error) => {
            //     setError(error.message)
            // })
            await resetpassword(emailRef.current.value)
            setMessage("check your email inbox")
        }catch{
            setError('Faild to reset password')
        }

        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">Rest</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center"><Link to="/login">Log In</Link></div>
            </Card>
            <div className="w-100 text-center mt-2">
                Create an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;