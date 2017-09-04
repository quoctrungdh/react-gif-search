import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import './App.css';
import { SearchBar, GifsList, GifItem } from './Components';

const giphyApiUrl = 'http://api.giphy.com/v1/gifs/search';
const gyphyApiKey = 'dc6zaTOxFJmzC';

const debouncedTime = 300;

class App extends Component {
	state = {
		searchString: '',
		gifs: []
	}

	handleSearch = () => {
		const { searchString } = this.state;

		fetch(`${giphyApiUrl}?api_key=${gyphyApiKey}&q=${searchString}`, {
			method: 'get'
		}).then(res => res.json())
		.then(res => this.setState({ gifs: res.data }))
	}

	debouncedInputChange = debounce(({ target }) => {
		this.setState({
			searchString: target.value
		}, this.handleSearch);
	}, debouncedTime)

	handleInputChange = event => {
		event.persist();
		this.debouncedInputChange(event);
	}

	renderGifItems = () => {
		return this.state.gifs.map((gif, index) => {
			return <GifItem
				key={gif.id}
				src={gif.images.preview_gif.url}
				alt={gif.slug}
			/>
		})
	}

  render() {
    return (
      <div className="App">
				<SearchBar
					onChange={this.handleInputChange}
				/>
				<GifsList>
					{this.renderGifItems()}
				</GifsList>
      </div>
    );
  }
}

export default App;
