const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = mongoose.Schema(
  {
    name: {
      // validate: [
      //   validator.isAlpha,
      //   'The name field must only contain characters',
      // ],
      type: String,
      trim: true,
      required: [true, 'The name field is required'],
      unique: true,
      maxLength: [
        40,
        'The name field must have less or equal than 40 characters',
      ],
      minLength: [
        10,
        'The name field must have more or equal than 10 characters',
      ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'The duration field is required'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'The maxGroupSize field is required'],
    },
    difficulty: {
      type: String,
      required: [true, 'The difficulty field is required'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'The difficulty must be either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'The rating must be above 1.0'],
      max: [5, 'The rating must be below 5.0'],
      // setter function that rounds the rating to the nearest 10th
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: {
      type: Number,
      required: [true, 'The price field is required'],
    },
    discount: {
      type: Number,
      // the below validator function only works on create and not update
      // The this keyword only points to the current document on NEW document creation
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'The discount must be below the regular price ',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'The summary field is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'The cover image field is required'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// Virtual fields
tourSchema.virtual('durationWeeks').get(function () {
  return Number((this.duration / 7).toFixed(2));
});

// Virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
});

//@ Document middleware, runs before the save command and the create command but not insertMany.
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Embedding example
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

//@ Query middleware, runs before the find command.
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// have access to all the documents that were returned by the query.
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

//@ Aggregation middleware, runs before the aggregation command.
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   // console.log(this.pipeline());
//   next();
// });

// tourSchema.pre('save', function (next) {
//   console.log('A document is being saved!');
//   next();
// });

// It doesn't have access to the this keyword, but to the newly created document.
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
