import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import fetchSongDetailQuery from '../queries/fetchSongDetail';

class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: ''
        }
    }

    lyricsChangeHandler(event) {
        this.setState({
            lyric: event.target.value
        })
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                id: this.props.songId,
                content: this.state.lyric
            },
            // refetchQueries: [{ query: fetchSongDetailQuery, variables: { id: this.props.songId } }]
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <label>Add Lyric: </label>
                    <input onChange={this.lyricsChangeHandler.bind(this)} value={this.state.lyric} />

                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddLyrics($id: ID, $content: String) {
        addLyricToSong(songId: $id, content: $content) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`

export default graphql(mutation)(LyricCreate);