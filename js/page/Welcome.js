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
            onButtonClick: this.login.bind(this),
            onLinkClick: this.toggleMode.bind(this)
        };

        this.registrationCallbacks = {
            onButtonClick: this.register.bind(this),
            onLinkClick: this.toggleMode.bind(this)
        };
    }

    login(login, password) {
        this.controller.login(login, password)
            .then(() => this.props.history.push("/bid"),
                error => this.setState({error: error}))
    }

    register(login, password) {
        this.controller.register(login, password)
            .then(() => this.login(login, password),
                error => this.setState({error: error}))
    }

    state = {
        registrationMode: false,
        error: ""
    };

    toggleMode() {
        this.setState({registrationMode: !this.state.registrationMode})
    }

    render() {
        return (
            <div>
                {!this.state.registrationMode &&
                <WelcomeForm titles={this.loginTitles} callbacks={this.loginCallbacks}/>}
                {this.state.registrationMode &&
                <WelcomeForm titles={this.registrationTitles} callbacks={this.registrationCallbacks}/>}
                <div className="error_message">{this.state.error}</div>
            </div>
        )
    }
}