/** @jsx React.DOM */
var Product = React.createClass({
  addToCart: function(data){
    Application.bus.trigger("product:buy", data);
  },
  render: function() {
    var data = this.props.data
    var paletteStyle = { backgroundColor: data.colourCode };

    return (
      <tr>
        <td><div className="palette" style={paletteStyle}></div></td>
        <td>
          <h4>{data.title}</h4>
          <p>{data.description}</p>
        </td>
        <td>
          <p>Price: £???</p>
          <p>Quantity: {data.quantity}</p>
        </td>
        <td>
          <button className="add-to-cart-btn"
                  onClick={ this.addToCart.bind(null, data) }>
            Add to Cart
          </button>
        </td>
      </tr>
    )
  }
})