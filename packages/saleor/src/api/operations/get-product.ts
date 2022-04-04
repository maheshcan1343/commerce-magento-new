import type { OperationContext } from '@vercel/commerce/api/operations'
import { normalizeProduct } from '../../utils'
import type { Provider, SaleorConfig } from '..'

import * as Query from '../../utils/queries'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

export default function getProductOperation({ commerce }: OperationContext<Provider>) {
  async function getProduct({
    query = Query.ProductOneBySlug,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: Variables
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(cfg)

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
    const productDetails = data?.products?.items[0];
    const productMedia = data?.products?.items[0]?.media_gallery;  
    const product = 
      {
        id: productDetails?.id,
        name: productDetails?.name,
        slug: productDetails?.url_key,
        path: `/${productDetails?.url_key}`,
        description: productDetails?.description?.html,
        featureBullets: productDetails?.feature_bullets,
        reviewCount: productDetails?.review_count,
        ratingSummary: productDetails?.rating_summary,
        price: { value: productDetails?.price?.regularPrice?.amount?.value, currencyCode: productDetails?.price?.regularPrice?.amount?.currency },
        images:  productMedia,
        vendor: '',
        variants: [],
        options: []
      }
    return {
      product: product ? product : null,
    }
  }

  return getProduct
}
