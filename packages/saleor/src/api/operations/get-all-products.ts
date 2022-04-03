import type { OperationContext } from '@vercel/commerce/api/operations'
import { Product } from '@vercel/commerce/types/product'

import { ProductCountableEdge } from '../../../schema'
import type { Provider, SaleorConfig } from '..'
import { normalizeProduct } from '../../utils'

import * as Query from '../../utils/queries'
import { GraphQLFetcherResult } from '@vercel/commerce/api'
import { Product } from '@vercel/commerce/types'

type ReturnType = {
  products: Product[]
}

export default function getAllProductsOperation({ commerce }: OperationContext<Provider>) {
  async function getAllProducts({
    query = Query.ProductMany,
    variables,
    config,
    featured,
  }: {
    query?: string
    variables?: any
    config?: Partial<SaleorConfig>
    preview?: boolean
    featured?: boolean
  } = {}): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(config)

    if (featured) {
      variables = { ...variables, categoryId: 'Q29sbGVjdGlvbjo0' }
      query = Query.CollectionOne
    }
    else{
      variables = { ...variables }
      query = Query.HomepageProducts
    }
    const { data }: GraphQLFetcherResult = await fetch(
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
    const products = data?.products?.items
    .map((loopProduct: any) => ({
        id: loopProduct.id,
        name: loopProduct.name,
        description: loopProduct.meta_description,
        path: `/${loopProduct.url_key}`,
        slug: loopProduct.url_key,
        price: { value: loopProduct?.price?.regularPrice?.amount?.value, currencyCode: loopProduct?.price?.regularPrice?.amount?.currency },
        images:  [{ url: loopProduct?.image?.url , alt: loopProduct.name }],
        vendor: '',
        variants: [],
        options: []
    }))
    return {
      products,
    }
  }

  return getAllProducts
}
