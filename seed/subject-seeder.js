var Subject = require('../models/subject');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/tele');

var subjects = [
    new Subject({
        imagePath: 'https://img.clipartfest.com/65e426dfc8f0a1a2890a7bf220d886b4_school-books-pictures-of-school-books_1200-1200.jpeg',
        title:'blah'
}),
    new Subject({
        imagePath: 'https://img.clipartfest.com/65e426dfc8f0a1a2890a7bf220d886b4_school-books-pictures-of-school-books_1200-1200.jpeg',
        title:'German'
    }),
    new Subject({
        imagePath: 'https://img.clipartfest.com/65e426dfc8f0a1a2890a7bf220d886b4_school-books-pictures-of-school-books_1200-1200.jpeg',
        title:'Gaeilge'
    }),
    new Subject({
        imagePath: 'https://img.clipartfest.com/65e426dfc8f0a1a2890a7bf220d886b4_school-books-pictures-of-school-books_1200-1200.jpeg',
        title: 'Home Economics'
    }),
    new Subject({
        imagePath: 'https://img.clipartfest.com/65e426dfc8f0a1a2890a7bf220d886b4_school-books-pictures-of-school-books_1200-1200.jpeg',
        title: 'Business'
    })
    ];

var done = 0;
for (var i = 0; i <5; i++){
    subjects[i].save(function (err, result) {
        done++;
        if (done === 5){
            exit();
        }

    });
}

function exit(){
    mongoose.disconnect();
}
