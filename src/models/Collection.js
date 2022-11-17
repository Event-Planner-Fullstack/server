'use strict';

class Collection {

  constructor(model) {
    this.model = model;
  }

  read(query) {
    if (query) {
      return this.model.findOne(query);
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model.findOne(id)
      .then(record => record.update(data));
  }

  delete(id) {
    return this.model.destroy(id);
  }

}

module.exports = Collection;