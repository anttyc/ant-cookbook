const path = require(`path`)
const dotenv = require(`dotenv`)
dotenv.config()

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-source-airtable",
            options: {
                apiKey: process.env.AIRTABLE_API_KEY,
                tables: [
                    {
                        baseId: process.env.AIRTABLE_BASE_ID,
                        tableName: "Ingredients",
                    },
                    {
                        baseId: process.env.AIRTABLE_BASE_ID,
                        tableName: "Recipe Ingredient",
                        tableLinks: ["Ingredient"],
                    },
                    {
                        baseId: process.env.AIRTABLE_BASE_ID,
                        tableName: "Recipe Step",
                    },
                    {
                        baseId: process.env.AIRTABLE_BASE_ID,
                        tableName: "Recipes",
                        tableView: "Cookbook",
                        tableLinks: ["Ingredients", "Steps"],
                    },
                ],
            },
        },
        /**
         *  Utility Plugins
         */
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
    ],
};
