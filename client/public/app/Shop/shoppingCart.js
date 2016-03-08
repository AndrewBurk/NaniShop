/**
 * Created by andrew on 06.03.16.
 */
//----------------------------------------------------------------
// shopping cart
//
function ShoppingCart(cartName) {
    this.cartName = cartName;
    this.clearCart = false;
    this.items = [];

    // load items from local storage when initializing
    this.loadItems();

    // save items to local storage when unloading
    var self = this;
    $(window).unload(function () {
        if (self.clearCart) {
            self.clearItems();
        }
        self.saveItems();
        self.clearCart = false;
    });
}

// load items from local storage
ShoppingCart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = items.length; i--;) {
                var item = items[i];
                if (item._id != null && item.name != null && item.price != null && item.quantity != null) {
                    item = new cartItem(item._id, item.name, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }
}

// save items to local storage
ShoppingCart.prototype.saveItems = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
ShoppingCart.prototype.addItem = function (item_id, name, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update quantity for existing item
        var found = false;
        for (var i = 0, len = this.items.length; i < len  && !found; i+=1) {
            var item = this.items[i];
            if (item._id == item_id) {
                found = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            var item = new cartItem(item_id, name, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.saveItems();
    }
}

// get the total price for all items currently in the cart
ShoppingCart.prototype.getTotalPrice = function (item_id) {
    var total = 0;
    for (var i = this.items.length; i--;) {
        var item = this.items[i];
        if (item_id == null || item._id == item_id) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

// get the total price for all items currently in the cart
ShoppingCart.prototype.getTotalCount = function (item_id) {
    var count = 0;
    for (var i = this.items.length;i--;) {
        var item = this.items[i];
        if (item_id == null || item._id == item_id) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
}

// clear the cart
ShoppingCart.prototype.clearItems = function () {
    this.items = [];
    this.saveItems();
}

ShoppingCart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

//----------------------------------------------------------------
// items in the cart
//
function cartItem(item_id, name, price, quantity) {
    this._id = item_id;
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
}
