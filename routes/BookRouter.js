const router = require("express").Router();
const Book = require("../models/Book");


router.post("/", (req,res) => {
    //INSERT
    console.log(req.body);
    let books = new Book(req.body);
    // let books = new Book({
    //     bname: req.body.bname,
    //     price: req.body.price,
    //     aname: req.body.aname,
    //     qty: req.body.qty,
    // });
    books.save((err,data) => {
        if(err) return res.send("Error occured " + err);
        id = data._id;
        console.log(`${id} saved to books collection.`);
        res.status(200).send(data);
    });
});

router.get('/', (req,res) => {
    //GET ALL
    Book.find((err, data) => {
        if(err) return res.send("Error occured " + err);
        if(data < 2) return res.status(404).send("Data Not Found");
        //res.status(200).send(data);
        res.status(200).render('BookList',{bookList:data});
    })
});

router.get('/:id', (req,res) => {
    //get one by id
    const id = req.params.id;
    console.log(id);
    Book.findById(id, (err,data) => {
        if(err) return res.status(500).send("There was a problem finding" + err);
        if(err) return res.status(404).send("No Data Found" + err);
        //res.status(200).send(data);
        res.render('BookEdit',{List: data, title: 'BookEdit'});
    });
});

router.post('/edit', (req,res) => {
    //UPDATE by id 
    let id = req.body.id;
    Book.findByIdAndUpdate(
        {'_id':req.body.id}, 
        req.body,
        {new: true},
        (err,data) => {
            if(err) return res.status(500).send("There was a problem updating.");
            res.redirect("/books");
            //res.status(200).send(data);
        });
});

router.delete('/delete/:id', (req,res) => {
    //DELETE by id
    const id = req.params.id;
    Book.findByIdAndDelete(
        {"_id":req.params.id},
        (err, data) => {
            if(err) return req.status(500).send("there was a problem deleteing" + err);
            //res.status(200).send(`Book ${data.bname} was deleted`);
            res.json({ redirect: '/books'})
        });
});

//export
module.exports = router;