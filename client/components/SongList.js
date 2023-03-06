import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {
    constructor(props) {
        super(props);
    }

    clickHandler(songId) {
        this.props.mutate({
            variables: {
                id: songId
            }
        }).then(() => this.props.data.refetch());
    }

    songDetailClickHandler(songId) {
        console.log("Clicked");
        hashHistory.push(`/songs/${songId}`);
    }

    renderSongs() {
        return this.props.data.songs.map(song => <li key={song.id} className="collection-item"><span onClick={() => this.songDetailClickHandler(song.id)}>{song.title}</span><i className='material-icons right' onClick={() => this.clickHandler(song.id)}>delete</i></li>)
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {!this.props.data.loading && this.renderSongs()}
                    {this.props.data.loading && <div>Loading...</div>}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right"><i className='material-icons'>add</i></Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
            title
        }
    }
`;

// export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
export default graphql(fetchSongsQuery)(graphql(mutation)(SongList));