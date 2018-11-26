import React, { Fragment } from 'react';

class NextPrev extends React.Component {
    render() {
        const { next, prev, endExam, progress, totalQuestions } = this.props
        const style = {
            padding: '4px',
            width: '85px',
            marginTop: '40px',
            backgroundColor: 'rgba(100, 186, 223, 0.9)',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '3px',
            border: '1px solid #000',
            outline: 'none'
        }
        const pg = progress + 1;

        if (pg === 1) {
            return (
                <Fragment>
                    <div className='nextPrev'>
                        <button onClick={next} style={style}>next &nbsp;<i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></button>&nbsp;
                        <button onClick={endExam} style={style}>End exam</button>
                    </div>
                </Fragment>
            )
        }
        else if (pg === totalQuestions) {
            return (
                <Fragment>
                    <div className='nextPrev'>
                        <button onClick={prev} style={style}><i className="fa fa-angle-left"></i><i className="fa fa-angle-left"></i>&nbsp; prev</button>&nbsp;
                        <button onClick={endExam} style={style}>End exam</button>
                    </div>
                </Fragment>
            )

        }
        else if (pg > 1) {
            return (
                <div className='nextPrev'>
                    <button onClick={prev} style={style}><i className="fa fa-angle-left"></i><i className="fa fa-angle-left"></i>&nbsp; prev</button>&nbsp;
                    <button onClick={next} style={style}>next &nbsp;<i className="fa fa-angle-right"></i><i className="fa fa-angle-right"></i></button>&nbsp;
                    <button onClick={endExam} style={style}>End exam</button>
                </div>
            )
        }
    }
}

export default NextPrev;