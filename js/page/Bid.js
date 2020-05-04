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
    }

    state = {
        openModal: false,
        lots: []
    };

    loadLots() {
        let lots = this.state.lots;
        this.setState({lots: lots.concat(this.controller.getLots(lots.length, this.PACK_SIZE))})
    }


    isSold(product) {
        let now = new Date();
        let end = new Date(product.end.year, product.end.month - 1,
            product.end.day, product.end.hour, product.end.min, product.end.sec, 0);
        return now >= end;
    };

    render() {
        console.log(this.state.lots);
        const lots = this.state.lots.map(lot => {
            return (
                <tr className={"clickable product_info" + this.isSold(lot) && "sold"} key={lot.id}>
                    <td>{lot.id}</td>
                    <td>{lot.title}</td>
                    <td>start</td>
                    <td>end</td>
                    <td>{lot.bid }</td>
                    <td>{lot.price}</td>
                </tr>
            )

        });
        return(
            <div>
                {this.state.openModal && <PlaceBidModal titles={this.modalTitles}/>}
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