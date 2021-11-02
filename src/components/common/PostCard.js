import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import CookingTime from "../../images/clock-regular.svg"
import Servings from "../../images/user-solid.svg"

const PostCard = ({ post }) => {
    const url = `/${post.data.slug}/`

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {((post.data.Cover_Image || [])[0] || {}).url ? (
                    <div
                        className="post-card-image"
                        style={{
                            backgroundImage: `url(${post.data.Cover_Image[0].url})`,
                        }}
                    />
                ) : (
                    <div className="post-card-image" />
                )}
                <h2 className="post-card-title">{post.data.Name}</h2>
            </header>
            <section className="post-card-tags">
                <div>
                    <img
                        className="post-card-tag-icon"
                        alt="Servings"
                        src={Servings}
                    />{" "}
                    {post.data.Servings}
                </div>
                <div>
                    <img
                        className="post-card-tag-icon"
                        alt="Cooking time"
                        src={CookingTime}
                    />{" "}
                    {post.data.Total_Time/60}{" "}
                </div>
            </section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left"></div>
                <div className="post-card-footer-right"></div>
            </footer>
        </Link>
    );
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.object,
        description: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard
