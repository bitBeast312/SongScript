import React, { Component } from 'react';

class LyricList extends Component {
    render() {
        return (
            <ul className='collection'>
                {this.props.items.song.lyrics.map(lyric => <li key={lyric.id} className='collection-item'>{lyric.content} <span className='right likes'>{lyric.likes}</span><i className='material-icons right' onClick={this.props.onLike.bind(this, lyric.id)}>thumb_up</i></li>)}
            </ul>
        )
    }
}

export default LyricList;