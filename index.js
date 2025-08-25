import express from "express";
import bodyParser from "body-parser";
import { localsName } from "ejs";
let app = express();
const port = 3000;
let blog = [];
let idctr = 0;
let createTtl = "", createDsc = "";
function createBlog(title, desc) {
    let blogObj = {
        id: idctr++,
        ttl: title,
        dsc: desc,
    }
    blog.push(blogObj);
}

let defaultPost1tlt = `I Tried to Impress my Date with my Culinary Skills, and I Burned Water`;
let defaultPost1desc = `Hey fellow foodies, gather 'round for a tale of culinary calamity that would make Gordon Ramsay shed a tear. So, picture this: a romantic dinner date with my crush, a beautifully set table, candles, and soft music playing in the background. I decided to take charge of the kitchen and show off my alleged culinary skills, thinking I'd impress my date with a homemade meal. What could go wrong, right? As we embarked on this culinary adventure, I decided to start with something easy - boiling water for pasta. Sounds foolproof, doesn't it? But it turns out, I have a knack for defying the odds.`;
let defaultPost2tlt = `I Pretended to Be a Penguin on a Job Interview - Now I'm the New Zoo Attraction`;
let defaultPost2desc = `Hello, my adoring fans! Allow me to regale you with the audacious tale of how my penguin impersonation turned me into the zoo's most celebrated attraction. One day, in a moment of pure genius, I transformed into the charismatic Penguin Pretender. I walked into the zoo, flaunting my exceptional penguin moves, honks, and all. The interview panel was dumbstruck, offering me a job right then and there. Fast forward to today, I'm the star of the show! My skills as the dazzling Penguin Pretender are unrivaled, drawing crowds from all over. I have a VIP enclosure, a daily 'Penguin Spectacle,' and a fervent fan following. My message to you? Dare to be extraordinary, and let your talents shine.`;


createBlog(defaultPost1tlt, defaultPost1desc);
createBlog(defaultPost2tlt, defaultPost2desc);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { blogs: blog });
})


app.post("/", (req, res) => {
    let flag = 0;
    for (let i = 0; i < blog.length; i++) {
        if (blog[i].ttl == req.body.title && blog[i].dsc == req.body.desc) {
            flag = 1;
        }
    }
    if (flag == 0) {
        createTtl = req.body.title;
        createDsc = req.body.desc;
        createBlog(createTtl, createDsc);
        res.render("index.ejs", { blogs: blog });
    } else {
        res.render("index.ejs", { blogs: blog });
    }

})

app.get("/delete/:id", (req, res) => {
    let blogWithId = blog.findIndex(b => b.id == req.params.id);
    if (blogWithId === -1) return res.status(404).send("Blog not found");
    blog.splice(blogWithId, 1);
    res.redirect("/");
})

app.get('/blog/:id', (req, res) => {
    let blogWithId = blog.find(b => b.id == req.params.id);
    if (!blogWithId) return res.status(404).send("Blog not found");
    res.render("blog.ejs", { blogWithId });
})

app.get("/edit/:id", (req, res) => {
    let blogWithId = blog.find(b => b.id == req.params.id);
    if (!blogWithId) return res.status(404).send("Blog not found");
    res.render("edit.ejs", { blogWithId })
})

app.post("/editdn/:id", (req, res) => {
    let blogWithId = blog.find(b => b.id == req.params.id);
    if (!blogWithId) return res.status(404).send("Blog not found");
    blogWithId.ttl = req.body.editTitle;
    blogWithId.dsc = req.body.editDesc;

    res.redirect("/");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.listen(port, () => {
    console.log(`app listening at ${port}`);
})