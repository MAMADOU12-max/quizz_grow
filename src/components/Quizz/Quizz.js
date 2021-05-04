 import React, { Component } from 'react'
 import { QuizzGrow} from '../quizzGrow/'
 export class Quizz extends Component {

     // constructor(props) {
         // super(props)
         // this.state = initialState;
         // this.storedDataRef = React.createRef();
     // }

     state = {
         levelNames: ["general"],
         question: null,
         options: [],
         maxQuestions: 10,
         storedQuestions: [],
         idQuestion: 0,
         btnDisabled: true,
         userAnswer: null,
         score: 0
     }

     storedDataRef = React.createRef();

     loadQuestions = level => {
          const fetchedArrayQuiz = QuizzGrow[0].quizz["general"];
         console.log(fetchedArrayQuiz)

          if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

             this.storedDataRef.current = fetchedArrayQuiz;
            console.log(this.storedDataRef.current)

            // hide answer from console log
             const newArray = fetchedArrayQuiz.map( ({ answer, ...keepRest}) => keepRest);

               this.setState({ storedQuestions: newArray })

           } else {
               console.log('not enought!!');
           }
     }

     componentDidMount() {
         this.loadQuestions(this.state.levelNames[0]);
     }


      componentDidUpdate(prevProps, prevState) {
          if (this.state.storedQuestions !== prevState.storedQuestions) {
            
            this.setState({
                   question: this.state.storedQuestions[this.state.idQuestion].question,
                   options: this.state.storedQuestions[this.state.idQuestion].options
              })
            
          }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

 }


 nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {

        const finish = `Game Over, vous avez ${this.state.score} points /10`;
        alert(`Game Over, vous avez ${this.state.score} points /10`);

    } else {
        this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if (this.state.userAnswer === goodAnswer) {
        this.setState(prevState => ({ 
            score: prevState.score + 1
        }))
    }

}

 submitAnswer = selectedAnswer => {
     // console.log('cooll')
    this.setState({
        userAnswer: selectedAnswer,
        btnDisabled: false
    })
 }


 render() {

        const displayOptions = this.state.options.map((option, index) =>{
            return(<p className={`answerOptions ${this.state.userAnswer  === option ? "selected": null}`} onClick={() => {this.submitAnswer(option)}}>{option}</p>)
        })
         
         return (
              <div>
                 <h2>{this.state.question}</h2>

                    {displayOptions}

                    <button disabled={this.state.btnDisabled} onClick={this.nextQuestion} className="btn btn-dark">Suivant</button>

             </div>
         )
     }
 }

 export default Quizz
  
