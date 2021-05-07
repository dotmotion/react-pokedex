import React, { Component, Suspense } from "react";
import "./App.css";
import "./i18n";

import { arraySplitter, getList, getMon } from "./lib/utils";

const Display = React.lazy(() => import("./components/Display"));
const List = React.lazy(() => import("./components/List"));

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      next: "",
      list: undefined,
      current: null,
      count: 0,
      chunks: []
    };
  }
  async componentDidMount() {
    const { url, list } = await getList("https://pokeapi.co/api/v2/pokemon");

    const chunks = await this.populate(list);
    const newList = chunks[0];

    this.setState({
      chunks,
      next: url,
      list: newList,
      loading: false
    });
  }

  populate = async list => {
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
  };

  updateChunks = async () => {
    const { next, chunks } = this.state;
    const { list, url } = await getList(next);
    const newChunks = await this.populate(list);
    const updatedChunks = [...chunks, ...newChunks];

    this.setState({ next: url, chunks: updatedChunks });
  };

  handleChange = dir => {
    const { count, chunks } = this.state;
    let newCount = count;
    dir === "next" ? newCount++ : newCount--;

    if (dir === "next" && newCount >= chunks.length - 2) {
      this.updateChunks();
    }

    let list = chunks[newCount];
    list.sort(function (a, b) {
      return a.num - b.num;
    });

    this.setState({ list, count: newCount });
  };

  handleSelect = mon => {
    this.setState({ current: mon });
  };

  render() {
    const { loading, list, current, count, chunks } = this.state;
    return (
      <div className="App">
        <Suspense
          fallback={
            <div className="nes-container is-rounded is-dark">Loading...</div>
          }
        >
          {!loading && (
            <main>
              <Display mon={current} />
              <List
                list={list}
                handleChange={this.handleChange}
                handleSelect={this.handleSelect}
                count={count}
                disabled={count >= chunks.length - 1}
              />
            </main>
          )}
        </Suspense>
      </div>
    );
  }
}
