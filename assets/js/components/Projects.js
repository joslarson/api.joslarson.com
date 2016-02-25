import React from 'react';
import Masonry from 'react-masonry-component';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var masonryOptions = {
    transitionDuration: 0,
    isFitWidth: true,
    gutter: 20,
    itemSelector: '#masonry .project-card',
    // animationName: 'card-in',
}


var Project = React.createClass({
    getInitialState: function () {
        return {
            'name': '',
            'description': '',
            'image': '',
            'date': '',
            'link': '',
            'categories': [],
            'tags': []
        };
    },
    componentDidMount: function () {
        this.setState(this.props.data);
        setTimeout(function () {
            React.findDOMNode(this).classList.add('enter');
        }.bind(this), this.props.index * 70);
    },
    handleClickP: function () {
        this.setState({
            'name': 'Blah',
            'description': 'Test',
            'image': '',
            'date': '',
            'link': 'https://www.google.com',
            'categories': [],
            'tags': ['TestTest']
        });
    },
    render: function () {
        return (
            <article className="project-card">
                <header>
                    <a href={this.state.link}>
                        <img src={this.state.image} alt={this.state.name}/>
                        <h1>{this.state.name}</h1>
                        <div className="release">
                            <p className="date">Released Mar 2010</p>
                            <p className="version">v2.11.01</p>
                        </div>
                    </a>
                </header>
                <p className="description" onClick={this.handleClickP}>{this.state.description}</p>
                <footer>
                    <div className="tags">{this.state.tags.map(function(tag) {
                        return <a key={tag} href={`/tags/${tag}`}>#{tag}</a>;
                    })}</div>
                </footer>
            </article>
        );
    }
});


var Projects = React.createClass({
    getInitialState: function () {
        return {
            category: 'all',
            projects: []
        };
    },
    componentDidMount: function () {
        var url = this.state.category == 'all' ? this.props.source : `${this.props.source}?category=${this.state.category}`;
        $.get(url, function (results) {
            this.setState({
                category: this.state.category,
                projects: results
            });
        }.bind(this));
    },
    handleCategoryChange: function (event) {
        var category = $(event.currentTarget).data('category');
        var url = category == 'all' ? this.props.source : `${this.props.source}?category=${category}`;
        $.get(url, function (results) {
            var newState = Object.assign({}, this.state, {category: category});
            this.setState({
                category: category,
                projects: results
            });
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Masonry id="masonry" options={masonryOptions} disableImagesLoaded={false}>
                    <div className="filters">
                        <button className={'filter' + (this.state.category == 'all' ? ' selected' : '')} data-category="all" onClick={this.handleCategoryChange}>All</button>
                        <button className={'filter' + (this.state.category == 'music' ? ' selected' : '')} data-category="music" onClick={this.handleCategoryChange}>Music</button>
                        <button className={'filter' + (this.state.category == 'code' ? ' selected' : '')} data-category="code" onClick={this.handleCategoryChange}>Code</button>
                        <button className={'filter' + (this.state.category == 'design' ? ' selected' : '')} data-category="design" onClick={this.handleCategoryChange}>Design</button>
                    </div>
                    {this.state.projects.map(function(project, i) {
                        return <Project key={project.id} index={i} data={project} />;
                        // return <Project key={`${this.state.category}${project.id}`} index={i} data={project} />;
                    }.bind(this))}
                </Masonry>
            </div>
        );
    },
});


export default Projects;