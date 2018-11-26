import React from 'react';

const Progress = ({currentQuestion, totalQuestions}) => {
    const style = {
        border: '1px solid #f00',
        marginLeft: '35px'
    }
    return (
        <div style={style}>
            Question {currentQuestion+1} of {totalQuestions}
        </div>
    )
}

export default Progress;