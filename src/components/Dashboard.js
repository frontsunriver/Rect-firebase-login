import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
function Dashboard(){
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogOut(){
        try{
            setError('')
            await logout()
            history.push('/login')
        } catch {
            setError('Server Error')
        }
    }
    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="w-100 text-center mt-3 mb-3"><strong>Email:</strong>{currentUser.email}</div>
                    <Link to="/update_profile" className="btn btn-primary w-100 text-center">Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-3">
                <Button variant="link" onClick={handleLogOut}>Log Out</Button>
            </div>
        </>
    )
}

export default Dashboard