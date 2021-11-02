import React from "react";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";

/**
 * Main index page (home page)
 * Loads all posts
 *
 */
const Index = ({ data, pageContext }) => {
    const recipes = data.allAirtable.edges;

    return (
        <>
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {recipes.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    );
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query {
        allAirtable(
            filter: {
                table: { eq: "Recipes" }
            }
        ) {
            edges {
                node {
                    id
                    data {
                        Name
                        slug
                        Description
                        Total_Time
                        Cook_Time
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
        }
    }
`;
