export const productAttributeOneBySlug = /* GraphQL */ `
  query productAttributeOneBySlug($slug: String!) {
    getProductCustomAttributes(sku: $slug) {
      specification {
          code
          label
          value
      }
      others {
          code
          label
          value
      }
    }
  }  
`