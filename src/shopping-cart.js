/** @jsx React.DOM */
var ShoppingCart = React.createClass({
  addToCart: function(_, data){
    var items = this.state.items
    items.push(data);
    this.setState({ items: items })
  },
  getInitialState: function(){
    return {
      items: []
    }
  },
  componentWillMount: function(){
    Application.bus.bind("product:buy", this.addToCart);
  },
  componentWillUnmount: function(){
    Application.bus.unbind("product:buy", this.addToCart);
  },
  render: function() {
    return (
      <div id="cart">
        <h1>Shopping cart</h1>
        <table className="table table-striped">
          <tbody>
            {
              this.state.items.map(function(item) {
                return <tr>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
})