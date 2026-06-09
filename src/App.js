import React, { Component } from 'react';
import './assets/scss/App.scss';
import ProductData from './Data/products.json';

// Import Components
import Header from './Component/Header/Header';
import ProductList from './Component/ProductList/ProductList';
import ProductSingle from './Component/ProductSingle/ProductSingle';
import CartComponent from './Component/CartComponent/CartComponent';
import Checkout from './Component/Checkout/Checkout';
import ThankYou from './Component/ThankYou/ThankYou';
import Login from './Component/Login/Login';
import Account from './Component/Account/Account';
import OrderTracking from './Component/OrderTracking/OrderTracking';
import ReviewsDashboard from './Component/Reviews/ReviewsDashboard';

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize states from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const savedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');

    this.state = {
      products: ProductData.data,
      cart: savedCart,
      user: savedUser,
      orders: savedOrders,
      reviews: savedReviews,
      questions: savedQuestions,
      searchQuery: '',
      currentRoute: 'home',
      routeParams: {},
    };
  }

  componentDidMount() {
    // Listen to hash changes for routing
    window.addEventListener('hashchange', this.handleHashChange);
    this.handleHashChange(); // Run on initial load
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  // Parse location hash and set routing state
  handleHashChange = () => {
    const hash = window.location.hash || '';
    
    // Simple Router Matching
    if (hash === '#/' || hash === '' || hash === '#') {
      this.setState({ currentRoute: 'home', routeParams: {} });
    } else if (hash.startsWith('#/product/')) {
      const id = hash.replace('#/product/', '');
      this.setState({ currentRoute: 'product', routeParams: { id } });
    } else if (hash.startsWith('#/category/')) {
      const category = hash.replace('#/category/', '');
      this.setState({ currentRoute: 'home', routeParams: { category } });
    } else if (hash === '#/cart') {
      this.setState({ currentRoute: 'cart', routeParams: {} });
    } else if (hash === '#/checkout') {
      this.setState({ currentRoute: 'checkout', routeParams: {} });
    } else if (hash.startsWith('#/thankyou/')) {
      const orderId = hash.replace('#/thankyou/', '');
      this.setState({ currentRoute: 'thankyou', routeParams: { orderId } });
    } else if (hash === '#/login') {
      this.setState({ currentRoute: 'login', routeParams: {} });
    } else if (hash === '#/account') {
      this.setState({ currentRoute: 'account', routeParams: {} });
    } else if (hash === '#/reviews') {
      this.setState({ currentRoute: 'reviews', routeParams: {} });
    } else if (hash.startsWith('#/track/')) {
      const orderId = hash.replace('#/track/', '');
      this.setState({ currentRoute: 'track', routeParams: { orderId } });
    } else if (hash === '#/track') {
      this.setState({ currentRoute: 'track', routeParams: {} });
    } else {
      // Fallback
      this.setState({ currentRoute: 'home', routeParams: {} });
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  };

  // Trigger page updates via hash changes with clean URL fallback
  navigate = (path) => {
    if (path === 'home') {
      // Clear hash cleanly from URL without page reload
      window.location.hash = '';
      window.history.pushState(
        "", 
        document.title, 
        window.location.pathname + window.location.search
      );
      this.setState({ currentRoute: 'home', routeParams: {} });
    } else {
      window.location.hash = `#/${path}`;
    }
  };

  // Persist State Utilities
  saveCartToStorage = (cart) => {
    this.setState({ cart });
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  saveUserToStorage = (user) => {
    this.setState({ user });
    localStorage.setItem('user', JSON.stringify(user));
  };

  saveOrdersToStorage = (orders) => {
    this.setState({ orders });
    localStorage.setItem('orders', JSON.stringify(orders));
  };

  saveReviewsToStorage = (reviews) => {
    this.setState({ reviews });
    localStorage.setItem('reviews', JSON.stringify(reviews));
  };

  saveQuestionsToStorage = (questions) => {
    this.setState({ questions });
    localStorage.setItem('questions', JSON.stringify(questions));
  };

  // Cart Handlers
  handleAddToCart = (product, quantity, selectedSize, selectedColor) => {
    const { cart } = this.state;
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { product, quantity, selectedSize, selectedColor }];
    }

    this.saveCartToStorage(updatedCart);
    this.navigate('cart');
  };

  handleUpdateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      this.handleRemoveFromCart(index);
      return;
    }

    const updatedCart = [...this.state.cart];
    updatedCart[index].quantity = newQty;
    this.saveCartToStorage(updatedCart);
  };

  handleRemoveFromCart = (index) => {
    const updatedCart = this.state.cart.filter((_, idx) => idx !== index);
    this.saveCartToStorage(updatedCart);
  };

  // Login & Session Handlers
  handleLogin = (user) => {
    this.saveUserToStorage(user);
  };

  handleLogout = () => {
    this.saveUserToStorage(null);
  };

  // Checkout and Order Placement
  handlePlaceOrder = (orderDetails) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newOrder = {
      ...orderDetails,
      id: orderId,
      date: orderDate,
      createdAt: Date.now(), 
      status: 'ordered',
    };

    const updatedOrders = [newOrder, ...this.state.orders];
    this.saveOrdersToStorage(updatedOrders);
    this.saveCartToStorage([]);
    this.navigate(`thankyou/${orderId}`);
  };

  // Simulate instant delivery for testing review features
  handleSimulateDelivery = (orderId) => {
    const updatedOrders = this.state.orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'delivered' };
      }
      return order;
    });
    this.saveOrdersToStorage(updatedOrders);
  };

  // Simulated real-time delivery tracker updates (time triggers)
  getSimulatedOrders = () => {
    const { orders } = this.state;
    let modified = false;

    const simulatedOrders = orders.map((order) => {
      // If manually marked delivered, do not override it
      if (order.status === 'delivered') return order;

      const elapsedMs = Date.now() - order.createdAt;
      let newStatus = 'ordered';

      if (elapsedMs > 600000) {
        newStatus = 'delivered'; // > 10 min
      } else if (elapsedMs > 180000) {
        newStatus = 'shipped'; // > 3 min
      } else if (elapsedMs > 60000) {
        newStatus = 'processing'; // > 1 min
      }

      if (order.status !== newStatus) {
        modified = true;
        return { ...order, status: newStatus };
      }
      return order;
    });

    if (modified) {
      setTimeout(() => {
        this.saveOrdersToStorage(simulatedOrders);
      }, 0);
    }

    return simulatedOrders;
  };

  // Product Q&A Callback Handler
  handleAddQuestion = (productId, questionText) => {
    const { questions } = this.state;
    const newQuestion = {
      productId: parseInt(productId),
      text: questionText,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    const updatedQuestions = [newQuestion, ...questions];
    this.saveQuestionsToStorage(updatedQuestions);
  };

  // Product Review Callback Handler
  handleAddReview = (productId, orderId, rating, comment) => {
    const { reviews } = this.state;
    const newReview = {
      productId: parseInt(productId),
      orderId: orderId,
      rating: parseInt(rating),
      comment: comment,
      reviewerName: this.state.user ? this.state.user.name : 'Verified Customer',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    const updatedReviews = [newReview, ...reviews];
    this.saveReviewsToStorage(updatedReviews);
  };

  // Search Products Handler
  searchProducts = (query) => {
    this.setState({ searchQuery: query });
  };

  renderPage = () => {
    const { currentRoute, routeParams, products, cart, user, searchQuery, reviews, questions } = this.state;
    const orders = this.getSimulatedOrders(); // Use simulator

    switch (currentRoute) {
      case 'home':
        return (
          <ProductList
            products={products}
            searchQuery={searchQuery}
            selectedCategory={routeParams.category || 'all'}
            onAddToCart={this.handleAddToCart}
            navigate={this.navigate}
          />
        );
      case 'product':
        return (
          <ProductSingle
            productId={routeParams.id}
            products={products}
            questions={questions.filter((q) => q.productId === parseInt(routeParams.id))}
            reviews={reviews.filter((r) => r.productId === parseInt(routeParams.id))}
            onAddToCart={this.handleAddToCart}
            onAddQuestion={this.handleAddQuestion}
            navigate={this.navigate}
          />
        );
      case 'cart':
        return (
          <CartComponent
            cart={cart}
            onUpdateCartQty={this.handleUpdateCartQty}
            onRemoveFromCart={this.handleRemoveFromCart}
            navigate={this.navigate}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            user={user}
            onPlaceOrder={this.handlePlaceOrder}
            navigate={this.navigate}
          />
        );
      case 'thankyou':
        return (
          <ThankYou
            orderId={routeParams.orderId}
            orders={orders}
            navigate={this.navigate}
          />
        );
      case 'login':
        return (
          <Login
            onLogin={this.handleLogin}
            navigate={this.navigate}
          />
        );
      case 'account':
        return (
          <Account
            user={user}
            orders={orders}
            onLogout={this.handleLogout}
            navigate={this.navigate}
          />
        );
      case 'reviews':
        return (
          <ReviewsDashboard
            user={user}
            orders={orders}
            reviews={reviews}
            onAddReview={this.handleAddReview}
            navigate={this.navigate}
          />
        );
      case 'track':
        return (
          <OrderTracking
            orderId={routeParams.orderId}
            orders={orders}
            onSimulateDelivery={this.handleSimulateDelivery}
            navigate={this.navigate}
          />
        );
      default:
        return (
          <ProductList
            products={products}
            searchQuery={searchQuery}
            selectedCategory="all"
            onAddToCart={this.handleAddToCart}
            navigate={this.navigate}
          />
        );
    }
  };

  render() {
    const { cart, user, currentRoute } = this.state;
    
    return (
      <div className="App">
        <Header
          cart={cart}
          user={user}
          currentRoute={currentRoute}
          navigate={this.navigate}
          searchProducts={this.searchProducts}
          onLogout={this.handleLogout}
        />
        
        <main className="main-content">
          {this.renderPage()}
        </main>

        <footer className="glass-effect" style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.2)', padding: '24px 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ fontWeight: 600, color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} MegaShop. All rights reserved. Built with premium custom designs.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
