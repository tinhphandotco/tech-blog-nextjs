import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Container, Row, Col } from 'reactstrap';
import { Link } from '../routes';
import { getPublishedBlogs } from '../actions'
import { format } from 'date-fns';
import { shortenText } from '../helpers/utils';

class Blogs extends React.Component {

	static async getInitialProps() {
		let publishedBlogs = []
		try {
			publishedBlogs = await getPublishedBlogs();
		} catch (err) {
			console.error(err)
		}
		return { publishedBlogs };
	}

	renderBlogs = (blogs) => (
		blogs.map((blog, index) => (
			(
				<div key={index} className="post-preview">
					<Link route={`/blogs/s/${blog.slug}`}>
						<a>
							<h2 className="post-title">{blog.title}</h2>
							<h3 className="post-subtitle">{shortenText(blog.subTitle)}</h3>
						</a>
					</Link>
					{/* <p className="post-meta">Posted by
                    <a href="#"> {blog.author}, </a>
						{format(new Date(blog.createdAt), 'dd MMMM yyyy')}</p> */}
				</div>
			)
		)
		)
	)


	render() {
		const { publishedBlogs } = this.props;
		return (
			<BaseLayout title='Tinh Phan - Newest Blogs To Read' {...this.props.auth} headerType={'landing'} className="blog-listing-page">
				<div className="masthead" style={{ "backgroundImage": "url('/static/images/home-bg.jpg')" }}>
					<div className="overlay"></div>
					<Container>
						<div className="row">
							<div className="col-lg-8 col-md-10 mx-auto">
								<div className="site-heading">
									<h1>Fresh Blogs</h1>
									<span className="subheading">Programming, travelling...</span>
								</div>
							</div>
						</div>
					</Container>
				</div>
				<BasePage className="blog-body">
					<Row>
						<Col md="10" lg="8" className="mx-auto">
							{
								this.renderBlogs(publishedBlogs)
							}
							{/* <div className="clearfix">
								<a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
							</div> */}
						</Col>
					</Row>

					<footer>
						<Container>
							<Row>
								<div className="col-lg-8 col-md-10 mx-auto">
									<ul className="list-inline text-center">
										<li className="list-inline-item">
											<a target="_blank" href="https://www.facebook.com/tinh.phan.vjr">
												<span className="fa-stack fa-lg">
													<i className="fas fa-circle fa-stack-2x"></i>
													<i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
												</span>
											</a>
										</li>
										<li className="list-inline-item">
											<a target="_blank" href="https://github.com/FunctorGuys">
												<span className="fa-stack fa-lg">
													<i className="fas fa-circle fa-stack-2x"></i>
													<i className="fab fa-github fa-stack-1x fa-inverse"></i>
												</span>
											</a>
										</li>
									</ul>
									<p className="copyright text-muted">Copyright &copy; FunctorGuys 2019</p>
								</div>
							</Row>
						</Container>
					</footer>
				</BasePage>
				<style jsx>
					{`
						@import url("https://use.fontawesome.com/releases/v5.5.0/css/all.css");
					`}
				</style>
			</BaseLayout>
		)
	}
}

export default Blogs;
