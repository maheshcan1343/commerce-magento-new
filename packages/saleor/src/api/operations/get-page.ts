import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Provider, SaleorConfig } from '..'
import { QueryPageArgs } from '../../../schema'

import * as Query from '../../utils/queries'

export type Page = any

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export default function getPageOperation({ commerce }: OperationContext<Provider>) {
  async function getPage({
    query = Query.PageOne,
    variables,
    config,
  }: {
    query?: string
    variables: QueryPageArgs
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<GetPageResult> {
    const { fetch, locale = 'en-US' } = commerce.getConfig(config)
    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )
    const returnPage = {
      id: variables?.pageId,
      title: data?.cmsPage?.title,
      slug: data?.cmsPage?.url_key,
      body: data?.cmsPage?.content,
      url: '/en-US/'+data?.cmsPage?.url_key,
    }
    return {
      page: returnPage ? returnPage : null,
    }

    return {
      page: page
        ? {
            ...page,
            name: page.title,
            url: `/${locale}/${page.slug}`,
          }
        : null,
    }
  }

  return getPage
}
