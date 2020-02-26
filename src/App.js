import React, { Component } from 'react';
import './App.css';
import tachyons from 'tachyons'
import { RadioButtonGroup, ProgressBar } from 'react-rainbow-components';
import logo from './images/tbm-logo.png';
import CookieGif from './images/cookie-bites.gif';

const options = [
    { value: 'on', label: 'On' },
    { value: 'pause', label: 'Pause' },
    { value: 'off', label: 'Off' }
];

let statusMessage = "Let's make some cookieeeees 🍪";
const progressBarPercentage = 0;
let cookiesCount = 0;
let ovenStatus = 'good';
let stopMachine = false;

const spinnerSelector = document.querySelector('.spinner');
let spinnerClassName = 'spinner';

const paddingRemoverSelector = document.querySelector(".rainbow-p-around_x-large");
let paddingRemoverCSS = 'rainbow-p-around_x-large mt4';

function classChangeOnSwitch() {
    spinnerClassName = 'spinner';
    paddingRemoverCSS = 'rainbow-p-around_x-large mt4';
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function creatingCookies() {
    for (let i = 0; i < 10; i++) {
        if (stopMachine) {
            break;
        } else {
            statusMessage = `Creating Cookies...YAY! We've made ` + cookiesCount + ` cookies so far.`;
            await timer(3000);
            cookiesCount++;
            if (i >= 9) {
                ovenStatus = 'ovearheating';
                overheatingOven();
            };
        }
    }
}

const turningMotorOn = () => { statusMessage = 'Oven is at 220 degrees and ready to cook. Turning the motor on.'; }

const overheatingOven = () => { statusMessage = 'Oven is overheating. Please pause the machine.'; }


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'off',
            oven: 'off',
            motor: 'off',
            ovenStatus: 'good'
        };
        this.handleOnChange = this.handleOnChange.bind(this);

    }

    handleOnChange(event) {
        this.setState({ value: event.target.value });
        if (event.target.value === 'on') {
            if (ovenStatus === 'good') {
                statusMessage = 'Machine started. Warming up the oven now.';
            } else { statusMessage = 'Machine started. Oven is good to go.'; }
            spinnerClassName += ' spinnerDib';
            paddingRemoverCSS = 'rainbow-p-around_x-large mt1';
            stopMachine = false;
            setTimeout(() => {
                this.setState({ oven: 'on' });
                if (this.state.oven === 'on') {
                    turningMotorOn();
                };
            }, 3000);
            setTimeout(() => {
                this.setState({ motor: 'on' });
                classChangeOnSwitch();
                creatingCookies();
            }, 7000);

        } else if (event.target.value === 'pause') {
            statusMessage = "Machine paused.";
            if (cookiesCount > 0) {
                ovenStatus = 'cooling';
            };
            stopMachine = true;
            classChangeOnSwitch()
        } else {
            if (ovenStatus === 'good') {
                statusMessage = "Machine is turned OFF";
            } else {
                statusMessage = "Machine is turned OFF. No more cookies? 🍪";
            }
            classChangeOnSwitch()
            stopMachine = true;
        }
        this._interval = setInterval(() => {
            this.forceUpdate();
        }, 1000);
    }

    render() {
        return (
            <main className="App">
              <header className="header">
                <div className="link dim">
                <a href="#">
                <img src={logo} alt="The Biscuit Machine" />
                <h1 className="center w-100">The Biscuit Machine</h1></a>
                </div>
              </header>
              <div> 
                <img src={CookieGif} alt="Cookie GIF" className="pa3" width="400px" height="auto"/> 
              </div>
              <div className="center pv2 flex justify-center w-100">
                <div className="w-100 pa2 ma2 rainbow-p-around_x-large rainbow-align-content_center">
                <h3 className="center tc w-100 db">Machine Switch</h3>
                <RadioButtonGroup
                    id="radio-button-group-component-1"
                    options={options}
                    value={this.state.value}
                    variant="brand"
                    onChange={this.handleOnChange}
                />
                </div>
              </div>
              <div className={spinnerClassName}>
                  <div className="bounce1"></div>
                  <div className="bounce2"></div>
                  <div className="bounce3"></div>
              </div>
              <div className={paddingRemoverCSS}>
                  <ProgressBar value={progressBarPercentage} variant="success" className="progress-bar"/>
              </div>
              <h2 className="pv3 f3 tracked dib ttu center w-100 status-text">{statusMessage}  
              </h2>
              
            </main>
        );
    }
}

export default App;