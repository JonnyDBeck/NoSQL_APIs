const Thought = require('../models/Thought');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get one thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .populate('reactions')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        Thought.updateOne({ _id: req.params.thoughtId }, req.body)
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete Thought
    deleteThought(req, res) {
        Thought.deleteOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // reaction controllers
    // Add reaction
    addReaction(req, res) {
        Thought.updateOne({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove reaction
    removeReaction(req, res) {
        Thought.updateOne({ _id: req.params.thoughtId }, { $pull: { reactions: {_id : req.params.reactionId} }})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}