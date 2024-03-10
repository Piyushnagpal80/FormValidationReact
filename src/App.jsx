import React, { useReducer, useState } from 'react'
import './App.css'

const App = () => {

    const initialState = {
        name: '',
        email: '',
        password: ''
    }

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const reducer = (state, action) => {
        if (action.type == 'name') {
            if (action.payload.length < 6) {
                setErrors({ ...errors, name: 'Name must be at least 6 characters' });
            }else{ // valid name store it
                return { ...state, name: action.payload };
            }
        } else if (action.type == 'email') {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload);
            if (!isValidEmail) {
                setErrors({ ...errors, email: 'Invalid email format' });
            }else{  // valid email store it
                return { ...state, email: action.payload };
            }
        } else if (action.type == 'password') {

            // Check for at least 1 capital letter, 1 small letter, 1 special character, and minimum length of 6
            const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(action.payload);

            if (!isValidPassword) {
                setErrors({ ...errors, password: 'password should contain at least 1 capital letter, 1 small letter, 1 special character, and should have minimum length of 6' });
            }else{
                //storing value of initialstate object's password key so that we can compare password and cpassword later
                return { ...state, password: action.payload };
            }
        } else if (action.type == 'cpassword') {
            if(state.password!== action.payload){
                setErrors({ ...errors, cpassword: `password doesn't match` })
            }else{
                displayData(state);
            }
        }
    }
    const displayData = (state)=>{
        console.log(state);
    }
    

    const [state, dispatch] = useReducer(reducer, initialState);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'name',
            payload: e.target.name.value
        })
        dispatch({
            type: 'email',
            payload: e.target.email.value
        })
        dispatch({
            type: 'password',
            payload: e.target.password.value
        })
        dispatch({
            type: 'cpassword',
            payload: e.target.cpassword.value
        })
    }

    return (
        <div id="form">
            <form onSubmit={handleSubmit}>
                <label for='name'>Name: </label>
                <input type='text' id='name' name='name' />
                <span>{errors.name}</span>

                <label for='email'>Email: </label>
                <input type='email' id='email' name='email' />
                <span>{errors.email}</span>

                <label for='password'>Password: </label>
                <input type='password' id='password' name='password' />
                <span>{errors.password}</span>

                <label for='cpassword'>Confirm Password: </label>
                <input type='password' id='cpassword' name='cpassword' />
                <span>{errors.cpassword}</span>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default App