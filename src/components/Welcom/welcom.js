import React from 'react'
import Quizz from '../Quizz/Quizz'

const welcom = () => {
    return (
        <div className="home container-fluid">
            <div className="grid">
                <div className="row d-flex justify-content-center">
                    <div className="col-4 bg-primary rounded p-4 text-white" style={{marginTop: '193px'}}>
                         <p>welcom</p>
                         <Quizz/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default welcom
