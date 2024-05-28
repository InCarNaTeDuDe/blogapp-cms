const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
// Static array to store posts
let posts = [{_id: Date.now(), title:"Top Tips to keep thyroid in control",body:  `
<p>Reducing thyroid levels typically refers to managing hyperthyroidism, a condition where the thyroid gland is overactive and produces excessive amounts of thyroid hormones. Here are some tips and treatment options that may help manage and reduce thyroid hormone levels:</p>

<h4>Medical Treatments</h4>

<p>1. Antithyroid Medications: Drugs like methimazole (Tapazole) and propylthiouracil (PTU) help reduce thyroid hormone production.<br />
2. Radioactive Iodine Therapy: This treatment damages the thyroid cells, reducing hormone production.<br />
3. Beta-Blockers: These do not reduce thyroid hormone levels but can help manage symptoms such as rapid heart rate and anxiety.<br />
4. Surgery: In some cases, partial or complete removal of the thyroid gland (thyroidectomy) may be necessary.</p>
<img alt="" src="https://static.vecteezy.com/system/resources/previews/007/048/821/original/girl-meditating-love-yourself-meditation-cartoon-illustration-vector.jpg" style="height:200px; width:200px" />
<h4>Dietary Adjustments</h4>

<p>1. Low-Iodine Diet: Iodine is essential for thyroid hormone production, so reducing iodine intake can help manage hyperthyroidism. Avoid iodized salt, dairy products, and seafood.<br />
2. Goitrogenic Foods: Foods like broccoli, cauliflower, and cabbage can interfere with thyroid hormone production. Incorporating these in moderation may help.<br />
3. Limit Caffeine and Alcohol: Both can exacerbate hyperthyroid symptoms.</p>

<h4>Lifestyle Changes</h4>

<p>1. Stress Management: Stress can worsen hyperthyroid symptoms. Practice relaxation techniques such as yoga, meditation, or deep-breathing exercises.<br />
2. Regular Exercise: Exercise can help manage symptoms like anxiety and can support overall health. Aim for moderate-intensity exercises like walking or swimming.<br />
3. Adequate Sleep: Ensure you get enough sleep to help your body manage stress and repair itself.</p>

<h4>Natural Remedies</h4>

<p>1. Bugleweed (Lycopus virginicus): Some studies suggest that this herb can help reduce thyroid hormone levels. Always consult a healthcare provider before starting any herbal supplements.<br />
2. Lemon Balm (Melissa officinalis): Known for its calming effects, it may help manage hyperthyroid symptoms, though evidence is limited.</p>

<h4>Monitoring and Follow-Up</h4>
`
}];
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
    console.log("->", post);
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
    posts[postIndex].body = req.body.body;
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

router.get('/view/:id', (req, res) => {
    const postId = req.params.id;
    const singlepost = posts.find(post => post._id == postId);
    res.render('admin/view-post', { post:singlepost|| posts[0] });
});

module.exports = router;
