const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, popOptions) =>
  catchAsync(async function (req, res, next) {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async function (req, res, next) {
    // To allow for nested get reviews on tour:
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }

    //Executing the query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const docs = await features.query;

    //Sending the response
    res
      .status(200)
      .json({ status: 'Success', results: docs?.length, data: docs });
  });

exports.createOne = (Model) =>
  catchAsync(async function (req, res, next) {
    const newDocument = await Model.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        data: newDocument,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async function (req, res, next) {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({ status: 'Success', data: null });
  });

exports.updateOne = (Model) =>
  catchAsync(async function (req, res, next) {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'Success',
      data: {
        data: updatedDoc,
      },
    });
  });
