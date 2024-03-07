// dependencies
const express = require('express');

const app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');

const Blog = require('./models/blogs');

const EWU = require('./models/ewu');

const People = require('./models/people');

const Info = require('./models/info');

// connect to mongodb

const dburl =
  'mongodb+srv://tamim:tamim98749874@node-app.triuitj.mongodb.net/?retryWrites=true&w=majority&appName=node-app';
mongoose
  .connect(dburl)
  .then((result) => {
    console.log('connected to db');
  })
  .catch((err) => console.log('error occured'));

// configuration of view engine

app.set('view engine', 'ejs');

// listen for request

app.listen(4000);

// Middleware function
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(morgan('dev'));

// mongooes and mongodb sandbox routes

// app.get('/add-blog', (req, res) => {
//   // it will show 1 created blog in the url
//   const blog1 = new Blog({
//     title: 'Northsouth University',
//     snippet: 'East West University: Excellence in Education since 1996.',
//     blog: `East West University, located in Dhaka, Bangladesh, was founded in 1996. With a motto of "Excellence in Education," it has established itself as a prominent institution in the region, offering a wide range of academic programs and fostering a vibrant learning environment. Known for its commitment to quality education and innovative teaching methods, East West University continues to empower students to excel in their chosen fields and contribute positively to society.`,
//   });

//   blog1
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => res.send('error occured'));
// });

// finding all blogs
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((results) => res.send(results))
    .catch((err) => res.send('Error Occured'));
});

// home page routing with all the blogs we have created

app.get('/', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render('index', { title: 'Blogs', blogs: result }))
    .catch((err) => res.render('404'));
});
// ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // // ewu ewu ewu
app.get('/ewu', (req, res) => {
  const person1 = new EWU({
    name: 'Raisul Islam Piash',
    id: '2019-1-55-007',
    department: 'Computer Science and Engineering',
  });
  person1
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      res.render('404');
    });
});
app.get('/allewu', (req, res) => {
  EWU.find()
    .then((result) => res.render('winter', { title: 'EWU', ewus: result }))
    .catch((err) => res.send('404'));
});
// ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu // ewu ewu ewu
// family member form// family member form// family member form// family member form

app.get('/allperson', (req, res) => {
  People.find()
    .then((result) => res.render('show', { people: result }))
    .catch((err) => {
      res.render('404');
    });
});
app.post('/allperson', (req, res) => {
  const people = new People(req.body);
  people
    .save()
    .then((result) => {
      res.redirect('/allperson');
    })
    .catch((err) => {
      res.render('404');
    });
});
// family member form// family member form// family member form

// info id number// info id number// info id number// info id number

// get request info page

app.get('/info', (req, res) => {
  Info.find()
    .then((result) => res.render('info', { infos: result }))
    .catch((err) => {
      res.render('404');
    });
});
// post req
app.post('/info', (req, res) => {
  const userinfo = new Info(req.body);
  userinfo
    .save()
    .then((result) => {
      res.redirect('/info');
    })
    .catch((err) => {
      res.render('404');
    });
});

// id get request

app.get('/info/:id', (req, res) => {
  const id = req.params.id;
  Info.findById(id)
    .then((result) => {
      res.render('details', { info: result, title: ' Info Details' });
    })
    .catch((err) => {
      res.render('404');
    });
});

// id delete request

app.delete('/info/:id', (req, res) => {
  const id = req.params.id;
  Info.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/info' });
    })
    .catch((err) => res.render('404'));
});

// Update user information
app.post('/info/:id/update', (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  const newid = req.body.id;

  Info.findByIdAndUpdate(id, { id: newid, name: newName }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        res.redirect(`/info/${id}`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error updating user');
    });
});

// info id number// info id number// info id number// info id number

// post request
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => {
      res.render('404');
    });
});

app.use('/about', (req, res, next) => {
  // about e jete dibo ki dibona for my condition
  const cred = 9;
  if (cred > 5) {
    console.log('Ami middleware ebar jaite dilam ');
    next();
  } else {
    console.log('Ami middleware jaite dibona ki korbi');
  }
});

// route handler

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/about-me', (req, res) => {
  res.redirect('about');
});
app.get('/winter', (req, res) => {
  res.render('winter');
  console.log(req.method);
});
app.post('/winter', (req, res) => {
  console.log('post request made');
  res.send('created');
});

// middleware function for 404 error
app.use((req, res) => {
  res.status(404).render('404');
  console.log(req.method);
});
