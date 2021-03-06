import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../actions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import schema from "../yup_schema";
import { fetchFail } from "../actions";



const initialForm = {
    username: '',
    password: '',
    email: ''
}


const LoginForm = ({ fetching, error, dispatch}) => {
    const [form, setForm] = useState(initialForm)
    // const [error, setError] = useState('')
    const { push } = useHistory()

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    }

    const handleSubmit = e => {
        e.preventDefault()
        schema.validate(form)
        .then(() => {
            console.log('validated')
            dispatch(login(form))
        })
        .catch(err => {
            // setError(err[0])
            // dispatch(fetchFail(err))
        })
        
        
    }
    if(window.localStorage.getItem('login')){
        push('/weather')
    }
    if(fetching){
        return (
            <>
            Loading....
            </>
        )
    }

    return (
        <>
        <form>
            <h3>{error.toUpperCase()}</h3>
            <div className="formItem">
                <label htmlFor="username">User Name:</label>
                <input 
                    onChange={handleChange}
                    value={form.username}
                    id='username'
                    name='username'
                    placeholder="User Name"
                />
            </div>
            <div className="formItem">
                <label htmlFor="password">Password:</label>
                <input 
                    onChange={handleChange}
                    value={form.password}
                    id='password'
                    name='password'
                    type={'password'}
                    placeholder="Password"
                />
            </div>
            <div className="formItem">
                <label htmlFor="email">Email:</label>
                <input 
                    onChange={handleChange}
                    value={form.email}
                    id='email'
                    name='email'
                    type={'email'}
                    placeholder="Email"
                />
            </div>
            <button onClick={handleSubmit}>Submit</button><br></br>
            <Link to='/register'>Register here</Link>
        </form>
        </>
    )
}

const mapState = state => {
    return {
        loggedIn: state.loggedIn,
        error: state.error,
        fetching: state.fetching
    }
}

export default connect(mapState)(LoginForm)