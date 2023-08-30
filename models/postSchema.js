import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who created the post
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to Users who liked the post
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);


// If wanted
//   comments: [
//     {
//       user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//       text: { type: String, required: true },
//       createdAt: { type: Date, default: Date.now },
//     }
//   ],