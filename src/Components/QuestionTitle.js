import React from 'react';
import '../App.css';

const QuestionTitle = ({ currentQuestion }) => {
    const style1 = {
        paddingBottom: '160px'
    }
    return (
        <div>
            <span style={style1}>{currentQuestion.instruction}</span><br /><br />
            <span>{currentQuestion.heading}</span><br /><br />
        </div>
    );
}

export default QuestionTitle;