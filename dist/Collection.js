'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongodbCore = require('mongodb-core');

var _mongodbCore2 = _interopRequireDefault(_mongodbCore);

var _Cursor = require('./Cursor');

var _Cursor2 = _interopRequireDefault(_Cursor);

var _AggregationCursor = require('./AggregationCursor');

var _AggregationCursor2 = _interopRequireDefault(_AggregationCursor);

var _Bulk = require('./Bulk');

var _Bulk2 = _interopRequireDefault(_Bulk);

var _Utils = require('./Utils');

var Code = _mongodbCore2['default'].BSON.Code;
var ObjectID = _mongodbCore2['default'].BSON.ObjectID;

function indexName(index) {
  return _Object$keys(index).map(function (key) {
    return key + '_' + index[key];
  }).join('_');
}

function makeQuery(query) {
  if (typeof query === 'undefined') {
    return {};
  } else if (query instanceof ObjectID || typeof query !== 'object') {
    return { _id: query };
  } else {
    return query;
  }
}

var Collection = (function () {
  function Collection(db, collectionName) {
    _classCallCheck(this, Collection);

    this.initializeOrderedBulkOp = function () {
      return new _Bulk2['default'](this, true);
    };

    this.initializeUnorderedBulkOp = function () {
      return new _Bulk2['default'](this, false);
    };

    this.db = db;
    this.collectionName = collectionName;
    this.fullCollectionName = db.config.dbName + '.' + collectionName;
    this.defaultWriteOptions = { writeConcern: db.writeConcern, ordered: true };
  }

  _createClass(Collection, [{
    key: 'aggregate',
    value: function aggregate() {
      var pipeline,
          args$2$0 = arguments;
      return _regeneratorRuntime.async(function aggregate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            pipeline = Array.prototype.slice.call(args$2$0);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.runCommand('aggregate', { pipeline: pipeline }));

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent.result);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'aggregateCursor',
    value: function aggregateCursor() {
      var pipeline = Array.prototype.slice.call(arguments);
      return new _Cursor2['default'](this, this.fullCollectionName, {
        aggregate: this.collectionName,
        pipeline: pipeline,
        cursor: { batchSize: 1000 }
      }, { cursor: { batchSize: 1000 } });
    }
  }, {
    key: 'count',
    value: function count(query) {
      return _regeneratorRuntime.async(function count$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.find(query).count());

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'createIndex',
    value: function createIndex(index, options) {
      return _regeneratorRuntime.async(function createIndex$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            options = _lodash2['default'].extend({ name: indexName(index), key: index }, options || {});
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.runCommand('createIndexes', { indexes: [options] }));

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'distinct',
    value: function distinct(key, query) {
      return _regeneratorRuntime.async(function distinct$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('distinct', { key: key, query: query }));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent.values);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'drop',
    value: function drop() {
      return _regeneratorRuntime.async(function drop$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.runCommand('drop'));

          case 3:
            return context$2$0.abrupt('return', true);

          case 6:
            context$2$0.prev = 6;
            context$2$0.t0 = context$2$0['catch'](0);

            if (!(context$2$0.t0.name === 'MongoError' && context$2$0.t0.message === 'ns not found')) {
              context$2$0.next = 12;
              break;
            }

            return context$2$0.abrupt('return', false);

          case 12:
            throw context$2$0.t0;

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 6]]);
    }
  }, {
    key: 'dropIndex',
    value: function dropIndex(index) {
      return _regeneratorRuntime.async(function dropIndex$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('dropIndexes', { index: index }));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'dropIndexes',
    value: function dropIndexes() {
      return _regeneratorRuntime.async(function dropIndexes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('dropIndexes', { index: '*' }));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'ensureIndex',
    value: function ensureIndex(index, options) {
      return _regeneratorRuntime.async(function ensureIndex$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.createIndex(index, options));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'find',
    value: function find(query, projection, options) {
      query = makeQuery(query);
      projection = projection || null;

      options = _lodash2['default'].extend({
        find: this.collectionName,
        query: query,
        fields: projection
      }, options || {});

      return new _Cursor2['default'](this, this.fullCollectionName, options);
    }
  }, {
    key: 'findAndModify',
    value: function findAndModify(options) {
      var result;
      return _regeneratorRuntime.async(function findAndModify$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('findAndModify', options));

          case 2:
            result = context$2$0.sent;

            if (!result.lastErrorObject) {
              result.lastErrorObject = { n: 0 };
            }
            return context$2$0.abrupt('return', result);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'findOne',
    value: function findOne(query, projection) {
      var cursor, result;
      return _regeneratorRuntime.async(function findOne$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            query = makeQuery(query);
            cursor = this.find(query, projection).limit(1);
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(cursor.next());

          case 4:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', result);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getIndexes',
    value: function getIndexes() {
      var ns;
      return _regeneratorRuntime.async(function getIndexes$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            ns = this.db.config.dbName + '.system.indexes';
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(new _Cursor2['default'](this, ns, {
              find: ns,
              query: { ns: this.fullCollectionName },
              projection: {}
            }).toArray());

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'group',
    value: function group(doc) {
      var cmd;
      return _regeneratorRuntime.async(function group$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            cmd = {
              group: {
                ns: this.collectionName,
                key: doc.key,
                initial: doc.initial,
                $reduce: new Code(doc.reduce.toString()),
                out: 'inline',
                cond: doc.cond
              }
            };

            if (doc.finalize) {
              cmd.group.finalize = new Code(doc.finalize.toString());
            }
            if (doc.keys) {
              cmd.group.$keyf = new Code(doc.keys.toString());
            }

            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.db.runCommand(cmd));

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent.retval);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'insert',
    value: function insert(docs) {
      var self, docList, i, server;
      return _regeneratorRuntime.async(function insert$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            self = this;
            docList = docs;

            if (!Array.isArray(docs)) {
              docList = [docs];
            }

            for (i = 0; i < docList.length; ++i) {
              if (!docList[i]._id) {
                docList[i]._id = ObjectID.createPk();
              }
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(self.db.connect());

          case 6:
            server = context$2$0.sent;
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
              server.insert(self.fullCollectionName, docList, self.defaultWriteOptions, function (error, result) {
                if (error) {
                  reject(error);
                } else if (result.result.code) {
                  reject((0, _Utils.toError)(result.result));
                } else if (result.result.writeErrors) {
                  reject((0, _Utils.toError)(result.result.writeErrors[0]));
                } else {
                  resolve(docs);
                }
              });
            }));

          case 9:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'isCapped',
    value: function isCapped() {
      var ns, result;
      return _regeneratorRuntime.async(function isCapped$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            ns = this.db.config.dbName + '.system.namespaces';
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(new _Cursor2['default'](this, ns, {
              find: ns,
              query: { name: this.fullCollectionName },
              projection: {}
            }).toArray());

          case 3:
            result = context$2$0.sent;
            return context$2$0.abrupt('return', !!(result[0].options && result[0].options.capped));

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'mapReduce',
    value: function mapReduce(map, reduce, options) {
      return _regeneratorRuntime.async(function mapReduce$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            options = options || {};
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.runCommand('mapReduce', {
              map: map.toString(),
              reduce: reduce.toString(),
              query: options.query || {},
              out: options.out
            }));

          case 3:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'reIndex',
    value: function reIndex() {
      return _regeneratorRuntime.async(function reIndex$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('reIndex'));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'remove',
    value: function remove(query, justOne) {
      var self,
          server,
          args$2$0 = arguments;
      return _regeneratorRuntime.async(function remove$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            query = makeQuery(query);

            if (args$2$0.length === 0) {
              query = {};
            }
            if (args$2$0.length < 2) {
              justOne = false;
            }

            self = this;
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(self.db.connect());

          case 6:
            server = context$2$0.sent;
            context$2$0.next = 9;
            return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
              server.remove(self.fullCollectionName, [{ q: query, limit: justOne ? 1 : 0 }], self.defaultWriteOptions, function (error, result) {
                if (error) {
                  reject(error);
                } else {
                  resolve(result.result);
                }
              });
            }));

          case 9:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 10:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'runCommand',
    value: function runCommand(command, options) {
      var temp;
      return _regeneratorRuntime.async(function runCommand$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            temp = {};

            temp[command] = this.collectionName;
            options = _lodash2['default'].extend(temp, options || {});
            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(this.db.runCommand(options));

          case 5:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'save',
    value: function save(doc) {
      return _regeneratorRuntime.async(function save$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!doc._id) {
              context$2$0.next = 6;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.update({ _id: doc._id }, doc, { upsert: true }));

          case 3:
            return context$2$0.abrupt('return', doc);

          case 6:
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.insert(doc));

          case 8:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'stats',
    value: function stats() {
      return _regeneratorRuntime.async(function stats$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.runCommand('collStats'));

          case 2:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.collectionName;
    }
  }, {
    key: 'update',
    value: function update(query, _update, options) {
      var self, server;
      return _regeneratorRuntime.async(function update$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            query = makeQuery(query);

            self = this;

            if (!options) {
              options = {};
            }

            context$2$0.next = 5;
            return _regeneratorRuntime.awrap(self.db.connect());

          case 5:
            server = context$2$0.sent;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
              options = _lodash2['default'].extend({ q: query, u: _update }, options);
              server.update(self.fullCollectionName, [options], self.defaultWriteOptions, function (error, result) {
                if (error) {
                  reject(error);
                } else if (result.result.code) {
                  reject((0, _Utils.toError)(result.result));
                } else if (result.result.writeErrors) {
                  reject((0, _Utils.toError)(result.result.writeErrors[0]));
                } else {
                  result = result.result;
                  // backwards compatibility
                  if (!result.updatedExisting && result.nModified === result.n) {
                    result.updatedExisting = true;
                  }
                  resolve(result);
                }
              });
            }));

          case 8:
            return context$2$0.abrupt('return', context$2$0.sent);

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Collection;
})();

exports['default'] = Collection;
;
module.exports = exports['default'];
