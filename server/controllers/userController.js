import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendConfirmationEmail } from "../config/nodemailer.config.js";
import { User } from "../models/userModel.js";
import { FriendRequest } from "../models/friendRequestModel.js";
import mongoose from "mongoose";

//import { uploadAvatar } from "../config/uploader.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("Унесите сва поља");
  }

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  if (usernameExists) {
    res.status(400);
    throw new Error("Корисник већ постоји са тим корисничким именом");
  }
  if (emailExists) {
    res.status(400);
    throw new Error("Корисник већ постоји са тим имејлом");
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    confirmationCode: token,
    username,
    password: hashedPassword,
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      message:
        "Корисник је регистрован успјешно! Молим Вас провјерите Ваш имејл!",
    });

    sendConfirmationEmail(user.username, user.email, user.confirmationCode);
  } else {
    res.status(400);
    throw new Error("Кориснички подаци нису валидни!");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { userDetail, password } = req.body;

  const user = await User.findOne({
    $or: [
      {
        username: userDetail,
      },
      {
        email: userDetail,
      },
    ],
  });

  if (!user) {
    res.status(401);
    throw new Error(
      "Нешто сте погријешили или налог са овим корисничким именом и шифром не постоји"
    );
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Погрешна лозинка!");
  }

  if (user.status != "Active") {
    res.status(401);
    throw new Error("Налог је на чекању. Верификујте своју имејл адресу!");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const friends = await FriendRequest.find({
      $and: [
        {
          $or: [{ recipient: user._id }, { requester: user._id }],
        },
        {
          status: 2,
        },
      ],
    });
    const receivedRequests = await FriendRequest.find({
      $and: [
        {
          recipient: user._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (receivedRequests) {
      var receivedRequestsArray = receivedRequests.map((request) => {
        return request.requester;
      });
    }
    const sentRequests = await FriendRequest.find({
      $and: [
        {
          requester: user._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (sentRequests) {
      var sentRequestsArray = sentRequests.map((request) => {
        return request.recipient;
      });
    }
    if (friends) {
      var friendsArray = friends.map((friend) => {
        if (friend.requester.toString() === user.id) {
          return friend.recipient.toString();
        } else {
          return friend.requester.toString();
        }
      });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
      avatarUrl: user?.avatarUrl,
      friends: friendsArray ? friendsArray : [],
      receivedRequests: receivedRequestsArray ? receivedRequestsArray : [],
      sentRequests: sentRequestsArray ? sentRequestsArray : [],
    });
  } else {
    res.status(401);
    throw new Error("Нешто сте погријешили");
  }
});

export const getOtherUser = asyncHandler(async (req, res) => {
  const otherUserId = new mongoose.Types.ObjectId(req.params.userId);
  const otherUser = await User.findById(req.params.userId);

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен!");
  }

  if (user) {
    const friends = await FriendRequest.find({
      $and: [
        {
          $or: [{ recipient: otherUserId._id }, { requester: otherUserId._id }],
        },
        {
          status: 2,
        },
      ],
    });
    const receivedRequests = await FriendRequest.find({
      $and: [
        {
          recipient: otherUserId._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (receivedRequests) {
      var receivedRequestsArray = receivedRequests.map((request) => {
        return request.requester;
      });
    }
    const sentRequests = await FriendRequest.find({
      $and: [
        {
          requester: otherUserId._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (sentRequests) {
      var sentRequestsArray = sentRequests.map((request) => {
        return request.recipient;
      });
    }
    if (friends) {
      var friendsArray = friends.map((friend) => {
        if (friend.requester.toString() === otherUserId.id) {
          return friend.recipient.toString();
        } else {
          return friend.requester.toString();
        }
      });
    }
    res.status(200).json({
      _id: otherUser._id,
      name: otherUser.name,
      username: otherUser.username,
      email: otherUser.email,
      avatarUrl: otherUser?.avatarUrl,
      friends: friendsArray ? friendsArray : [],
      receivedRequests: receivedRequestsArray ? receivedRequestsArray : [],
      sentRequests: sentRequestsArray ? sentRequestsArray : [],
    });
  } else {
    res.status(401);
    throw new Error("Нешто сте погријешили");
  }
});

export const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен!");
  }

  user.status = "Active";
  try {
    await user.save();
    res.status(200).json({
      message: "Успјешна верификација!",
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

export const getUserData = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (id !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  const user = await User.findById(id);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  res.status(200).json({
    username: user.username,
    email: user.email,
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const _id = new mongoose.Types.ObjectId(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { pageSize, page, search } = req.query;

  const users = await User.find({
    $and: [
      {
        username: new RegExp(search, "i"),
      },
      { _id: { $ne: _id } },
    ],
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const responseUsers = await Promise.all(
    users.map(async (user) => {
      var friends = await FriendRequest.find({
        $and: [
          {
            $or: [{ recipient: user._id }, { requester: user._id }],
          },
          {
            status: 2,
          },
        ],
      });
      return {
        _id: user._id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
        friends,
      };
    })
  );

  res.status(200).json({
    responseUsers,
  });
});

export const getFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const _id = new mongoose.Types.ObjectId(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { pageSize, page, friends } = req.query;

  const friendsFromBase = await User.find({ _id: { $in: friends } })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const friendsArray = friendsFromBase.map((friend) => {
    return {
      _id: friend._id,
      email: friend.email,
      username: friend.username,
      avatarUrl: friend.avatarUrl,
    };
  });

  res.status(200).json({
    friendsArray,
  });
});

export const getFriendsRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const _id = new mongoose.Types.ObjectId(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { pageSize, page, friendsRequest } = req.query;

  const friendsRequestFromBase = await User.find({
    _id: { $in: friendsRequest },
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const friendsRequestArray = friendsRequestFromBase.map((friend) => {
    return {
      _id: friend._id,
      email: friend.email,
      username: friend.username,
      avatarUrl: friend.avatarUrl,
    };
  });

  res.status(200).json({
    friendsRequestArray,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { username, password, email } = req.body;
  const _id = new mongoose.Types.ObjectId(req.user.id);
  const existUsername = await User.find({ _id: { $ne: _id }, username });
  const existEmail = await User.find({ _id: { $ne: _id }, email });

  if (!username && !password && !email) {
    res.status(401);
    throw new Error("Није могуће извршити измјену корисника!");
  }

  if (existUsername.length > 0) {
    res.status(401);
    throw new Error("Корисник са тим корисничким именом већ постоји!");
  }

  if (existEmail.length > 0) {
    res.status(401);
    throw new Error("Корисник са тим имејлом већ постоји!");
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }
  if (email && email != user.email) {
    req.body.email = email;
  }

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,

    { new: true }
  );

  const friends = await FriendRequest.find({
    $and: [
      {
        $or: [{ recipient: user._id }, { requester: user._id }],
      },
      {
        status: 2,
      },
    ],
  });
  const receivedRequests = await FriendRequest.find({
    $and: [
      {
        recipient: user._id,
      },
      {
        status: 1,
      },
    ],
  });
  if (receivedRequests) {
    var receivedRequestsArray = receivedRequests.map((request) => {
      return request.requester;
    });
  }
  const sentRequests = await FriendRequest.find({
    $and: [
      {
        requester: user._id,
      },
      {
        status: 1,
      },
    ],
  });
  if (sentRequests) {
    var sentRequestsArray = sentRequests.map((request) => {
      return request.recipient;
    });
  }
  if (friends) {
    var friendsArray = friends.map((friend) => {
      if (friend.requester.toString() === user.id) {
        return friend.recipient.toString();
      } else {
        return friend.requester.toString();
      }
    });
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
    isAdmin: updatedUser.isAdmin,
    avatarUrl: updatedUser?.avatarUrl,
    friends: friendsArray ? friendsArray : [],
    receivedRequests: receivedRequestsArray ? receivedRequestsArray : [],
    sentRequests: sentRequestsArray ? sentRequestsArray : [],
  });
});

export const uploadUserAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const file = req.file;

  console.log(file);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (!file) {
    res.status(401);
    throw new Error("No File");
  }

  if (user.avatarUrl) {
    if (fs.existsSync(`../${user.avatarUrl.trim()}`)) {
      fs.unlink(`../${user.avatarUrl.trim()}`, (err) => {
        console.log(err);
      });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { avatarUrl: `${file.destination.split("/")[1]}/${file.filename} ` },

    { new: true }
  );

  const friends = await FriendRequest.find({
    $and: [
      {
        $or: [{ recipient: user._id }, { requester: user._id }],
      },
      {
        status: 2,
      },
    ],
  });
  const receivedRequests = await FriendRequest.find({
    $and: [
      {
        recipient: user._id,
      },
      {
        status: 1,
      },
    ],
  });
  if (receivedRequests) {
    var receivedRequestsArray = receivedRequests.map((request) => {
      return request.requester;
    });
  }
  const sentRequests = await FriendRequest.find({
    $and: [
      {
        requester: user._id,
      },
      {
        status: 1,
      },
    ],
  });
  if (sentRequests) {
    var sentRequestsArray = sentRequests.map((request) => {
      return request.recipient;
    });
  }
  if (friends) {
    var friendsArray = friends.map((friend) => {
      if (friend.requester.toString() === user.id) {
        return friend.recipient.toString();
      } else {
        return friend.requester.toString();
      }
    });
  }

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    token: generateToken(updatedUser._id),
    isAdmin: updatedUser.isAdmin,
    avatarUrl: updatedUser.avatarUrl,
    friends: friendsArray ? friendsArray : [],
    receivedRequests: receivedRequestsArray ? receivedRequestsArray : [],
    sentRequests: sentRequestsArray ? sentRequestsArray : [],
  });
});

export const sendFriendRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const requesterId = new mongoose.Types.ObjectId(req.user.id);
  const { id } = req.body;

  const receiverId = new mongoose.Types.ObjectId(id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  const friendRequest = await FriendRequest.create({
    requester: requesterId,
    recipient: receiverId,
    status: 1,
  });

  if (friendRequest) {
    const sentRequests = await FriendRequest.find({
      $and: [
        {
          requester: user._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (sentRequests) {
      var sentRequestsArray = sentRequests.map((request) => {
        return request.recipient;
      });
    }
    res.status(200).json({
      sentRequests: sentRequestsArray ? sentRequestsArray : [],
    });
  }
});

export const cancelFriendRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const requesterId = new mongoose.Types.ObjectId(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const { id } = req.query;
  const receiverId = new mongoose.Types.ObjectId(id);
  const existingRequest = await FriendRequest.findOneAndDelete({
    requester: requesterId,
    recipient: receiverId,
    status: 1,
  });

  if (existingRequest) {
    const sentRequests = await FriendRequest.find({
      $and: [
        {
          requester: user._id,
        },
        {
          status: 1,
        },
      ],
    });
    if (sentRequests) {
      var sentRequestsArray = sentRequests.map((request) => {
        return request.recipient;
      });
    }
    res.status(200).json({
      sentRequests: sentRequestsArray ? sentRequestsArray : [],
    });
  }
});

export const acceptFriendRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const receiverId = new mongoose.Types.ObjectId(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  const { id } = req.query;

  const requesterId = new mongoose.Types.ObjectId(id);
  const existingRequest = await FriendRequest.findOneAndUpdate(
    {
      requester: requesterId,
      recipient: receiverId,
    },
    { status: 2 }
  );

  if (existingRequest) {
    const friends = await FriendRequest.find({
      $and: [
        {
          $or: [{ recipient: user._id }, { requester: user._id }],
        },
        {
          status: 2,
        },
      ],
    });
    if (friends) {
      var friendsArray = friends.map((friend) => {
        if (friend.requester.toString() === user.id) {
          return friend.recipient.toString();
        } else {
          return friend.requester.toString();
        }
      });
      const receivedRequests = await FriendRequest.find({
        $and: [
          {
            recipient: user._id,
          },
          {
            status: 1,
          },
        ],
      });
      if (receivedRequests) {
        var receivedRequestsArray = receivedRequests.map((request) => {
          return request.requester;
        });
      }
    }
    res.status(200).json({
      friends: friendsArray ? friendsArray : [],
      receivedRequests: receivedRequestsArray ? receivedRequestsArray : [],
    });
  }
});

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
