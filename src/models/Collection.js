'use strict';

class Collection {

  constructor(model) {
    this.model = model;
  }

  read(query, findAll) {
    if (!findAll) {
      return this.model.findOne(query);
    }
    else {
      return this.model.findAll(query);
    }
  }

  create(record) {
    return this.model.create(record);
  }

  async update(id, data) {
    await this.model.update(data, { where: { id: id } });
    return this.model.findOne({ where: { id: id } });
  }

  delete(id) {
    return this.model.destroy({ where: { id: id } });
  }

}

module.exports = Collection;