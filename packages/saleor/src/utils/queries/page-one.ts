export const PageOne = /* GraphQL */ `
  query PageOne($pageId: Int!) {
    cmsPage(id: $pageId) {
      title
      content
      url_key
    }
  }
`
