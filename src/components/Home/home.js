import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import { FirebaseContext} from '../Firebase';

const Home = (props) => {

    // firebase context
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');

    // for button
    useEffect(() => {
        // validate password
        if(password.length > 4 && email !== '') {
            setBtn(true);
        } else if (btn) {
            setBtn(false);
        }
    }, [password, email])

    //  const handleEmail = e => {
    //     setEmail(e.target.value);
    //   }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(email, password)
        firebase.loginUser(email, password).then(user =>{
            setEmail('');
            setPassword('');
            props.history.push('/welcom'); 
        })
        .catch(error =>{
            setError(error);
            setEmail('');
            setPassword('');
        });
    }

    return (
        <div className="home container-fluid">
            <div className="grid">
                 <div className="row d-flex justify-content-center">
                     <div className="col-12 d-flex justify-content-between" style={{marginTop: '23px'}}>
                        <div className="col-2 " style={{marginTop: '93px'}}>
                            <Link to="/dashboard" width="3px" class="btn btn-dark btn-block">
                                    Dashboard
                            </Link>
                        </div>
                        <div className="col-2 " style={{marginTop: '93px'}}>
                            <Link to="/signup" width="3px" class="btn btn-dark btn-block">
                                    S'inscrire
                            </Link>
                        </div>
                     </div>
                     <div className="col-4 bg-primary rounded p-4 text-white" style={{marginTop: '103px'}}>
                        <form onSubmit={handleSubmit}>

                            {
                                error !== '' && <span className="bg-danger text-white p-2">{error.message}</span>
                            }

                            <div class="form-outline mb-4">
                                <h2>Connexion</h2>
                            </div>

                            <div class="form-outline mb-4">
                                 <label class="form-label" for="email">Email</label>
                                <input type="email" onChange={e => {setEmail(e.target.value)}} value={ email } required class="form-control"/>
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="password">Mot de passe</label>
                                <input type="password" onChange={e => {setPassword(e.target.value)}} value={ password } class="form-control" />
                            </div>     
                                 
                            {
                               btn ?  <button class="btn btn-dark btn-block">Se connecter</button> : 
                               <button disabled class="btn btn-dark btn-block">Se connecter</button> 
                            }

                            
                           <div class="row mt-4">
                                <div class="col d-flex justify-content-end">
                                    <a>Mot de pass oublié ?</a>
                                </div>
                            </div>
                        </form>
                     </div>
                 </div>
            </div>
            
        </div>
    )
}

export default Home
