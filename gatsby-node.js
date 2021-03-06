const path = require(`path`)
const { postsPerPage } = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        {
            allAirtable(filter: { table: { eq: "Recipes" } }) {
                edges {
                    node {
                        data {
                            slug
                        }
                    }
                }
            }
        }
    `);

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors)
    }

    // Extract query results
    const posts = result.data.allAirtable.edges;


    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`)
    const postTemplate = path.resolve(`./src/templates/post.js`)

    // Create post pages
    posts.forEach(({ node }) => {
        // This part here defines, that our posts will use
        // a `/:slug/` permalink.
        node.url = `/${node.data.slug}/`

        createPage({
            path: node.url,
            component: postTemplate,
            context: {
                slug: node.data.slug,
            },
        });
    })

    // Create pagination
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`
            } else {
                return `/page`
            }
        },
    })
}
