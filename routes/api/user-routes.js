const router = require("express").Router();
const {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsersFriends,
    addNewFriend,
    removeFriend
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createNewUser)

// /api/users/:userId
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends
router.route("/:userId/friends").get(getUsersFriends);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addNewFriend).delete(removeFriend)


module.exports = router;