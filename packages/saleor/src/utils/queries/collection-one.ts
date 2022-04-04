import * as fragment from '../fragments'

export const CollectionOne = /* GraphQL */ `
  query getProductsFromCollection {
    categoryList(filters: { ids: { eq: "4252" } }) {
      products {
        items {
          id
          name
          sku
          url_key
          image {
            url
          }
          price {
            regularPrice {
              amount {
                currency
                value
              }
            }
          }
        }
      }
    }
  }
`