const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thoughts-routes");


router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

router.use("*", (req,res) => {
    res.status(404).json({
        message: "Route not found",
    });
    return;
});

module.exports = router;
