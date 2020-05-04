class PlaceBidModal extends React.Component {

    onInput = event => {
        this.setState({value: event.target.value});
    };

    render() {
        const {title, placeholder, ok, cancel} = this.props.titles;
        const {onCancelClick} = this.props.callbacks;
        return (
            <div className="modal_background">
                <div className="modal_window">
                    <span className="modal_header">{title}</span>
                    <input type="number" className="bid" placeholder={placeholder} onInput={this.onInput}/>
                    <div className="modal_button_container">
                        <button >{ok}</button>
                        <button onClick={onCancelClick}>{cancel}</button>
                    </div>
                </div>
            </div>
        )
    }

}