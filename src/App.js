import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import './App.css';
import { SearchBar, GifsList, GifItem, CustomModal } from './Components';

const giphyApiUrl = 'http://api.giphy.com/v1/gifs/search';
const gyphyApiKey = 'dc6zaTOxFJmzC';

const debouncedTime = 300;

class App extends Component {
	state = {
		searchString: '',
		gifs: [],
		selectedGif: '',
		isModalOpen: false
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

	handleClickImage = (event) => {
		const { id } = event.target.dataset;
		this.setState({
			selectedGif: id,
			isModalOpen: true
		})
	}

	handleCloseModal = () => {
		this.setState({
			isModalOpen: false
		})
	}

	renderGifItems = () => {
		return this.state.gifs.map((gif, index) => {
			return <GifItem
				key={gif.id}
				id={gif.id}
				src={gif.images.preview_gif.url}
				alt={gif.slug}
				onClick={this.handleClickImage}
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
				<CustomModal
					isModalOpen={this.state.isModalOpen}
					onClose={this.handleCloseModal}
				>
					<p>content</p>
					<button onClick={this.handleCloseModal} >Close</button>
				</CustomModal>
      </div>
    );
  }
}

export default App;
