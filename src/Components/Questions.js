import React from 'react';
import axios from 'axios';
import Timer from './Timer';
import QuestionTitle from './QuestionTitle';
import Answer from './Answers';
import NextPrev from './NextPrev';
import Progress from './Progress';
import QuestionList from './QuestionsList';
import '../App.css';
import Loader from './loader/Loader';

class Questions extends React.Component {

    state = {
        questionData: [],
        progress: 0,
        endExam: false,
        score: 0,
        usersAnswers: [],
        correctQuest: '',
        wrongQuest: '',
        emptySubmit: '',
        addStyle: {
            display: ''
        },
        activeIndex: 0,
        loading: true
    }

    componentDidMount() {
        axios.get('http://localhost:5000/questions/quest')
            .then(res => {
                // console.log(res);
                this.setState({
                    questionData: res.data.message,
                    loading: false
                })
            });
    }

    confirmAnswer = (index) => {
        const questionId = this.state.questionData[this.state.progress]._id
        let q = this.state.usersAnswers.findIndex(x => x.questionNo === this.state.progress + 1);
        if (q < 0) {
            this.setState(prevState => Object.assign(prevState, { usersAnswers: prevState.usersAnswers.concat({ questionNo: this.state.progress + 1, questionId: questionId, answers: index }) }))
        } else {
            var newAnswers = Object.assign([], this.state.usersAnswers);
            newAnswers.splice(q, 1, { questionNo: this.state.progress + 1, questionId: questionId, answers: index });
            this.setState(prevState => Object.assign(prevState, { usersAnswers: newAnswers }));
        }
    }

    next = () => {
        const newProgress = this.state.progress + 1;
        this.setState({
            progress: newProgress,
            activeIndex: newProgress
        });
        if (this.state.progress + 1 === this.state.questionData.length) {
            this.setState({
                progress: this.state.progress
            })
        }
    }
    prev = () => {
        const newProgress = this.state.progress - 1;
        this.setState({
            progress: newProgress,
            activeIndex: newProgress
        })
        if (this.state.progress < 1) {
            this.setState({
                progress: 0
            })
        }
    }

    endExam = () => {
        const data = {
            usersAnswers: this.state.usersAnswers
        }
        axios.post('http://localhost:5000/questions/submit', data).then(res => {
            // console.log(res);
            this.setState({
                addStyle: {
                    display: 'none'
                },
                endExam: true,
                correctQuest: res.data.yourCorrect,
                wrongQuest: res.data.yourWrong,
                emptySubmit: res.data.message,
                progress: this.state.questionData.length + 1
            })
        })
    }

    question = (index) => {
        this.setState({
            progress: index,
            activeIndex: index
        })
    }

    render() {
        const { questionData, progress, endExam, usersAnswers, correctQuest, wrongQuest, emptySubmit, addStyle, activeIndex } = this.state;
        const currentQuestion = questionData[progress];
        const put = {
            padding: '0px 60px 0px 70px'
        }
        // console.log(this.state.usersAnswers)
        const { loading } = this.state;
        if (!endExam) {
            return (
                <div>
                    {
                    loading &&
                    <Loader />
                }
                    {
                        questionData.length > 0
                            ?
                            <div style={addStyle}>
                                <Timer question={questionData.length} progress={progress} timerEnd={this.endExam}/>
                                <Progress
                                    totalQuestions={questionData.length}
                                    currentQuestion={progress}
                                />

                                <div className='row'>
                                    <div className='col-md-8 big' style={put}>

                                        <QuestionTitle
                                            currentQuestion={currentQuestion}
                                        />
                                        <Answer
                                            currentQuestion={currentQuestion}
                                            confirmAnswer={this.confirmAnswer}
                                            progress={progress}
                                            usersAnswers={usersAnswers}
                                        />

                                        <NextPrev
                                            next={this.next}
                                            prev={this.prev}
                                            endExam={this.endExam}
                                            progress={progress}
                                            totalQuestions={questionData.length}
                                        />
                                    </div>
                                    <div className='col-md-4 small'>
                                        hfhfh
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 large'>
                                        <QuestionList
                                            allQuestions={questionData}
                                            question={this.question}
                                            progress={progress}
                                            activeIndex={activeIndex}
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            )
        } else {
            if (emptySubmit && emptySubmit.length > 1) {
                return (
                    <div>
                        {emptySubmit}
                    </div>
                )
            } else {
                return (
                    <div>
                        <div>Your score: {correctQuest.length} / {questionData.length}</div><br />
                        <div><button>Your missed: {wrongQuest.length}</button></div> <br />
                        {/* {{wrongQuest}.map((wrong, index) => {
                            <p key={index}>{wrong.heading}</p>
                        })} */}
                        You skipped:
                    </div>
                )
            }
        }
    }
}

export default Questions;