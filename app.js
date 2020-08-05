const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

var app = express();

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const productsRouter = require('./routes/products');
const contactRouter = require('./routes/contact');
const productRouter = require('./routes/product');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');
const userRouter= require('./routes/user');
const signupRouter = require('./routes/signup');
const subscribeRouter = require('./routes/subscribe');
const apiRouter = require('./routes/api');


const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./passport/local-auth');
app.use(session({
  secret: 'thiisthesecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage'); // Esto guarda el mensaje de forma global para usarlo en cualquier parte de la app, Creo que lo mejor es almacenarlo en la vista y mostrarlo ahi
  app.locals.signinMessage = req.flash('signinMessage');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


app.use(logger('dev'));  // Uso de morgan para mostrar peticiones get o post hechas por el usuario
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  // Recibir datos desde e front
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/products', productsRouter);
app.use('/contact', contactRouter);
app.use('/product', productRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/user', userRouter);
app.use('/subscribe', subscribeRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
