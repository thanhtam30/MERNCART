const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const passport=require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{ useNewUrlParser: true } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave:false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
  }))
require('./config/passport')(passport);
app.use(passport.initialize());
app.use("/api/index", require("./routes/api/index"));
app.use("/api/cart", require("./routes/api/cart"));
 app.use("/api/product", require("./routes/api/product"));

app.use("/api/producer", require("./routes/api/producer"));
app.use('/api/user',require('./routes/api/user'));

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port=process.env.PORT||5000;
app.listen(port,console.log(`Server started on port ${port}`))