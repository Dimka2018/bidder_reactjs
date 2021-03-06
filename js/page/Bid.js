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
            onCancelClick: this.toggleModal.bind(this),
            onOkClick: this.updateLot.bind(this)
        };

        this.lotCallbacks = {
            onBidClick: this.toggleModal.bind(this)
        }
    }

    state = {
        openModal: false,
        lots: [],
        numberProducts: 0
    };

    loadLots() {
        this.controller.getLots(this.state.lots.length, this.PACK_SIZE)
            .then(lots => {
                if (lots) {
                    this.setState({lots: this.state.lots.concat(lots)});
                }
            })
            .then(() => {
                this.controller.getNumberProducts()
                    .then(numberProducts => {
                        this.setState({numberProducts: numberProducts})
                    })
            });
    }

    toggleModal(updatableLot) {
        this.setState({
            openModal: !this.state.openModal,
            updatableLot: updatableLot
        })
    }

    updateLot(bid) {
        let lot = this.state.updatableLot;
        lot.bid = bid;
        this.controller.saveOrUpdateProduct(lot)
            .then(() => this.toggleModal())
            .then(() => {
                let lots = this.state.lots.map(item => (item.id === lot.id ? lot : item));
                this.setState({lots: lots});
            })
    }

    componentDidMount() {
        this.loadLots();
    }

    render() {
        console.log();
        const lots = this.state.lots.map(lot => <Lot lot={lot} callbacks={this.lotCallbacks} key={lot.id}/>);
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
                {(this.state.numberProducts > this.state.lots.length) &&
                <div className="product_load_container">
                    <button className="product_load_butt" onClick={this.loadLots.bind(this)}>Load</button>
                </div>}
                <button className="logout_butt" onClick={() => this.props.history.push("/welcome")}> Logout</button>
            </div>
        )
    }
}