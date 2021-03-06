class Lot extends React.Component {

    isSold(product) {
        let now = new Date();
        let end = new Date(product.end.year, product.end.month - 1,
            product.end.day, product.end.hour, product.end.min, product.end.sec, 0);
        return now >= end;
    };

    state = {
        open: false
    };

    toggle() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {onBidClick} = this.props.callbacks;
        const lot = this.props.lot;
        let start = `${lot.start.day}\\${lot.start.month}\\${lot.start.year} ${lot.start.hour}:${lot.start.min}:${lot.start.sec}`;
        let end = `${lot.end.day}\\${lot.end.month}\\${lot.end.year} ${lot.end.hour}:${lot.end.min}:${lot.end.sec}`;
        return (
            <React.Fragment>
                <tr className={"clickable product_info " + (this.isSold(lot) ? "sold" : "")}
                    onClick={this.toggle.bind(this)}>
                    <td>{lot.id}</td>
                    <td>{lot.title}</td>
                    <td>{start}</td>
                    <td>{end}</td>
                    <td>{lot.bid}</td>
                    <td>{lot.price}</td>
                </tr>
                {!this.isSold(lot) && this.state.open && <tr className="product_description">
                    <td colSpan="6">
                        <div className="description_container">
                            <span>Description: </span>
                            <div className="description">{lot.description}</div>
                            <div className="bid_container">
                                <button className="add_bid_button" onClick={() => onBidClick(lot)}>place bid</button>
                            </div>
                        </div>
                    </td>
                </tr>}
            </React.Fragment>
        )
    }
}