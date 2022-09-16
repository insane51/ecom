const router = require(`express`).Router();
const mongoose = require(`mongoose`);
const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

//CREATE
router.post('/', verifyToken, async (req, res) => {
    // console.log("order1");
    const newOrder = new Order(req.body);
    // console.log(newOrder);

    try {
        const savedOrder = await newOrder.save();
        // console.log("order3");
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedOrder);

    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE 
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order Deleted");

    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const Orders = await Order.find({ serId: req.params.userId });
        res.status(200).send(Orders);

    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const Orders = awaitOrders.find();

        res.status(200).send(Orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;