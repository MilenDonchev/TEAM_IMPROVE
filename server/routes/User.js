const express = require('express');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const { User } = require('../models/User');
const { validate } = require('../controllers/UserValidator');
const { generateAuthToken } = require('../controllers/jwt');

const router = express.Router();

const MB = 1000000;

// Register a USER.
router.post('/', async (req, res) => {
    let user = await User.find({ email: req.body.email });
    if (_.isArray(user) && !_.isEmpty(user)) {
        res.status(400).send('Вече има потребител регистриран с този имейл.');
        return;
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    user = new User(_.pick(req.body, ['name', 'email', 'type', 'password']));

    const token = generateAuthToken(user);

    const salt = bcrypt.genSaltSync();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.send(token);
});

// Add and update the USER Avatar.
router.put('/update-avatar', async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    const allowedImageFormats = ["image/jpeg", "image/png", "image/jpg"];

    form.parse(req, async (err, fields, files) => {

        const user = await User.findOne({ email: fields.email });
        if (!user) return res.status(400).send("Не е открит потребител с този имейл.");

        const newURL = `${process.env.API_URL}/user/avatar/${user._id}/${Math.floor(Math.random() * 900)}`;

        if (err) return res.status(400).send("Възникна проблем при качването на това изображение.");
        if (!files.avatar) return res.status(400).send("Не сте избрали файл, който да бъде качен.");
        if (files.avatar?.size > MB) return res.status(400).send("Файлът не може да бъде по-голям от 1МБ.");
        if (!_.includes(allowedImageFormats, files.avatar?.type)) return res.status(400).send(
            "Допустими са само изображения с формати .jpg и .png"
        )

        await User.updateOne({ email: fields.email }, {
            $set: {
                avatar: { data: fs.readFileSync(files.avatar?.path), contentType: files.avatar?.type },
                avatar_url: newURL
            },
        });
        res.send(newURL);
    });
});

// Get the USER avatar image metadata from the DB.
router.get('/avatar/:id/:random', async (req, res) => {
    const user = await User.findById(req.params.id).select('avatar');
    if (!user) return res.status(404).send("Потребителят не е намерен.");

    res.header('Content-Type', user.avatar.contentType).send(user.avatar.data);
});

// Fetch USER Data.
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('_id name email avatar_url type avatar_static');
    if (!user) return res.status(404).send("Потребителят не е намерен.");
    res.send(user);
});


// Delete USER avatar img.
router.put('/:id', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, {
        $set: {
            avatar: null,
            avatar_url: null
        }
    });
    res.send('success');
});

router.put('/static-avatar/:id', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, {
        $set: {
            avatar: null,
            avatar_url: null,
            avatar_static: req.body.staticAvatar
        }
    });
    res.send('static avatar successfully changed');
});

router.put('/name/:id', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } });
    res.send('name successfully changed');
});

module.exports = router;