class BidController {

    getLots(from, size) {
        let products = [];
        let request = window.indexedDB.open("BidDB", 1);

        request.onsuccess = event => {
            let transaction = event.target.result.transaction(["products"]);
            let productStore = transaction.objectStore("products");
            productStore.openCursor().onsuccess = event => {
                let cursor = event.target.result;
                if (from > 0) {
                    from --;

                } else if (size > 0) {
                    if (cursor)
                        products.push(cursor.value);
                    size --;
                }
                if (cursor)
                    cursor.continue()
            };
        };
        return products;
    }
}