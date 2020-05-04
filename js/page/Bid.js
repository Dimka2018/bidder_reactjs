class Bid extends React.Component {

    PACK_SIZE = 3;
    controller = new BidController();

    constructor() {
        super();
        this.modalTitles = {
            title: "Enter your bid",
            placeholder: "Put your bid here",
            ok: "Ok",
            cancel: "Cancel"
        };

        this.modalCallbacks = {
            onCancelClick: this.toggleModal.bind(this)
        }
    }

    state = {
        openModal: false,
        lots: []
    };

    loadLots() {
        this.controller.getLots(this.state.lots.length, this.PACK_SIZE)
            .then(lots => {
                if (lots) {
                    this.setState({lots: this.state.lots.concat(lots)});
                }
            });
    }

    toggleModal() {
        this.setState({openModal: !this.state.openModal})
    }

    isSold(product) {
        let now = new Date();
        let end = new Date(product.end.year, product.end.month - 1,
            product.end.day, product.end.hour, product.end.min, product.end.sec, 0);
        return now >= end;
    };

    componentDidMount() {
        this.loadLots();
    }

    render() {
        const lots = this.state.lots.map(lot => {
            let start = `${lot.start.day}\\${lot.start.month}\\${lot.start.year} ${lot.start.hour}:${lot.start.min}:${lot.start.sec}`;
            let end = `${lot.end.day}\\${lot.end.month}\\${lot.end.year} ${lot.end.hour}:${lot.end.min}:${lot.end.sec}`;
            return (
                <React.Fragment key={lot.id}>
                    <tr className={"clickable product_info " + (this.isSold(lot) ? "sold" : "")} >
                        <td>{lot.id}</td>
                        <td>{lot.title}</td>
                        <td>{start}</td>
                        <td>{end}</td>
                        <td>{lot.bid }</td>
                        <td>{lot.price}</td>
                    </tr>
                    <tr className="product_description">
                        <td colSpan="6">
                            <div className="description_container">
                                <span>Description: </span>
                                <div className="description">{lot.description}</div>
                                <div className="bid_container">
                                    <button className="add_bid_button" onClick={this.toggleModal.bind(this)}>place bid</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            )

        });
        return(
            <div>
                {this.state.openModal && <PlaceBidModal titles={this.modalTitles} callbacks={this.modalCallbacks}/>}
                <table className="product_table">
                    <thead>
                    <tr className="product_info">
                        <th>id</th>
                        <th>title</th>
                        <th>start</th>
                        <th>end</th>
                        <th>bid</th>
                        <th>price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {lots}
                    </tbody>
                </table>
                <div className="product_load_container">
                    <button className="product_load_butt" onClick={this.loadLots.bind(this)}>Load</button>
                </div>
            </div>
        )
    }
}