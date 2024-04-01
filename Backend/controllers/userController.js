import userModel from "../models/userModel.js";

//get the specific user
export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    res.status(200).send({
      sucess: true,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get all the friends of the user
export const getFriendsController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => userModel.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add or remove friends from lists
export const modifyFriendsController = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await userModel.findById(id);
    const friend = await userModel.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => userModel.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
