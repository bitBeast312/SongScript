import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import fetchSongDetailQuery from '../queries/fetchSongDetail';

class SongDetail extends Component {
    constructor(props) {
        super(props);
    }

    likeLyricHandler(lyricId) {
        this.props.mutate({
            variables: {
                id: lyricId
            }
        }).then(() => this.props.data.refetch());
    }

    renderSong(data) {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{data.song.title}</h3>
                {data.song.lyrics.length === 0 && <h5>No Lyrics Added...</h5>}
                {data.song.lyrics.length !== 0 && <LyricList items={data} onLike={this.likeLyricHandler.bind(this)} />}
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }

    render() {
        const { data } = this.props;
        console.log(data);

        return (
            <div>
                {data.loading && <h3>Loading...</h3>}
                {!data.loading && this.renderSong(data)}
            </div>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
            content
        }
    }
`

export default graphql(fetchSongDetailQuery, {
    options: props => ({
        variables: {
            id: props.params.id
        }
    })
})(graphql(mutation)(SongDetail));