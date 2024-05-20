const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
// Static array to store posts
let posts = [{_id: Date.now(), title:"1st post",body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}];
router.get('/', (req, res) => {
    res.render('admin/list', { posts });
    // Post.find()
    //     .then(posts => {
    //         res.render('admin/list', { posts });
    //     });
});

router.get('/add', (req, res) => {
    res.render('admin/add');
});

router.post('/add', (req, res) => {
    // const newPost = new Post({
    //     _id: Date.now(),
    //     title: req.body.title,
    //     body: req.body.body
    // });
 
    posts.push({
        _id: Date.now(),
        title: req.body.title,
        body: req.body.body
    });
    req.flash('success_msg', 'Post added');
    res.redirect('/admin');
    // newPost.save()
    //     .then(() => {
    //         req.flash('success_msg', 'Post added');
    //         res.redirect('/admin');
    //     });
});

router.get('/edit/:id', (req, res) => {
    // Post.findById(req.params.id)
    //     .then(post => {
    //         res.render('admin/edit', { post });
    //     });
    const postId = req.params.id;
    const post = posts.find(post => post._id == postId);
    if (!post) {
        req.flash('error_msg', 'Post not found');
        return res.redirect('/admin');
    }
    res.render('admin/edit', { post });
});

router.post('/edit/:id', (req, res) => {
    // Post.findById(req.params.id)
    //     .then(post => {
    //         post.title = req.body.title;
    //         post.body = req.body.body;

    //         post.save()
    //             .then(() => {
    //                 req.flash('success_msg', 'Post updated');
    //                 res.redirect('/admin');
    //             });
    //     });
    const postId = req.params.id;
    const postIndex = posts.findIndex(post => post._id == postId);
    if (postIndex === -1) {
        req.flash('error_msg', 'Post not found');
        return res.redirect('/admin');
    }
    posts[postIndex].title = req.body.title;
    posts[postIndex].content = req.body.content;
    req.flash('success_msg', 'Post updated');
    res.redirect('/admin');
});

router.get('/delete/:id', (req, res) => {
    // Post.findByIdAndRemove(req.params.id)
    //     .then(() => {
    //         req.flash('success_msg', 'Post deleted');
    //         res.redirect('/admin');
    //     });
     const postId = req.params.id;
    posts = posts.filter(post => post._id != postId);
    req.flash('success_msg', 'Post deleted');
    res.redirect('/admin');
});

module.exports = router;
