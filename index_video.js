var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(3000);

var pg = require('pg');
var config = {
  user: 'postgres',
  database: 'music',
  password: '123',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);

// config body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// config multer
var multer = require("multer");
var mime = ["image/jpeg","image/png"];

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images/video');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + "-" +  file.originalname);
  }
});

var upload = multer({
  storage   : storage,
  limits    : {fileSize: 1024*1024*10},
  fileFilter: function(req, file, cb){
    if(mime.indexOf(file.mimetype) == -1){
      return cb(new Error("Sai loai file upload"));
    }else{
      return cb(null, true);
    }
  }
}).single("fileThumbnail");


app.get("/",function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM music_list ORDER BY id', function(err, result) {
      done();

      if(err) {
        res.end();
        return console.error('error running query', err);
      }
      console.log(result.rows[0].video_name);
      res.render("index_dark",{danhsach:result});
    });
  });
});


app.get("/music/list",function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM music_list ORDER BY id', function(err, result) {
      done();

      if(err) {
        res.end();
        return console.error('error running query', err);
      }

      res.render("music_list",{danhsach:result});
    });
  });
});


app.get("/music/add",function(req, res){
  // show form
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }

    client.query("SELECT * FROM music_list", function(err, result) {
      done();

      if(err) {
        res.end();
        return console.error('error running query', err);
      }

      res.render("music_add",{danhsach:result});
    });
  });
});


app.post("/music/add", urlencodedParser,function(req, res){

  upload(req, res, function(err){
    if(err){
      console.log(err);
      res.end();
      return;
    }else{
      console.log("Upload thanh cong");

      // insert db
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }

        var VideoId = req.body.txtVideoId;
        var VideoName = req.body.txtVideoName;
        var VideoDescription = req.body.txtVideoDescription;
        var VideoThumbnail = req.file.filename;

        client.query("INSERT INTO music_list(video_id, video_name, video_description, video_thumbnail) VALUES('"+VideoId+"','"+VideoName+"','"+VideoDescription+"','"+VideoThumbnail+"')", function(err, result) {
          done();

          if(err) {
            res.end();
            return console.error('error running query', err);
          }
          
          res.redirect("../music/list");
        });
      });

    }
  });


});


app.get("/music/edit/:id",function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var id = req.params.id;
    client.query("SELECT * FROM music_list WHERE id='"+id+"'", function(err, result) {
      done();

      if(err) {
        res.end();
        return console.error('error running query', err);
      }
      // console.log(result.rows[0]);
      res.render("music_edit",{row:result.rows[0]});
    });
  });
});


app.post("/music/edit",urlencodedParser, function(req, res){

  upload(req, res, function(err){
    if(err){
      console.log(err);
      res.end();
      return;
    }else{
      console.log("Upload thanh cong");
      if(!req.file.filename) console.log('aaa');
      // insert db
      pool.connect(function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }

        var id = req.body.txtId;
        var VideoId = req.body.txtVideoId;
        var VideoName = req.body.txtVideoName;
        var VideoDescription = req.body.txtVideoDescription;
        var VideoThumbnail = req.file.filename;

        client.query("UPDATE music_list SET video_id='"+VideoId+"', video_name='"+VideoName+"', video_description='"+VideoDescription+"', video_thumbnail='"+VideoThumbnail+"' WHERE id='"+id+"' ", function(err, result) {
          done();

          if(err) {
            res.end();
            return console.error('error running query', err);
          }

          res.redirect("../music/list");
        });
      });

    }
  });

});


app.get("/music/delete/:id",function(req, res){
  pool.connect(function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var id = req.params.id;
    client.query("DELETE FROM music_list WHERE id='"+id+"' ", function(err, result) {
      done();

      if(err) {
        res.end();
        return console.error('error running query', err);
      }

      res.redirect("../../music/list");
    });
  });
});
