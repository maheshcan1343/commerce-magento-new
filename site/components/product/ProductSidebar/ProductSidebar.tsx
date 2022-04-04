import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import usePrice from '@framework/product/use-price'
interface ProductSidebarProps {
  product: Product
  className?: string
  productAttirbute: any
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className, productAttirbute }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })
  const defaultBulletsAttribute = [
    'bullet_one',
    'bullet_two',
    'bullet_three',
  ]
  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
       <p>{product.name}</p> 
       <p>{`${price}`}</p> 
      {productAttirbute?.getProductCustomAttributes?.others
       .filter( (loopOther: any)=> defaultBulletsAttribute.indexOf(loopOther.code) > -1 )
      .map((loopOther: any) => (
        <div className="text-accent-6 pr-1 font-medium text-sm">
          <p> <b> * </b>{loopOther.value}</p>
          </div>
           
        ))}
      <div className="flex flex-row justify-between items-center">
        <Rating value={product.ratingSummary / 5} />
        <div className="text-accent-6 pr-1 font-medium text-sm">
        Overall score: {product.ratingSummary / 5} / 5 ({product.reviewCount} reviews)
          </div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
      <Collapse title="DESCRIPTION">
          <Text
            className="pb-4 break-words w-full max-w-xl"
            html={product.description || ''}
          />
        </Collapse>
        <Collapse title="FEATURES">
        <Text
            className="pb-4 break-words w-full max-w-xl"
            html={product.featureBullets || ''}
          />
        </Collapse>
        <Collapse title="SPECS">
        {productAttirbute?.getProductCustomAttributes?.specification.map((loopSpec: any) => (
            <p>{loopSpec.label} : {loopSpec.value}</p>
        ))}
        </Collapse>
        <Collapse title="REVIEWS">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
