const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add text value'],
    },
    name: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          required: [true, 'Please add text value'],
        },
        name: {
          type: String,
          required: true,
        },
        likes: [
          {
            user: {
              type: mongoose.Types.ObjectId,
              ref: 'User',
            },
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
