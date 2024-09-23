const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewsSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      requires: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      requires: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewsSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
reviewsSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats.at(0).nRating,
      ratingsAverage: stats.at(0).avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5, // Default rating when no reviews are left
    });
  }
};

reviewsSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// Instead of executing the query twice, store the ID and pass it to the post middleware
reviewsSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery());
  next();
});

reviewsSchema.post(/^findOneAnd/, async function () {
  if (this.r) {
    await this.r.constructor.calcAverageRatings(this.r.tour);
  }
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;
