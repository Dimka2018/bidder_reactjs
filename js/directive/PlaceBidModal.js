class PlaceBidModal extends React.Component {

    render() {
        const {title, placeholder, ok, cancel} = this.props.titles;
        return (
            <div className="modal_background">
                <div className="modal_window">
                    <span className="modal_header">{title}</span>
                    <input type="number" className="bid" placeholder={placeholder}/>
                    <div className="modal_button_container">
                        <button >{ok}</button>
                        <button >{cancel}</button>
                    </div>
                </div>
            </div>
        )
    }

}