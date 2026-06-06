const asyncHandler =
  require("../../utils/asyncHandler");

const sendResponse =
  require("../../utils/response");

const userService =
  require("./user.service");

const createUser =
    asyncHandler(
        async (req, res) => {

        const user =
            await userService.createUser(
            req.body
            );

        sendResponse(
            res,
            201,
            "User created successfully",
            user
        );
        }
    );


const getUsers =
    asyncHandler(
    async (req, res) => {

        const result =
        await userService.getUsers({
            page:
            Number(
                req.query.page
            ) || 1,

            limit:
            Number(
                req.query.limit
            ) || 10,

            search:
            req.query.search,

            role:
            req.query.role
        });

        sendResponse(
        res,
        200,
        "Users fetched successfully",
        result
        );
    }
    );

const getUserById =
    asyncHandler(async (req, res) => {

        const user =
        await userService.getUserById(
            req.params.id
        );

        sendResponse(
        res,
        200,
        "User fetched successfully",
        user
        );
    });

const updateUser =
    asyncHandler(async (req, res) => {

        const user =
        await userService.updateUser(
            req.params.id,
            req.body
        );

        sendResponse(
        res,
        200,
        "User updated successfully",
        user
        );
    });

const deactivateUser =
  asyncHandler(async (req, res) => {

    const user =
      await userService.deactivateUser(
        req.params.id,
        req.user._id
      );

    sendResponse(
      res,
      200,
      "User deactivated successfully",
      user
    );
});

module.exports = {
createUser,
getUsers,
getUserById,
updateUser,
deactivateUser
};