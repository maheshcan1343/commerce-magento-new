import { SWRHook } from '@vercel/commerce/utils/types'
import { Product } from '@vercel/commerce/types/product'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'

import { ProductCountableEdge } from '../../schema'
import { getSearchVariables, normalizeProduct } from '../utils'

import * as query from '../utils/queries'
import { SearchProductsHook } from '@vercel/commerce/types/product'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
}

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: query.ProductMany,
  },
  async fetcher({ input, options, fetch }) {
    const { categoryId, brandId } = input

    /*const data = await fetch({
      query: categoryId ? query.CollectionOne : options.query,
      method: options?.method,
      variables: getSearchVariables(input),
    })*/
   const products = [
      {
        id: 'UHJvZHVjdDoxMjU=',
        name: 'Saleor Beanie Mahesh',
        description:
          '{"time": 1632846110139, "blocks": [{"data": {"text": "Best seller!", "level": 1}, "type": "header"}, {"data": {"text": "Keeps your head <b>warm</b>, while lookin\' <b>cool</b>. <i>How awesome is that?</i>"}, "type": "paragraph"}], "version": "2.20.0"}',
        slug: 'saleor-beanie',
        path: '/polo-shirt',
        price: {
          value: 55,
          currencyCode: 'USD',
        },
        images: [
          {
            url: 'https://backend.chipperfield.co.uk/media/catalog/product/cache/96a68da70afabf55598d07a0a79bb44a/1/5/1530m_mountfield_1530m.png',
            alt: 'name',
          },
        ],
        variants: [],
        vendor: '',
        options: [],
      },
      {
        id: 'UHJvZHVjdDoxMjU=',
        name: 'White Plimsolls',
        description:
          '{"time": 1632846110139, "blocks": [{"data": {"text": "Best seller!", "level": 1}, "type": "header"}, {"data": {"text": "Keeps your head <b>warm</b>, while lookin\' <b>cool</b>. <i>How awesome is that?</i>"}, "type": "paragraph"}], "version": "2.20.0"}',
        slug: 'saleor-beanie',
        path: '/polo-migrate',
        price: {
          value: 55,
          currencyCode: 'USD',
        },
        images: [
          {
            url: 'https://backend.chipperfield.co.uk/media/catalog/product/cache/96a68da70afabf55598d07a0a79bb44a/f/t/ftde1200r-uk-tondeuse-tondeuse-rouleau-electrique.jpg',
            alt: 'name',
          },
        ],
        variants: [],
        vendor: '',
        options: [],
      },
      {
        id: 'UHJvZHVjdDoxMjU=',
        name: 'White Plimsolls 22',
        description:
          '{"time": 1632846110139, "blocks": [{"data": {"text": "Best seller!", "level": 1}, "type": "header"}, {"data": {"text": "Keeps your head <b>warm</b>, while lookin\' <b>cool</b>. <i>How awesome is that?</i>"}, "type": "paragraph"}], "version": "2.20.0"}',
        slug: 'saleor-beanie',
        path: '/polo-migratesss',
        price: {
          value: 55,
          currencyCode: 'USD',
        },
        images: [
          {
            url: 'https://backend.chipperfield.co.uk/media/catalog/product/cache/96a68da70afabf55598d07a0a79bb44a/a/t/at6102hwa_2t1740404a20_full01.jpg',
            alt: 'name',
          },
        ],
        variants: [],
        vendor: '',
        options: [],
      },
    ]

    return {
      products: products,
      found: !!products.length,
    }

    let edges

    if (categoryId) {
      edges = data.collection?.products?.edges ?? []
      // FIXME @zaiste, no `vendor` in Saleor
      // if (brandId) {
      //   edges = edges.filter(
      //     ({ node: { vendor } }: ProductCountableEdge) =>
      //       vendor.replace(/\s+/g, '-').toLowerCase() === brandId
      //   )
      // }
    } else {
      edges = data.products?.edges ?? []
    }

    return {
      products: edges.map(({ node }: ProductCountableEdge) => normalizeProduct(node)),
      found: !!edges.length,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
