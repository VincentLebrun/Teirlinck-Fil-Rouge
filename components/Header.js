import React from 'react'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="ant-row ant-row-center">
            <div className="ant-col-16">
                <div className="ant-row ant-row-space-between ant-row-middle">
                    <div className="ant-row ant-row-middle">
                        <div className="ant-col-5">
                        <Link href="/"><a><img src="/logo.svg" alt="" /></a></Link>
                        </div>
                        <nav className="ant-col">
                            <ul>
                               <Link href="/api/hello"><a><li>Accueil</li></a></Link>
                               <Link href="/api/hello"><a><li>Nos Produits</li></a></Link>
                               <Link href="/api/hello"><a><li>Notre histoire</li></a></Link>
                            </ul>
                        </nav>
                    </div>
                    <div className="ant-col">
                    <Link href="/api/hello"><a>Se connecter</a></Link>
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
