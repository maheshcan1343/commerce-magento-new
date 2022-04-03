import { Category } from '@vercel/commerce/types/site'
import { SaleorConfig } from '../api'
import { CollectionCountableEdge } from '../../schema'
import * as query from './queries'

const megaMenuCollections = [
  'special-offers',
  'garden-outdoor-furniture',
  'bbqs-fire-pits',
  'garden-sheds',
  'lawnmowers',
  'ride-on-mowers',
  'strimmers-and-brushcutters',
  'blowers-chainsaws',
  'cultivators',
  'shredders-for-sale',
  'accessories',
  'scarifiers',
]

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      id: 4234,
    },
  })
  
  const categories = data?.category?.children
  .filter(
    (megamenu: any)=>
      megamenu.include_in_menu === 1 &&
      megaMenuCollections.indexOf(megamenu.url_path) > -1
  )
  .map((megamenu: any) => ({
    id: megamenu.id,
    name: megamenu.name,
    slug: megamenu.url_path,
    path: `/${megamenu.url_path}`,
  }))

  return categories;

  return (
    data.collections?.edges?.map(({ node: { id, name, slug } }: CollectionCountableEdge) => ({
      id,
      name,
      slug,
      path: `/${slug}`,
    })) ?? []
  )
}

export default getCategories
