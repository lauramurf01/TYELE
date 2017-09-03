var Subject = require('../models/subject');

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds127492.mlab.com:27492/tyele');

var subjects = [
    new Subject({
        imagePath: '../public/images/stackbooks.jpg',
        title:'English'
    }),
    new Subject({
        imagePath: 'http://www.freestockphotos.name/wallpaper-original/wallpapers/school-books-2524.jpg',
        title:'German'
    }),
    new Subject({
        imagePath: 'http://www.freestockphotos.name/wallpaper-original/wallpapers/school-books-2524.jpg',
        title:'Gaeilge'
    }),
    new Subject({
        imagePath: 'http://www.freestockphotos.name/wallpaper-original/wallpapers/school-books-2524.jpg',
        title: 'Home Economics'
    }),
    new Subject({
        imagePath: 'http://www.freestockphotos.name/wallpaper-original/wallpapers/school-books-2524.jpg',
        title: 'Business'
    }),
    new Subject({
        imagePath: 'http://www.freestockphotos.name/wallpaper-original/wallpapers/school-books-2524.jpg',
        title: 'Student Achievements'
    })
    ];

var done = 0;
for (var i = 0; i <subjects.length; i++){
    subjects[i].save(function (err, result) {
        done++;
        if (done === subjects.length ){
            exit();
        }

    });
}

function exit(){
    mongoose.disconnect();
}
