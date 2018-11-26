import React from 'react';
import '../App.css';

class Questionslist extends React.Component {


    goToQuestion = (index) => {
        this.props.question(index);
    }

    render() {
        const { allQuestions, activeIndex } = this.props;
        return (
            <div className='questions_list'>
                {allQuestions.map((questions, index) => {
                    const className = activeIndex === index ? 'red' : 'individual'
                    return (
                        <span onClick={() => this.goToQuestion(index)} className={className} key={index}>{index + 1}</span>
                    )
                })}
            </div>
        )
    }
}

export default Questionslist;