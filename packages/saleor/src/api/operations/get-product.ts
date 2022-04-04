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
    const realtedProducts = data?.products?.items[0]?.related_products
        .map((loopProduct: any, ) => ({
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
        images: productMedia,
        relatedProducts : realtedProducts,
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
