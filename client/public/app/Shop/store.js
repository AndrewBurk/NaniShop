var Store = function(items){
    var instance;
    Store = function Store(){
        return instance;
    }
    Store.prototype = this;

    instance = new Store();
    instance.constructor = Store;
    instance.products = [];
    return instance;

};

Store.prototype.loadProducts = function(items){
    var i;
    for(i = items.length;i--;){
        this.products.push(items[i]);
    }
}

Store.prototype.addProduct = function(item){

}

Store.prototype.removeProduct = function(item){

}

Store.prototype.getProduct = function(item_id){
    var i;
    for(i = this.products.length;i--;){
        if(this.products[i]._id == item_id){
            return this.products[i];
        }
    }
    return null;
}