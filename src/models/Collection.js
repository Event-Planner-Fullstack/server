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

  async update(id, data) {
    const update = await this.model.update(data, { where: { id: id } });
    console.log(update);
    const record = await this.read({ where: { id: id } });
    console.log(record);
    return record;
  }

  delete(id) {
    return this.model.destroy(id);
  }

}

module.exports = Collection;