import mongoose from '../db';

const LevelsSchema = new mongoose.Schema({
  deckId: String,
  userId: String,
  score: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
}, { timestamps: true }
);

export default mongoose.model('Levels', LevelsSchema);
