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

  async delete(id) {
    const record = await this.model.findOne({ where: { id: id } });
    await this.model.destroy({ where: { id: id } });
    return record;
  }

}

module.exports = Collection;