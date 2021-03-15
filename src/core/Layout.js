import React from 'react'

const Layout = ({ title, description, className, children }) => {
    return (
        <div>
            <div className="container">
                
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout
