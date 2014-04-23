    /** @jsx React.DOM */
    var Product = React.createClass({displayName: 'Product',
      addToCart: function(data){
        Application.bus.trigger("product:buy", data);
      },
      render: function() {
        var data = this.props.data
        var paletteStyle = { backgroundColor: data.colourCode };

        return (
          React.DOM.tr(null, 
            React.DOM.td(null, React.DOM.div( {className:"palette", style:paletteStyle})),
            React.DOM.td(null, 
              React.DOM.h4(null, data.title),
              React.DOM.p(null, data.description)
            ),
            React.DOM.td(null, 
              React.DOM.p(null, "Price: £???"),
              React.DOM.p(null, "Quantity: ", data.quantity)
            ),
            React.DOM.td(null, 
              React.DOM.button( {className:"add-to-cart-btn",
                      onClick: this.addToCart.bind(null, data) }, 
                "Add to Cart"
              )
            )
          )
        )
      }
    })

    var ProductPaginator = React.createClass({displayName: 'ProductPaginator',
      render: function() {
        if(this.props.meta){
          var meta = this.props.meta;
          var pages = meta.total/meta.limit;
          var current = (meta.start/meta.limit) + 1;
          var pagerEls = Array.apply(null, Array(pages))
            .map(function (_, i) {
              var page = i + 1;
              var start = i * meta.limit;
              return React.DOM.li( {key:page, className:(page == current) ? "active" : "" }, 
                React.DOM.a( {href:"#", onClick:this.props.onElementClick.bind(null, start, meta.limit)}, page)
              );

            }, this);
          return React.DOM.ul( {className:"pagination"}, 
            pagerEls
          )
        } else {
          return React.DOM.ul( {className:"pagination"}
          )
        }
      }
    });

    var ProductList = React.createClass({displayName: 'ProductList',
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
          React.DOM.div( {id:"products"}, 
            React.DOM.h1(null, "Products"),
            React.DOM.table( {className:"table"}, 
              React.DOM.tbody(null, 
                
                  this.state.data.map(function(product) {
                    return Product( {key:product.id, data:product} )
                  })
                
              )
            ),
            ProductPaginator( {meta:this.state.meta,
                              onElementClick:this.getPage} )
          )
        )
      }
    })

    var ShoppingCart = React.createClass({displayName: 'ShoppingCart',
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
          React.DOM.div( {id:"cart"}, 
            React.DOM.h1(null, "Shopping cart"),
            React.DOM.table( {className:"table table-striped"}, 
              React.DOM.tbody(null, 
                
                  this.state.items.map(function(item) {
                    return React.DOM.tr(null, 
                      React.DOM.td(null, item.title),
                      React.DOM.td(null, item.quantity),
                      React.DOM.td(null, item.price)
                    )
                  })
                
              )
            )
          )
        )
      }
    })

    var Application = React.createClass({displayName: 'Application',
      statics: {
        bus: $({})
      },
      render: function() {
        return (
          React.DOM.div( {className:"container"}, 
            React.DOM.div( {className:"jumbotron"}, 
              React.DOM.h1(null, "HTML Paint Shop"),
              React.DOM.h2(null, "Exquisite HTML friendly paints for your house and garden. Instagram friendly.")
            ),
            React.DOM.div( {className:"row"}, 
              React.DOM.div( {className:"col-md-8"}, 
                ProductList(null )
              ),
              React.DOM.div( {className:"col-md-4"}, 
                ShoppingCart(null )
              )
            )
          )
        )
      }
    })

    React.renderComponent(Application(null ), document.body);
