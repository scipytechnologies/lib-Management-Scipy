import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './LoadingComponent.js';

const fineRate = 1;
let totalFine = 0;
const allowedDays = 14;



// const userInfo = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null;
// console.log(userInfo.role);

function RenderIssue({ issue, i, returnBook }) {
    let fine = 0;
    const dates = [];
    const today = new Date();
    dates.push(today);
    const issueDate = new Date(Date.parse(issue.createdAt));
    const deadline = new Date(Date.parse(issue.createdAt));
    if(issue.student.role == 'Teacher'){
    deadline.setDate(deadline.getDate() + 120);
    }
    else{
    deadline.setDate(deadline.getDate() + 14);
    }
    dates.push(deadline);
    // to get current date
     console.log("deadline",dates);
    const currentDate = Date.now()
    const todayDate = new Date(currentDate)
    const returnDate = issue.returned ? new Date(Date.parse((issue.updatedAt))) : (new Date(Math.min.apply(null, dates)));
    console.log(((returnDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)))
   
    

    function DaysNo(date1, date2) {
        // Get the timestamps for the two dates
        const timestamp1 = date1.getTime();
        const timestamp2 = date2.getTime();

        // Calculate the difference in timestamps, in milliseconds
        const difference = Math.abs(timestamp1 - timestamp2);

        // Convert the difference to days and return the result
        return Math.floor(difference / 86400000) + 1;
    }
    const daysBetweenIssuetoReturn = DaysNo(issueDate, returnDate);
    const daysBetweenReturntoToday = DaysNo(returnDate, todayDate);

    // console.log('D1 ' + daysBetweenIssuetoReturn)
    // console.log('D2 ' + daysBetweenReturntoToday)


    if (daysBetweenIssuetoReturn > allowedDays) { 
       if(issue.student.role == 'Teacher'){
        fine = "nil"
       }
       else{
        fine = daysBetweenReturntoToday * fineRate;
        totalFine = totalFine + fine
    }
    }

    
    



    return (
        <React.Fragment>
            <td>
                {i}
            </td>
            <td>
                <Link to={`/users/${issue.student._id}`}>
                    {issue.student.firstname + ' ' + issue.student.lastname}
                </Link>
            </td>
            <td>
                {issue.student.roll}
            </td>
            <td>
                {issue.book == null ? "N/A" : <Link to={`/books/${issue.book._id}`}>
                    {issue.book.name}
                </Link>}
            </td>
            <td>
                {issue.book == null ? "N/A" : issue.book.isbn}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(issue.createdAt)))}
            </td>
            <td>
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(deadline)}
            </td>
            <td>
                {
                    
                    fine
                }
            </td>    
            <td>
                <Button color="info" onClick={() => {
                    returnBook(issue._id);
                }}>Return</Button>
            </td>
        </React.Fragment>
    );
}

class Return extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.i = 1;
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        console.log(this.props.issues);
        if (this.props.issues.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.issues.errMess) {
            return (
                <div className="container loading">
                    <div className="row heading">
                        <div className="col-12">
                            <br /><br /><br /><br />
                            <h3>{this.props.errMess}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.props.issues.issues.length === 0) {
            return (
                <div className="container loading">
                    <div className="row heading">
                        <div className="col-12 text-center">
                            <br /><br /><br /><br />
                            <h4>{'All books have been returned.'}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            const dueIssues = this.props.issues.issues.filter((issue) => (!issue.returned && issue.student.role !== 'Teacher'));
            const dueteacher = this.props.issues.issues.filter((issue) => (!issue.returned && issue.student.role == 'Teacher'));
            // const dueTeacher = this.props.issues
            const liststudent = dueIssues.map((issue) => {
                return (
                    <tr key={issue._id}>
                        <RenderIssue issue={issue}
                            i={this.i++}
                            returnBook={this.props.returnIssue}
                        />
                    </tr>
                );
            });
            const list = dueteacher.map((issue) => {
                return (
                    <tr key={issue._id}>
                        <RenderIssue issue={issue}
                            i={this.i++}
                            returnBook={this.props.returnIssue}
                        />
                    </tr>
                );
            });

            return (

                <div className="container mt-6 text-center align-self-center full">
                    <div className="row text-center justify-content-center">
                        <div className="col-12 heading">
                            <h3>List of books not returned by Student</h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Name of Student</th>
                                        <th>ID</th>
                                        <th>Name of Book</th>
                                        <th>ISBN number</th>
                                        <th>Issue Date</th>
                                        <th>Return Deadline</th>
                                        <th>Fine (in Rs.)</th>
                                        <th>Return book</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liststudent}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="row text-center justify-content-center">
                        <div className="col-12 heading">
                            <h3>List of books not returned by Teacher</h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Name of Teacher</th>
                                        <th>ID</th>
                                        <th>Name of Book</th>
                                        <th>ISBN number</th>
                                        <th>Issue Date</th>
                                        <th>Return Deadline</th>
                                        <th>Fine (in Rs.)</th>
                                        <th>Return book</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default Return;