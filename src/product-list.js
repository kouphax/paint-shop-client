/** @jsx React.DOM */
var ProductList = React.createClass({
  getInitialState: function() {
    return {
      data: []
    }
  },
  componentDidMount: function(){
    this.getPage(0, 10);
  },
  getPage: function(start, limit){
    $.get("http://paint-shop.herokuapp.com/products",
      { start : start, limit: limit },
      function(result) {
        this.setState(result);
      }.bind(this)
    );
    return false;
  },
  render: function() {
    return (
      <div id="products">
        <h1>Products</h1>
        <table className="table">
          <tbody>
            {
              this.state.data.map(function(product) {
                return <Product key={product.id} data={product} />
              })
            }
          </tbody>
        </table>
        <ProductPaginator meta={this.state.meta}
                          onElementClick={this.getPage} />
      </div>
    )
  }
})