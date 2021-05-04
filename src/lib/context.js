import React, { Component } from "react";

import { arraySplitter, getList, getMon } from "./utils";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const { count, chunks } = state;
      let { update } = state;
      let newCount = count;
      action.data === "next" ? newCount++ : newCount--;
      if (action.data === "next" && count >= chunks.length - 2) {
        update = true;
      }
      let list = chunks[newCount];
      list.sort(function (a, b) {
        return a.num - b.num;
      });
      return {
        ...state,
        update,
        count: newCount,
        list
      };

    case "SELECT":
      return {
        ...state,
        current: action.data
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    loading: true,
    update: false,
    modal: false,
    lang: "EN",
    next: "",
    list: undefined,
    current: null,
    count: 0,
    chunks: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    // FIXME: Fetch localStorage for [lang] flag
    //
    const { url, list } = await getList("https://pokeapi.co/api/v2/pokemon");

    const chunks = await this.populate(list);
    const newList = chunks[0];

    this.setState({ chunks, next: url, list: newList, loading: false });
  }

  componentDidUpdate() {
    if (this.state.update) {
      this.updateChunks();
      this.setState({ update: false });
    }
  }

  async populate(list) {
    const splitList = arraySplitter(list);
    let chunks = [];

    splitList.map(chunk => {
      let newChunk = [];
      chunk.map(async mon => {
        let newMon = await getMon(mon.url);
        newChunk.push(newMon);
        return null;
      });
      newChunk.sort(function (a, b) {
        return a.num - b.num;
      });
      chunks.push(newChunk);
      return null;
    });

    return chunks;
  }

  async updateChunks() {
    const { next, chunks } = this.state;
    const { list, url } = await getList(next);
    const newChunks = await this.populate(list);
    console.log(
      "🚀 ~ file: context.js ~ line 92 ~ updateChunks ~ newChunks",
      newChunks
    );
    const updatedChunks = [...chunks, ...newChunks];

    this.setState({ next: url, chunks: updatedChunks });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
