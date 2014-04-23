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

    var ProductPaginator = React.createClass({
      render: function() {
        if(this.props.meta){
          var meta = this.props.meta;
          var pages = meta.total/meta.limit;
          var current = (meta.start/meta.limit) + 1;
          var pagerEls = Array.apply(null, Array(pages))
            .map(function (_, i) {
              var page = i + 1;
              var start = i * meta.limit;
              return <li key={page} className={(page == current) ? "active" : "" }>
                <a href="#" onClick={this.props.onElementClick.bind(null, start, meta.limit)}>{page}</a>
              </li>;

            }, this);
          return <ul className="pagination">
            {pagerEls}
          </ul>
        } else {
          return <ul className="pagination">
          </ul>
        }
      }
    });

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