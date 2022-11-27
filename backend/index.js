const express=require('express');
const port=8000;
const path=require('path'); //dont need to npm install path it comes with nodejs. here req because it needed for ejs
// const ejs=require('ejs');
const app=express();

const db=require('./config/mongoose');
const Contact=require('./model/contact');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));  // __dirname gives-directory name of the current module.
app.use(express.urlencoded());  // need for parsing it is middleware
app.use(express.static('assets'));

var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]


app.get('/', function(req,res) {
// &&&& to &&&& part was before mongodb install n use
// &&&&
    // res.send('<h1>Hi there, your using contact app </h1> ')// 13 nov
// return res.render('home',{
//     title :'I have added title from js' ,//  14nov using ejs //15nov added title using <%= title %> in html file /created varible named title and operated from here
//     contact_list: contactList
//});
// &&&&

   Contact.find({},function(err,contact){  // here inside find  empty {} used cause i want to find every thing from db
    // if you use Contact.find({name:'RandomName'},function(err,contact){ it will only find entry witha RandomName name.
        if(err){ 
            console.log('Error in getting contact');
            return;
        }
        return res.render('home',{
        title :'I have added title from js' ,
           contact_list: contact
        })
   })


})




app.post('/create-contact', function(req, res){

// &&&& to &&&& part was before mongodb install n use
// &&&&
    //for yhis method 1st add 'app.use(express.urlencoded());  ' see line 9
        // contactList.push({
            
        //     name: req.body.name,
        //     phone: req.body.phone,
        // })
          // contactList.push(req.body);  // you can use this dir instead of using above lines (body.name,body.phone)
          // // return res.redirect('/'); or any url you want , if you want same webpage u can use back
        // return res.redirect('back');
//&&&&

    Contact.create({
        name :req.body.name,
        phone: req.body.phone
    }, function(err,newContact){
        if(err){
        console.log('Errror in creating contact ',err);
        return;
        }
        console.log('******',newContact); //contact created
        return res.redirect('back');

    })
    
    });

app.get('/delete-contact/', function(req,res){ 
    // &&&&
    // prev  was app.get('/delete-contact/:phone', function(req,res){ 
     // console.log(req.params);
    // let phone=req.params.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);

    // }
    // return res.redirect('back');
    //&&&&

    // This method using paramas
    // let id=req.params.id;
    // Contact.findByIdAndDelete(id,function(err){
    //     console.log('Error in deleting contact',id);
    //     return;
    // })

    //This method using query
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }

    return res.redirect('back');

});
});

app.get('/playground', function(req,res) {
    return res.render('playground',{title :'Playground'});         
    })



app.listen(port,function(err){

    if(err){
        console.log('Error in starting server '+err);
        return;
    }
    console.log('Server is up and running on '+port);

})