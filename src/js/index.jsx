// React
import React from 'react';
import ReactDOM from 'react-dom';

// native JS
import dateInputMask from './datePlug.js';
import autoHeight from './textAreaPlug.js';
import validateEmail from './validateEmail.js';

// Components
import ErrorMessage from './ErrorMessage.jsx'

// styles
import "./style.less";

// Main Component
class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            date: '',
            message: '',
            errorMessage: undefined,
        }

    };

    componentDidMount(){
        var input = document.querySelectorAll('.js-date')[0];
        dateInputMask(input);

        var textarea = document.querySelector('.auto-expanding');
        autoHeight(textarea);

    }

    handleDateChange(e){

        this.setState({
            date: e.target.value
        });

        let Year1900 = new Date(1900, 0, 1).getFullYear();
        let now = Date.parse(new Date());
        let mm = `${e.target.value.charAt(3)}${e.target.value.charAt(4)}`;
        let dd = `${e.target.value.charAt(0)}${e.target.value.charAt(1)}`;
        let yyyy = `${e.target.value.charAt(6)}${e.target.value.charAt(7)}${e.target.value.charAt(8)}${e.target.value.charAt(9)}`;
        let dateForm  = Date.parse(`${yyyy}-${mm}-${dd}`);
        let customerAge = now - dateForm;

        let currentYear = new Date().getFullYear();
        let deltaYear = +currentYear - +yyyy;

        let customer18 = 18*365*(3600 * 24 * 1000);
        // let customer74 = 74*365*(3600 * 24 * 1000);

        // console.log('state', this.state.date);
        // console.log('currentYear', currentYear);
        // console.log('deltaYear', deltaYear);
        // console.log('Year1900', Year1900);



        if (customerAge < customer18 || +deltaYear >= 74) {
            this.setState({
                errorMessage: 'Ипотечный кредит предоставляется гражданам РФ в возрасте от 18 до 74 лет'
            });

        } else{
            this.setState({
                errorMessage: undefined
            });
        };

        if (yyyy < Year1900 || dateForm > now) {
            console.log('error');
            this.setState({
                errorMessage: 'Неверный формат'
            });
        } else {
            this.setState({
                date: e.target.value
            })
        }


    }

    handleNameChange(e){
        this.setState({
            name: e.target.value
        });
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    handleMessageChange(e){
        console.log(e.target.value);
        this.setState({
            message: e.target.value
        });
        // validateFields();
    }

    handleDeleteAllFields(){
        this.setState({
            name: '',
            email: '',
            date: '',
            message: '',
            errorMessage: undefined,
        });
    }

    handleSubmitForm(e){
        e.preventDefault();

        if (this.state.name !== '' &&
            this.state.date !== '' &&
            validateEmail(this.state.email) &&
            this.state.message !== '' &&
            this.state.errorMessage === undefined
        ) {
                // this.setState({
                //     errorBtn: false
                // });
            console.log(this.state);


        } else {
            console.log('BIG ERROR');

        }
    }




    render(){

        let validate =
            this.state.name !== '' &&
            this.state.date !== '' &&
            validateEmail(this.state.email) &&
            this.state.message !== '' &&
            this.state.errorMessage === undefined
        ;

        return(

           <div className="wrap">
               {console.log(validate)}
               <h1>Отправить сообщение</h1>
               <h2>Анонимные собщения рассматриваются</h2>

               <form>
                <div className="fields">

                   {/*NAME*/}

                   <div className="group name">
                       <input type="text"
                              onChange={this.handleNameChange.bind(this)}
                              required
                       />
                           <span className="bar"></span>
                           <label>Имя</label>
                   </div>

                   {/*EMAIL*/}

                   <div className="group">
                       <input type="email"
                              onChange={this.handleEmailChange.bind(this)}
                              required/>
                           <span className="bar"></span>
                           <label>Email</label>
                   </div>

                   {/*DATE*/}

                   <div className="group">
                       <input type="text"
                              className="date js-date"
                              onChange={this.handleDateChange.bind(this)}
                              maxLength="11"
                              required
                       />
                       <span className="bar"></span>
                       <label>Дата рождения</label>

                   </div>


                </div>

                   {/*ERROR MSG*/}

                   {
                       this.state.errorMessage !== undefined &&
                       this.state.date.length === 10 ?
                           <ErrorMessage error={this.state.errorMessage} />
                           : null
                   }

                   <div className="group message">
                       <textarea
                           rows='1'
                           onChange={this.handleMessageChange.bind(this)}
                           className="messageClass auto-expanding"
                           required
                       />
                       <span className="bar messageClass"></span>
                       <label>Сообщение</label>
                   </div>


                   {/*BUTTONS*/}

                   <div className="btn-wrap">
                       <input type="reset"
                              value="Очистить"
                              className="button reset-btn"
                              onClick={this.handleDeleteAllFields.bind(this)}
                       />



                       <input type="submit"
                              className={!validate ?
                                  "button send-btn" : "button send-btn-active"
                              }
                              value="Отправить"
                                disabled={
                                    !validate
                                   }
                              onClick={this.handleSubmitForm.bind(this)}
                       />
                   </div>

               </form>
           </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
 document.getElementById('root')
);
