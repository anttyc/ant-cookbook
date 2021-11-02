import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import { Layout } from "../components/common";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data }) => {
    const post = data.airtable;

    return (
        <>
            <Helmet>
                {/* <style type="text/css">{`${post.codeinjection_styles}`}</style> */}
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {((post.data.Cover_Image || [])[0] || {}).url ? (
                            <figure className="post-feature-image">
                                <img
                                    src={`${post.data.Cover_Image[0].url}`}
                                    alt={post.name}
                                />
                            </figure>
                        ) : null}
                        <section className="post-full-content">
                            <h1 className="content-title">{post.data.Name}</h1>
                            <h4>
                                <div>Servings: {post.data.Servings} meals</div>
                                <div>
                                    Cooking time: {post.data.Total_Time / 60} minutes
                                </div>
                            </h4>

                            <hr />

                            <section
                                className="content-body"
                                dangerouslySetInnerHTML={{
                                    __html: post.data.Description,
                                }}
                            />
                            <h2 className="content-title">Ingredients</h2>

                            {post.data.Ingredients !== null ? (
                                <section className="content-body">
                                    {post.data.Ingredients.map(
                                        (ingredient, index) => (
                                            <label
                                                key="index"
                                                className="recipe-ingredients"
                                            >
                                                <span>
                                                    <strong>
                                                        {" "}
                                                        {
                                                            ingredient.data.Ingredient[0].data.Name
                                                        }{" "}
                                                    </strong>
                                                    (
                                                    {`${ingredient.data.Qty} ${ingredient.data.Unit}`}
                                                    )
                                                </span>
                                                <input type="checkbox" />
                                            </label>
                                        )
                                    )}
                                    <p />
                                </section>
                            ) : (
                                <section className="content-body" />
                            )}

                            <h2 className="content-title">Steps</h2>
                            {post.data.Steps !== null ? (
                                <section className="content-body">
                                    {post.data.Steps.map((step, index) => (
                                        <div
                                            className="recipe-step"
                                            key={index}
                                        >
                                            <div className="recipe-step-index">
                                                <div>{index + 1}</div>
                                            </div>
                                            <div className="recipe-step-data">
                                                <p>{step.data.Name}</p>

                                                {step.data.Image &&
                                                step.data.Image[0] ? (
                                                    <img
                                                        src={`${step.data.Image[0].url}`}
                                                        alt={post.data.Name}
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            ) : (
                                <section className="content-body" />
                            )}
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
};

export default Post;

export const recipeQuery = graphql`
    query RecipeBySlug($slug: String!) {
        airtable(
            table: { eq: "Recipes" }
            data: { slug: { eq: $slug } }
        ) {
            id
            data {
                Name
                slug
                Description
                Total_Time
                Servings
                Cover_Image {
                    url
                }
                Ingredients {
                    data {
                        Qty
                        Unit
                        Ingredient {
                            data {
                                Name
                            }
                        }
                    }
                }
                Steps {
                    data {
                        Name
                    }
                }
            }
        }
    }
`;
