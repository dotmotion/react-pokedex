import axios from "axios";

export const arraySplitter = list => {
  let chunks = [];
  let size = 5;

  while (list.length > 0) {
    chunks.push(list.splice(0, size));
  }

  return chunks;
};

export const padLeadingZeros = (num, size) => {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

// API calls

export const getList = async endpoint => {
  const { data } = await axios.get(endpoint);
  return { url: data.next, list: data.results };
};

export const getMon = async endpoint => {
  const res = await axios.get(endpoint);
  const mon = {
    num: res.data.id,
    name: res.data.name,
    weight: res.data.weight,
    height: res.data.height,
    stats: {
      hp: res.data.stats[0].base_stat,
      atk: res.data.stats[1].base_stat,
      def: res.data.stats[2].base_stat,
      spAtk: res.data.stats[3].base_stat,
      spDef: res.data.stats[4].base_stat,
      speed: res.data.stats[5].base_stat
    },
    types: res.data.types.map(t => t.type.name),
    sprite: res.data.sprites.front_default,
    img: res.data.sprites.other["official-artwork"].front_default
  };
  return mon;
};
