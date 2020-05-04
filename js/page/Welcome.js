class Welcome extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.loginTitles = {
            title: "Log in",
            loginPlaceholder: "login",
            passwordPlaceholder: "password",
            buttonText: "Log in",
            linkText: "Registration"
        };

        this.registrationTitles = {
            title: "Registration",
            loginPlaceholder: "login",
            passwordPlaceholder: "password",
            buttonText: "Registrate",
            linkText: "Log in"
        };

        this.controller = new WelcomeController(React.createContext({}));

        this.loginCallbacks = {
            onButtonClick: this.controller.login,
            onLinkClick: this.toggleMode.bind(this)
        };

        this.registrationCallbacks = {
            onButtonClick: this.controller.register,
            onLinkClick: this.toggleMode.bind(this)
        };

    }

    state = {
        registrationMode: false
    };

    toggleMode() {
        this.setState({registrationMode: !this.state.registrationMode})
    }


    render() {
        return (
            <div>
                {!this.state.registrationMode && <WelcomeForm titles={this.loginTitles} callbacks={this.loginCallbacks}/>}
                {this.state.registrationMode && <WelcomeForm titles={this.registrationTitles} callbacks={this.registrationCallbacks}/>}
            </div>
        )
    }
}