var Store = function(items){
    if(!this instanceof Store){
        return new Store();
    }
    console.log('Created');
    this.products = [];
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