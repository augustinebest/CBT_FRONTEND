import React from 'react';
import '../App.css';

class Answer extends React.Component {

    handleCheck = (index) => {
        this.props.confirmAnswer(index);
    }
    render() {
        const { currentQuestion, progress } = this.props;
        const answers = currentQuestion.answers;
        let questionNo = progress + 1;
        let currentAnswer = this.props.usersAnswers.find(answer => answer.questionNo === questionNo);
        // console.log(questionNo);
        return (
            <div className='answers'>
                {answers.map((answer, index) => {
                    return (
                        <div className='list' key={index}>
                            <input
                                type='radio'
                                name={`ans${questionNo}${index}`}
                                id={`ans${questionNo}${index}`}
                                onChange={() => this.handleCheck(index)}
                                checked={currentAnswer && currentAnswer.answers === index ? true : false}
                            />
                            &nbsp; &nbsp;{answer}
                        </div>
                    )
                })}
            </div>
        )
    }
}
  
export default Answer;