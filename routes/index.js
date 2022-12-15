const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);


router.use("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exists",
    });
});

module.exports = router;