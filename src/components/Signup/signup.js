import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase'

const Signup = (props) => {

    const firebase = useContext(FirebaseContext);
     // console.log(props);

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }    

    const [loginData, setLoginData] = useState(data);

    const [error, setError] = useState('')

    const handleChange = e => {
        // get and update value input
        setLoginData({...loginData, [e.target.id]: e.target.value});

    }

    const handleSubmit = e => {
        // evit rafraichissement page 
        e.preventDefault();
        const { email, password, pseudo } = loginData;
        firebase.signupUser(email, password)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(() =>{
            // clear data
            setLoginData({...data});
            // redirection dans react
            props.history.push('/welcom');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        });
    }


    // destructuring
    const { pseudo, email, password, confirmPassword} = loginData;

     // disabled button
     const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ? 
     <button disabled className="btn btn-dark btn-block mt-4">Se connecter</button> :  <button className="btn btn-dark btn-block mt-4">Se connecter</button> ;


     // gestion error 
    const errorMessage = error !== ''  && <span className="bg-danger text-white p-2">{error.message}</span>

    return (
        <div className="home">
            <div className="container">
                <div className="grid">
                    <div className="row ">
                        <div className="col-6" style={{marginTop: '123px'}}>
                            {/* <div className="col-2 " style={{marginTop: '93px'}}> */}
                                    {/* <Link to="/signup" width="3px" class="btn btn-dark btn-block">
                                            S'inscrire
                                    </Link> */}
                                {/* </div> */}
                                Photo Grow
                        </div>
                        <div className="col-6 bg-primary rounded p-4 text-white" style={{marginTop: '123px'}}>
                            <form onSubmit={handleSubmit}>
                                <div class="form-outline mb-4">
                                       <span>{errorMessage}</span>
                                </div>
                                <div class="form-outline mb-4">
                                       <h3 className="mb-4">Inscription</h3>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="pseudo">Nom d'utilisteur</label>
                                    <input  type="text" onChange={handleChange} value={ pseudo } id="pseudo" class="form-control" required autoComplete="on"/>
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="email">Email</label>
                                    <input type="email" onChange={handleChange} id="email" value={email} class="form-control" required autoComplete="on"/>
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="password">Mot de passe</label>
                                    <input type="password" onChange={handleChange} id="password" value={password} class="form-control" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="confirmPassword">Confirmez votre mot de passe</label>
                                    <input type="password" onChange={handleChange} id="confirmPassword" value={confirmPassword} class="form-control" />
                                </div>

                                <div class="form-outline mt-4">
                                    {btn}
                                </div>

                                <div class="row my-4 ">
                                    <Link to="/" class="col d-flex justify-content-end text-white">
                                        J'ai déjà un compte? Je me connecte
                                    </Link>
                                </div>

                               

                            </form>
                        </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default Signup
