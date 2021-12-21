import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as articlesActions from '../../actions/articlesActions';
import ArticlesList from './ArticlesList';
import { Link } from 'react-router';


class ArticlesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.props.actions.getArticles();

    console.log('--- ArticlesPage.js: this.deleteArticle = this.deleteArticle.bind(this);');
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.articles != nextProps.articles) {
      this.setState({
        articles: Object.assign({}, nextProps.articles)
      });
    }
  }

  articleRow(article, index) {
    return <div key={index}>{article.title}</div>;
  }

  deleteArticle(event, articleId) {
    console.log('--- ArticlesPage.js: deleteArticle()');

    event.preventDefault();
    this.props.actions.deleteArticle(articleId)
      .then(() => console.log('Success: article deleted'))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const {articles} = this.props;

    return (
      <div>
        <h1>Articles</h1>
        <Link to="/article" className="btn btn-primary">Create</Link>
        <br/><br/>
        <ArticlesList articles={articles} onDelete={this.deleteArticle}/>
      </div>
    );
  }
}
console.log('--- ArticlesPage.js: onDelete={this.deleteArticle}');

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(articlesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesPage);
