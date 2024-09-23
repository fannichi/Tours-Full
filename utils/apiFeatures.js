class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //filtering the query special fields
    const queryObj = { ...this.queryString };
    const excludedFilters = ['page', 'sort', 'limit', 'fields'];
    excludedFilters.forEach((el) => delete queryObj[el]);

    // Advanced query fields filtering:
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const filteredQuery = JSON.parse(queryStr);

    this.query = this.query.find(filteredQuery);

    return this;
  }

  sort() {
    // 2 - Sorting:
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); // splitting fields coming from the request query and passing them to the mongoose query
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    // only selecting the fields that the user wants to see

    // 3 - Field limiting/ Selecting:
    if (this.queryString.fields) {
      // splitting fields coming from the request query and passing them to the mongoose query
      const selectedFields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    //4 - Pagination:

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
