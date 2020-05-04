class BidController {

    getLots(from, size) {
        return new Promise(resolve => {
            let products = [];
            let request = window.indexedDB.open("BidDB", 1);
            request.onsuccess = event => {
                let transaction = event.target.result.transaction(["products"]);
                let productStore = transaction.objectStore("products");
                productStore.openCursor().onsuccess = event => {
                    let cursor = event.target.result;
                    if (from > 0) {
                        if (cursor) {
                            from --;
                            cursor.continue();
                        }
                    } else if (size > 0 && cursor) {
                        products.push(cursor.value);
                        cursor.continue();
                        size --;
                    } else {
                        resolve(products);
                    }
                };
            };
        });
    }
}