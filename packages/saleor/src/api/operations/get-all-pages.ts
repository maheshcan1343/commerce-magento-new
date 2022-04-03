import type { OperationContext } from '@vercel/commerce/api/operations'

import { QueryPagesArgs, PageCountableEdge } from '../../../schema'
import type { SaleorConfig, Provider } from '..'
import * as Query from '../../utils/queries'

export type Page = any

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> = T

export default function getAllPagesOperation({ commerce }: OperationContext<Provider>) {
  async function getAllPages({
    query = Query.PageMany,
    config,
    variables,
  }: {
    url?: string
    config?: Partial<SaleorConfig>
    variables?: QueryPagesArgs
    preview?: boolean
    query?: string
  } = {}): Promise<GetAllPagesResult> {
    const { fetch, locale, locales = ['en-US'] } = commerce.getConfig(config)

    /*const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )*/

    const pages = [
      { id:128, name: 'Service & Expertise', url: '/en-US/service-and-expertise' },
      { id:129, name: 'Our Story', url: '/en-US/our-story' },
      { id:198, name: 'Our Brands', url: '/en-US/our-brands' },
      { id:141, name: 'Visit Us', url: '/en-US/visit-us' },
      { id:130, name: 'Contact Details', url: '/en-US/chipperfield-contact-details' },
      { id:104, name: 'Terms & Conditions', url: '/en-US/terms-and-conditions' },
      { id:140, name: "Customer Care", url: "/en-US/customer-care"  },
      { id:107, name: 'Privacy and Cookies', url: '/en-US/privacy-policy' },
      { id:97, name: "Spare Parts", url: "/en-US/spare-parts"  },
      { id:135, name: "Ride-on Deliveries", url: "/en-US/ride-on-deliveries"  },
      { id:95, name: "Service Department", url: "/en-US/service-centre"  },
      { id:137, name: "Returns", url: "/en-US/returns"  },
      { id:134, name: "Deliveries", url: "/en-US/delivery"  },
      { id:138, name: "Recycling", url: "/en-US/recycling"  },
      { id:139, name: "Guarantee", url: "/en-US/guarantee"  },
      { id:132, name: 'Security', url: '/en-US/security' },
      { id:136, name: "Free Oil", url: "/en-US/free-oil"  }
    ]

    /*const pages = data.pages?.edges?.map(({ node: { id:128, name: name, slug, ...node } }: PageCountableEdge) => ({
      ...node,
      url: `/${locale}/${slug}`,
      name,
    }))*/

    return { pages }
  }

  return getAllPages
}
