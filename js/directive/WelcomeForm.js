class WelcomeForm extends React.Component {

    onLoginChange = event => {
        this.setState({login: event.target.value});
    };

    onPasswordChange = event => {
        this.setState({password: event.target.value});
    };

    onButtonClick = event => {
        event.preventDefault();
        this.props.callbacks.onButtonClick(this.state.login, this.state.password);
    };

    render() {
        const {title, loginPlaceholder, passwordPlaceholder, buttonText, linkText} = this.props.titles;
        const {onLinkClick} = this.props.callbacks;
        return(
            <form className="user_form">
                <span className="form_header">{title}</span>
                <input className="form_input" onInput={this.onLoginChange} type="text" placeholder={loginPlaceholder}/>
                <input className="form_input" onInput={this.onPasswordChange} type="password" placeholder={passwordPlaceholder}/>
                <button className="form_button" onClick={this.onButtonClick}>{buttonText}</button>
                <a className="form_link" onClick={onLinkClick}>{linkText}</a>
            </form>
        )
    }
}