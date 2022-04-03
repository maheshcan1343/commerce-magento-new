export const CollectionMany = /* GraphQL */ `
  query CollectionMany($id: Int!) {
    category(id: $id) {
      children {
        id
        include_in_menu
        name
        url_path
      }
    }
  }
`
