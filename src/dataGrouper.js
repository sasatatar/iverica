export function getDataGrouper(config) {
  if (Array.isArray(config)) {
    return function (data) {
      let [firstConfig] = config;
      let keys = config.map((c) => c.key);
      let groups = groupFactory("default", firstConfig);

      data.forEach((record) => {
        let group = keys.reduce((acc, getKey, index) => {
          // config iteration is offset by 1 to keys
          // config is used for every unique key value (i.e. in sub-groups)
          // for the last key generator, config will be undefined => no grouping is done
          // at base level, mapper will receive data records, groups will be empty
          let c = config[index + 1];
          let key = getKey(record);
          if (!acc.has(key)) {
            acc.set(key, groupFactory(key, c));
          }
          // add record reference to current group level
          acc.push(record);
          acc = acc.get(key);
          return acc;
        }, groups);
        group.push(record);
      });

      return groups.processData();
    };
  } else {
    return function (data) {
      let groups = groupFactory("default", config);
      let { key: getKey } = config;
      data.forEach((record) => {
        let key = getKey(record);
        if (!groups.has(key)) {
          groups.set(key, groupFactory(key));
        }
        groups.get(key).push(record);
      });

      return groups.processData();
    };
  }
}

function groupFactory(key = "default", config = {}) {
  let map = new Map();
  let records = [];
  let groups = [];
  let groupsReducer = config.reducer || ((d) => d);
  let mapper = config.mapper || ((d) => d);

  return {
    key,
    has(key) {
      return map.has(key);
    },
    get(key) {
      return map.get(key);
    },
    set(key, record) {
      groups.push(record);
      return map.set(key, record);
    },
    push(record) {
      records.push(record);
    },
    records,
    groups,
    processData() {
      let data = groups.map((s) => {
        return mapper({
          key: s.key,
          records: s.records,
          groups: s.processData(),
        });
      });

      return groupsReducer(data);
    },
  };
}
