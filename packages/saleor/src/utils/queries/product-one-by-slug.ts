export const ProductOneBySlug = /* GraphQL */ `
query ProductOneBySlug($slug: String!) {
  products(
    filter: {
      url_key: {
        eq: $slug
      }
    }
  ) {
    items {
      uid
      id
      name
      sku
      url_key
      stock_status
      review_count
      rating_summary
      feature_bullets
      price {
        regularPrice {
          amount {
            currency
            value
          }
        }
      }
      media_gallery {
        url
        label
      }
      description {
        html
      }
      related_products {
        id
        name
        sku
        url_key
        meta_description
        price {
          regularPrice {
            amount {
              currency
              value
            }
          }
        }
        image
        {
          url
        }
      }
    }
  }
}  
`