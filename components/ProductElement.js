import React from 'react'
import { Col } from 'antd';
import Link from 'next/link'


const ProductElement = ({ id, name, price, price_type, img }) => {
    
    return (
        <Col xs={24} sm={6}>

            <Link href={`/products/${id}`}>

                <div className="element">
                    <img src={img} alt="" />
                    <div className="element-name"><h1>{name}</h1></div>
                    <div className="element-price"><h2>{price}{price_type}</h2></div>
                    <div className="element-absolute">
                        <div className="element-inside"></div>
                    </div>
                </div>

            </Link>

        </Col>
    )
}

export default ProductElement
