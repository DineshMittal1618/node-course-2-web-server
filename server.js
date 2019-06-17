const express=require('express');
const hbs=require('hbs');
var app=express();
const fs=require('fs');

const port=process.env.PORT || 3000;

app.set('view engine','hbs');

app.use(express.static(__dirname+'/public'));

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now=new Date().toString();
 var log=`${now} ${req.method} ${req.url}`;

fs.appendFile('server.log',log +'\n',(err)=>{
  if(err){
    console.log('unbale to append the appendFile');
  }
});
  console.log(log)
  next();
});
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home page',
    currentYear:new Date().getFullYear()
  });
});
app.use((req,res,next)=>{
  res.render('magnance.hbs',{
    pageTitle:'magnance',
  });
    next();
});





// app.get('/',
// (req,res)=>{
// // res.send('<H1>Hello express</H1>');
// res.send({
//   name:'Dinesh',
//   likes:['Swimming','Trecking']});
// });


// app.get('/about',
// (req,res)=>{
//   res.send('Hello About');
// });


app.get('/about',
(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
    currentYear:new Date().getFullYear()
  });
}
);
app.get('/bad',
(req,res)=>{
  res.send({
    ErrorMessage:"Bad request Made"});
});
app.listen(port,()=>{console.log(`Server Is ready to listen to port number ${port}`);});
