

/** @jsx React.DOM */
var Application = React.createClass({
  statics: {
    bus: $({})
  },
  render: function() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>HTML Paint Shop</h1>
          <h2>Exquisite HTML friendly paints for your house and garden. Instagram friendly.</h2>
        </div>
        <div className="row">
          <div className="col-md-8">
            <ProductList />
          </div>
          <div className="col-md-4">
            <ShoppingCart />
          </div>
        </div>
      </div>
    )
  }
})

React.renderComponent(<Application />, document.body);
